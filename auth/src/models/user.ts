import mongoose, { Document, Model, Schema } from 'mongoose';

import { generateHash } from '@/utils/crypto';

export interface UserAttributes {
  name: string;
  email: string;
  password?: string;
}

interface UserModel extends Model<UserDocument> {
  build(attrs: UserAttributes): UserDocument;
}

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await generateHash(this.get('password'));

    this.set('password', hashed);
  }

  done();
});

userSchema.statics.build = (attrs: UserAttributes) => {
  return new UserModel(attrs);
};

const UserModel = mongoose.model<UserDocument, UserModel>('User', userSchema);

export default UserModel;
