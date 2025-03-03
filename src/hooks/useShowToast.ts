import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useShowToast = () => {
  const toast = useToast({
    position: "top",
    containerStyle: {
      left: "20px",
      top: "20px",
      right: "20px",
      bottom: "20px",
    },
  });

  const showToast = useCallback(
    (
      title: string,
      description: string,
      status: "info" | "warning" | "success" | "error" | "loading"
    ) => {
      toast({
        title: title,
        description: description,
        status: status,
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );

  return showToast;
};

export default useShowToast;
