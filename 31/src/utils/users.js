import axios from "axios";
import { BASE_URL } from "./constants";
import { toastifyMessage } from "./helpers";
import axiosInstance from "./axiosInstance";

const errorMessage = (error) => error?.response?.data?.message || error.message;

// change the callback in fns to use any state management library if needed
export const registerNewUser = async (otp, cb) => {
  try {
    const cred = sessionStorage.getItem("loggedInCredentials");
    const response = await axios.post(`${BASE_URL}/user/register`, {
      ...(cred && JSON.parse(cred)),
      otp,
    });
    sessionStorage.clear();
    toastifyMessage("success", response?.message);
    if (cb) cb();
  } catch (error) {
    toastifyMessage("error", errorMessage(error));
  }
};

export const loginUser = async (payload, cb) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, payload);
    localStorage.setItem("accessToken", response?.data?.accessToken);
    localStorage.setItem("refreshToken", response?.data?.refreshToken);
    if (cb) cb();
    toastifyMessage("success", response?.message);
  } catch (error) {
    toastifyMessage("error", errorMessage(error));
  }
};

export const sendOtp = async (payload, cb) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/send-otp`, {
      email: payload.email,
    });
    sessionStorage.setItem("loggedInCredentials", JSON.stringify(payload));
    if (cb) cb();
    toastifyMessage("success", response?.message);
  } catch (error) {
    toastifyMessage("error", errorMessage(error));
  }
};

export const getProfileDetail = async (cb) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/user/my-profile`);
    if (cb) cb(response);
    toastifyMessage("success", response?.message);
  } catch (error) {
    toastifyMessage("error", errorMessage(error));
  }
};

export const updateProfileDetail = async (payload, cb) => {
  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/user/update-profile`,
      payload
    );
    if (cb) cb();
    toastifyMessage("success", response?.message);
  } catch (error) {
    toastifyMessage("error", errorMessage(error));
  }
};

export const changePassword = async (payload, cb) => {
  try {
    const response = await axiosInstance.put(
      `${BASE_URL}/user/change-password`
    );
    if (cb) cb();
    toastifyMessage("success", response?.message);
  } catch (error) {
    toastifyMessage("error", errorMessage(error));
  }
};
