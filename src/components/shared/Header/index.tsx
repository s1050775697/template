"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import {
  Button as ChakraButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/typescript/enum";
import Link from "next/link";
import SignupModal from "../SignupModal";
import useAuthStore from "@/store/auth.store";
import useAuthenticate from "@/hooks/useAuthenticate";

const Header = () => {
  const { logout, isLoading } = useAuthenticate();
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);
  const { user } = useAuthStore((state) => state);
  const router = useRouter();

  const items = user
    ? [
        { name: "About", route: APP_ROUTES.ABOUT },
        { name: "Reviews", route: APP_ROUTES.REVIEWS },
      ]
    : [
        { name: "About", route: APP_ROUTES.ABOUT },
        { name: "Reviews", route: APP_ROUTES.REVIEWS },
        { name: "Sign in", route: APP_ROUTES.SIGN_IN },
      ];

  return (
    <>
      <header className="h-20 w-full flex items-center justify-center gap-10 768:gap-4 relative z-50">
        <div className="font-MM text-3xl font-normal text-white">Lucia</div>
        {items.map((item) => (
          <Link
            className="font-base font-medium text-white"
            key={item.name}
            href={item.route}
          >
            {item.name}
          </Link>
        ))}
        {!user ? (
          <Button onClick={() => setIsSignupModalOpen(true)}>Sign up</Button>
        ) : (
          <Menu>
            <MenuButton
              as={ChakraButton}
              bg="transparent"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
            >
              <Image
                src="/placeholder-profile.png"
                w={10}
                h={10}
                objectFit="contain"
                rounded="full"
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => router.push(APP_ROUTES.FAVORITES)}>
                Profile
              </MenuItem>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        )}
      </header>
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </>
  );
};

export default Header;
