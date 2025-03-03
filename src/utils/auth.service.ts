import axios from "axios";
import {
  IAuthentication,
  ISignupAuthentication,
  IUser,
} from "@/typescript/interfaces/authentication.interface";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  async login(credentials: IAuthentication) {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  async signup(userData: ISignupAuthentication) {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },

  async logout() {
    const response = await axios.post(`${API_URL}/auth/logout`);
    return response.data;
  },

  async getCurrentUser() {
    const response = await axios.get(`${API_URL}/auth/me`);
    return response.data;
  },
};
