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
  fetchUser: (user: User) => void;
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

      set({ ...initialState, success: true, data });
    } catch (error: Any) {
      console.error('Error in data fetch:', error);

      set({ ...initialState, error: true, errorData: error?.message });
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
