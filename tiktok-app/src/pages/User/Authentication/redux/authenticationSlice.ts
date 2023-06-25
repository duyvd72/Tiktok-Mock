import { signUpUserAPI, loginUserAPI } from '@/api/userAPIs';
import { ICurrentUser } from '@/interfaces/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Combine = ICurrentUser & { message: string };

interface IAuthenticationState {
  isLoading: {
    loading: boolean;
    state: 'success' | 'error' | 'none';
    data?: {
      type: string;
      response?: Partial<Combine> | null;
    };
  };
}

const initialState: IAuthenticationState = {
  isLoading: {
    loading: false,
    state: 'none',
    data: {
      type: 'login',
      response: null,
    },
  },
};

const authenticationSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetLoading: (state) => {
      state.isLoading = {
        loading: false,
        state: 'none',
        data: {
          type: 'login',
          response: null,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUserAPI.pending, (state) => {
        state.isLoading = {
          loading: true,
          state: 'none',
        };
      })
      .addCase(signUpUserAPI.fulfilled, (state) => {
        state.isLoading = {
          loading: false,
          state: 'success',
          data: {
            type: 'signup',
          },
        };
      })
      .addCase(loginUserAPI.pending, (state) => {
        state.isLoading = {
          loading: true,
          state: 'none',
        };
      })
      .addCase(
        loginUserAPI.fulfilled,
        (state, action: PayloadAction<ICurrentUser | { message: string }>) => {
          state.isLoading = {
            loading: false,
            state: 'success',
            data: {
              type: 'login',
              response: action.payload,
            },
          };
        }
      );
  },
});

export default authenticationSlice;
