import { useState } from "react";
import { authService } from "@/utils/auth.service";
import useAuthStore from "@/store/auth.store";
import useShowToast from "./useShowToast";
import {
  IAuthentication,
  ISignupAuthentication,
} from "@/typescript/interfaces/authentication.interface";
import { REMOVE_ITEM, SAVE_ITEM } from "@/utils/storage";

const useAuthenticate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const showToast = useShowToast();
  const { loginUser, logoutUser } = useAuthStore();

  const login = async (inputs: IAuthentication) => {
    if (!inputs.email || !inputs.password) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    setIsLoading(true);
    try {
      const data = await authService.login(inputs);

      SAVE_ITEM("user", data.user);
      SAVE_ITEM("token", data.token);
      loginUser(data.user);
      console.log(data.token, "loooogin");
      showToast("Success", "Login successful!", "success");
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      showToast(
        "Error",
        err.response?.data?.message || "Login failed",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (inputs: ISignupAuthentication) => {
    if (
      !inputs.email ||
      !inputs.password ||
      !inputs.username ||
      !inputs.firstName ||
      !inputs.lastName
    ) {
      showToast("Error", "Please fill all the fields", "error");
      return;
    }

    setIsLoading(true);
    try {
      const data = await authService.signup(inputs);
      SAVE_ITEM("user", data.user);
      SAVE_ITEM("token", data.token);
      loginUser(data.user);
      showToast("Success", "Signup successful!", "success");
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      showToast(
        "Error",
        err.response?.data?.message || "Signup failed",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // await authService.logout();
      REMOVE_ITEM("user");
      REMOVE_ITEM("token");
      logoutUser();
      showToast("Success", "Logout successful!", "success");
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred");
      showToast(
        "Error",
        err.response?.data?.message || "Logout failed",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    signup,
    logout,
    isLoading,
    error,
  };
};

export default useAuthenticate;
