import { publicRequest } from "../requestMethod"
import { loginFailure, loginStart, loginSuccess, logoutStart, registerStart, registerSuccess, registerFailure } from "./userRedux"

export const register = async (dispatch, user) => {
  dispatch(registerStart())
  try {
    const response = await publicRequest.post('/auth/register', user)
    dispatch(registerSuccess(response.data))
  } catch (err) {
    dispatch(registerFailure())
  }
}

export const login = async (dispatch, user) => {
  dispatch(loginStart())
  try {
    const response = await publicRequest.post('/auth/login', user)
    dispatch(loginSuccess(response.data))
  } catch (err) {
    dispatch(loginFailure())
  }
}

export const logout = async (dispatch) => {
  dispatch(logoutStart())
}