import useAuthStore from "@/store/auth.store";
import useQuizStore from "@/store/quiz.store";
import { BACKEND_ROUTES } from "@/typescript/enum";
import { useState } from "react";
import useShowToast from "./useShowToast";
import { GET_ITEM, SAVE_ITEM } from "@/utils/storage";
import { IUser } from "@/typescript/interfaces/authentication.interface";
import axios from "axios";

const useQuiz = () => {
  const showToast = useShowToast();
  const { user, loginUser } = useAuthStore((state) => state);
  const { quiz, resetQuiz } = useQuizStore((state) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const saveQuizInfo = async () => {
    try {
      const quizAnswered = quiz.every((q) =>
        q.options.some((opt) => opt.selected)
      );

      if (!quizAnswered)
        return showToast(
          "Hey wait!!",
          "Lets answer all the questions first",
          "warning"
        );
      setIsLoading(true);

      const quizResponse = quiz.map((q) => {
        const selectedOpt = q.options.find((opt) => opt.selected);
        if (!selectedOpt) return false;
        return { question: q.question, option: selectedOpt };
      });
      console.log("quizResponse-- :: ", quizResponse);
      const token = (GET_ITEM("token") as string)?.replace(/"/g, "");
      if (!token) {
        showToast("Error", "No token is detected", "error");
        return;
      }
      const userDetails = {
        quizResponses: quizResponse,
      };

      console.log("userDetails-- :: ", userDetails);

      const res = await axios.patch(BACKEND_ROUTES.UPDATE_USER, userDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("res:: ", res);
      const savedUser = GET_ITEM("user") as IUser;
      SAVE_ITEM("user", {
        ...savedUser,
        hasAnsweredQuiz: true,
        quizResponses: quizResponse,
      });

      loginUser({
        ...savedUser,
        hasAnsweredQuiz: true,
      });
      showToast("Success", "Quiz information has been saved", "success");
      resetQuiz();
    } catch (error) {
      console.log("error :: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, saveQuizInfo };
};
export default useQuiz;
