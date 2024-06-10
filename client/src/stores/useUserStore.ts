import { create } from 'zustand';

import { getCurrentUser } from 'services/auth';

import { User } from 'types/User';
import { Any } from 'types/common';

interface TUserState {
  data: User | null;
  loading: boolean;
  success: boolean;
  error: boolean;
  errorData: Any;
}

interface TUserStore extends TUserState {
  updateUser: (user: User) => void;
  fetchUser: () => void;
  removeUser: () => void;
}

const initialState: TUserState = {
  loading: true,
  success: false,
  error: false,
  data: null,
  errorData: null,
};

const useUserStore = create<TUserStore>()(set => ({
  ...initialState,
  fetchUser: async () => {
    set({ ...initialState, loading: true });
    try {
      const data = await getCurrentUser();

      set({ ...initialState, success: true, loading: false, data });
    } catch (error: Any) {
      set({ ...initialState, error: true, loading: false, errorData: error?.message });
    }
  },

  updateUser: (user: User) => {
    set(state => ({
      ...state,
      loading: false,
      data: user,
    }));
  },
  removeUser: () => set({ data: null }),
}));

export default useUserStore;
