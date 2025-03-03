import React, { FC, ReactNode } from "react";
import {
  Box,
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
import { ISignupAuthentication } from "@/typescript/interfaces/authentication.interface";

type TSignupModal = {
  isOpen: boolean;
  onClose: () => void;
};

const FormFieldError = ({ children }: { children: ReactNode }) => (
  <span className="text-red-600 text-sm">{children}</span>
);

const SignupModal: FC<TSignupModal> = ({ isOpen, onClose }) => {
  const { signup, isLoading, error } = useAuthenticate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ISignupAuthentication>();

  const onSubmit: SubmitHandler<ISignupAuthentication> = async (data) => {
    await signup(data);
    onClose();
    reset();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={5}>
              <Input
                placeholder="First Name"
                type="text"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <FormFieldError>First name is required</FormFieldError>
              )}
            </Box>

            <Box mb={5}>
              <Input
                placeholder="Last Name"
                type="text"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <FormFieldError>Last name is required</FormFieldError>
              )}
            </Box>

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
                placeholder="Password"
                type="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <FormFieldError>Password is required</FormFieldError>
              )}
            </Box>

            <Box mb={5}>
              <Input
                placeholder="Username"
                type="text"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <FormFieldError>username is required</FormFieldError>
              )}
            </Box>

            <Box mb={5}>
              <Input
                placeholder="Date Of Birth"
                type="date"
                {...register("dob", { required: true })}
              />
              {errors.dob && (
                <FormFieldError>Date of birth is required</FormFieldError>
              )}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              className="bg-transparent border-[1px] border-primary mr-3"
              onClick={onClose}
            >
              Close
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Sign Up
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default SignupModal;
