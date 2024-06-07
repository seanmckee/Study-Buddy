"use client";

import { Button } from "@/components/ui/button";
import React from "react";

interface GenerateQuizButtonProps {
  generateQuiz: () => void;
}

const GenerateQuizButton: React.FC<GenerateQuizButtonProps> = ({
  generateQuiz,
}) => {
  return (
    <Button onClick={generateQuiz} size="lg">
      Generate Quiz
    </Button>
  );
};

export default GenerateQuizButton;
