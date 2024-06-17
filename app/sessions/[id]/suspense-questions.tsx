import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SuspenseQuestions = () => {
  return (
    <div className="mt-2 text-gray-500 dark:text-gray-400">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </div>
  );
};

export default SuspenseQuestions;
