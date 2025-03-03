import { quizData } from "@/typescript/data";
import { IQuiz } from "@/typescript/interfaces/quiz.interface";
import { GET_ITEM, REMOVE_ITEM, SAVE_ITEM } from "@/utils/storage";
import { create } from "zustand";

export type IQuizStore = {
  quiz: IQuiz[];
  quizStep: number;
  isLoading: boolean;
  saveQuizInformation: (quizId: number, optionId: string) => void;
  incrementQuizSep: () => void;
  decrementQuizSep: () => void;
  updateQuizStep: (quizStep: number) => void;
  resetQuiz: () => void;
  toggleLoading: () => void;
};

const useQuizStore = create<IQuizStore>((set) => ({
  quiz: GET_ITEM("travel-ai-quiz") || quizData,
  isLoading: true,
  quizStep: 1,
  saveQuizInformation: (quizId, optionId) =>
    set((state) => {
      const updatedQuiz = state.quiz.map((quiz) =>
        quiz.id === quizId
          ? {
              ...quiz,
              options: quiz.options.map((option) => ({
                ...option,
                selected: option.id === optionId,
              })),
            }
          : quiz
      );
      SAVE_ITEM("travel-ai-quiz", updatedQuiz);
      return { quiz: updatedQuiz };
    }),
  resetQuiz: () =>
    set((state) => {
      REMOVE_ITEM("travel-ai-quiz");
      return { quiz: quizData, quizStep:1 };
    }),
  incrementQuizSep: () =>
    set((state) => ({ quizStep: state.quizStep + 1, isLoading: true })),
  decrementQuizSep: () =>
    set((state) => ({ quizStep: state.quizStep - 1, isLoading: true })),
  updateQuizStep: (quizStep: number) => set((state) => ({ quizStep })),
  toggleLoading: () => set((state) => ({ isLoading: false })),
}));

export default useQuizStore;
