"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Progress from "@/components/ui/Progress";
import useQuizStore from "@/store/quiz.store";

const ProgressBarWrapper = () => {
  const path = usePathname();
  const { quizStep } = useQuizStore((state) => state);

  const isCompleted = path.split("/")?.at(-1) === "completed";
  const quizSplittedPath: number = parseInt(path?.split("-")?.at(-1) as string);
  const currentQuizStep: number = isCompleted
    ? 4
    : !isNaN(quizSplittedPath)
    ? quizSplittedPath
    : quizStep;

  return <Progress step={currentQuizStep} totalSteps={4} />;
};

export default ProgressBarWrapper;
