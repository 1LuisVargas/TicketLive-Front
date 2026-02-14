'use client';

import { Button } from "./Button";
import { useRouter } from "next/navigation";

interface BackButtonProps {
    text: string;
}

export const BackButton = ({ text }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      className="text-purple-400 hover:text-purple-300 mb-2 inline-flex items-center gap-2"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      {text}
    </Button>
  );
};
