"use client";
import React, { useState, useEffect } from "react";
import useAppStore from "@/store/app.store";
import { Avatar } from "@chakra-ui/react";
import axios from "axios";
import { GET_ITEM, SAVE_ITEM } from "@/utils/storage";
import Button from "@/components/ui/Button";
import useShowToast from "@/hooks/useShowToast";
import { BACKEND_ROUTES } from "@/typescript/enum";

interface UserDetails {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePicURL: string;
  dob: string;
}

const SettingsPage = () => {
  const { isSidebarToggled } = useAppStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    profilePicURL: "",
    dob: "",
  });
  const [isChanged, setIsChanged] = useState(false);
  const showToast = useShowToast();
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedUser = GET_ITEM("user") as UserDetails | null;
    if (storedUser) {
      setUserDetails(storedUser);
    }
    setToken(GET_ITEM("token")?.toString() || "");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    // Check for changes after updating the userDetails state
    checkForChanges({ ...userDetails, [name]: value });
  };

  const checkForChanges = (updatedDetails: UserDetails) => {
    const storedUser = GET_ITEM("user") as UserDetails | null;
    if (storedUser) {
      setIsChanged(
        updatedDetails.firstName !== storedUser.firstName ||
          updatedDetails.lastName !== storedUser.lastName ||
          updatedDetails.username !== storedUser.username ||
          updatedDetails.dob !== storedUser.dob ||
          updatedDetails.email !== storedUser.email
      );
    }
  };

  const validateFields = () => {
    const { firstName, lastName, username, dob, email } = userDetails;
    if (!firstName || !lastName || !username || !dob || !email) {
      showToast("Error", "All fields are required", "error");
      return false;
    }
    return true;
  };

  const handleSaveChanges = () => {
    setIsLoading(true);
    if (!isChanged) {
      showToast("Error", "No changes detected", "error");
      setIsLoading(false);
      return;
    }

    if (!validateFields()) {
      setIsLoading(false);
      return;
    }

    const token = (GET_ITEM("token") as string)?.replace(/"/g, "");
    if (!token) {
      alert("Token is missing. Please log in again.");
      setIsLoading(false);
      return;
    }

    axios
      .patch(BACKEND_ROUTES.UPDATE_USER, userDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        SAVE_ITEM("user", JSON.stringify(userDetails));
        setIsChanged(false);
        showToast("Success", "User details updated successfully", "success");
      })
      .catch((error) => {
        console.log(error);
        showToast("Error", error.message || "An error occurred", "error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <aside
      className={`inline-block align-top bg-travel-black h-full overflow-y-auto py-10 px-8 w-full`}
    >
      <h2 className="text-white font-bold text-[32px] mb-8">Edit Profile</h2>
      <div className="max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <Avatar
              size="xl"
              name={userDetails.firstName + " " + userDetails.lastName}
              src="/profile-image.jpg"
              className="w-24 h-24"
            />
            <div>
              <p className="text-white font-bold mb-1">
                {userDetails.username}
              </p>
              <button className="text-primary text-sm hover:underline">
                Change profile photo
              </button>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-12 w-full px-4 appearance-none"
              value={userDetails.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-12 w-full px-4 appearance-none"
              value={userDetails.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-12 w-full px-4 appearance-none"
              value={userDetails.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-12 w-full px-4 appearance-none"
              value={userDetails.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block text-white text-sm font-bold mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              className="bg-travel-gray-2 rounded-[30px] text-white text-base font-bold h-12 w-full px-4 appearance-none"
              value={userDetails.dob}
              onChange={handleInputChange}
            />
          </div>
          <div className="pt-4">
            <Button
              className="bg-primary text-travel-black"
              onClick={handleSaveChanges}
              disabled={!isChanged}
              isLoading={isLoading}
            >
              Save changes
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SettingsPage;
