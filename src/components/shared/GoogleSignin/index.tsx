import React, { FC } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase";
import { Flex, Image, Spinner, Text, Button } from "@chakra-ui/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useShowToast from "@/hooks/useShowToast";
import useAuthStore from "@/store/auth.store";
import { SAVE_ITEM } from "@/utils/storage";
import { FIREBASE_COLLECTION } from "@/typescript/enum";
import { IUser } from "@/typescript/interfaces/authentication.interface";

type TGoogleSignin = {
  prefix: string;
  onCloseSigninModal: () => void;
};

const GoogleSignin: FC<TGoogleSignin> = ({ prefix, onCloseSigninModal }) => {
  const [signInWithGoogle, , loading, error] = useSignInWithGoogle(auth);
  const showToast = useShowToast();
  const { loginUser } = useAuthStore((state) => state);

  const handleGoogleAuth = async () => {
    try {
      const newUser: any = await signInWithGoogle();
      console.log("newUser :: ", newUser);
      if (!newUser && error) return showToast("Error", error.message, "error");
      console.log("error in google sign in :: ", error);
      debugger

      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userDoc = userSnap.data() as IUser;
        SAVE_ITEM("user", userDoc);
        loginUser(userDoc);
      } else {
        const userDoc = {
          uid: newUser.user.uid,
          email: newUser?.user?.email,
          username: newUser?.user?.email?.split("@")[0],
          fullName: newUser?.user?.displayName,
          profilePic: newUser?.user?.photoURL,
          likes: [],
          createdAt: Date.now(),
        } as any;
        await setDoc(
          doc(firestore, FIREBASE_COLLECTION.USERS, newUser.user.uid),
          userDoc
        );
        SAVE_ITEM("user", userDoc);
        loginUser(userDoc);

        showToast("Awesome!", "Authenticated successfully!", "success");
      }
    } catch (error: any) {
      showToast("Error", error.message, "error");
    } finally {
      onCloseSigninModal();
    }
  };

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      onClick={!loading ? handleGoogleAuth : () => {}}
    >
      {loading ? (
        <Button w={"full"}>
          {" "}
          <Spinner size={"sm"} />
        </Button>
      ) : (
        <Button
          rounded="20px"
          bg="white"
          className="border-[1px] border-travel-gray-3"
          mt={3}
        >
          <Image src="/google.png" w={5} alt="Google Logo" />
          <Text mx={2} color={"blue.500"}>
            {prefix} with Google
          </Text>
        </Button>
      )}
    </Flex>
  );
};

export default GoogleSignin;
