import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name:'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false
  },
  reducers: {
    registerStart: (state) => {
      state.isFetching = true
    },
    registerSuccess: (state) => {
      state.isFetching = false
    }, 
    registerFailure: (state) => {
      state.isFetching = false
      state.error = true
    }, 
    loginStart: (state) => {
      state.isFetching = true
    },
    loginSuccess: (state, action) => {
      state.isFetching = false
      state.currentUser = action.payload
      state.error = false
    }, 
    loginFailure: (state) => {
      state.isFetching = false
      state.error = true
    }, 
    logoutStart: (state) => {
      state.currentUser = null
      state.isFetching = false
      state.error = false
    } 
  }
})

export const { loginStart, loginSuccess, loginFailure, logoutStart, registerSuccess, registerStart, registerFailure } = userSlice.actions

export default userSlice.reducer