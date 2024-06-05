"use client";

import { Button } from "@/components/ui/button";
import React from "react";

const GenerateQuizButton = ({
  generateQuiz,
}: {
  generateQuiz: () => Promise<void>;
}) => {
  return (
    <Button size="lg" onClick={generateQuiz}>
      Generate Quiz
    </Button>
  );
};

export default GenerateQuizButton;
