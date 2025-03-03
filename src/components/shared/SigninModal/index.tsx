import React, { FC, ReactNode } from "react";
import {
  Box,
  Divider,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import useAuthenticate from "@/hooks/useAuthenticate";
import Button from "@/components/ui/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthentication } from "@/typescript/interfaces/authentication.interface";
import GoogleSignin from "../GoogleSignin";

type TSigninModal = {
  isOpen: boolean;
  onClose: () => void;
};

const FormFieldError = ({ children }: { children: ReactNode }) => (
  <span className="text-red-600 text-sm">{children}</span>
);

const SigninModal: FC<TSigninModal> = ({ isOpen, onClose }) => {
  const { login, isLoading, error } = useAuthenticate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAuthentication>();

  const onSubmit: SubmitHandler<IAuthentication> = async (data) => {
    const res = await login(data);
    if (res) {
      onClose();
      reset();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Sign in to your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={5}>
              <Input
                placeholder="Email"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <FormFieldError>Email is required</FormFieldError>
              )}
            </Box>

            <Box mb={5}>
              <Input
                placeholder="Passowrd"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <FormFieldError>Password is required</FormFieldError>
              )}
            </Box>

            <HStack>
              <Divider />
              <small>OR</small>
              <Divider />
            </HStack>

            <GoogleSignin prefix="Sign In" onCloseSigninModal={onClose} />
          </ModalBody>

          <ModalFooter>
            <Button
              className="bg-transparent border-[1px] border-primary mr-3"
              onClick={onClose}
            >
              Close
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Login
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default SigninModal;
