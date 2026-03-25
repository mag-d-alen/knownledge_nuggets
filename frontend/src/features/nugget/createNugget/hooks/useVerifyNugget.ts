import { useMutation } from "@tanstack/react-query";
import { verifyNugget } from "../../api/nuggetApi";

export const useVerifyNuggetWithAI = () => {
  const { data, isPending, isError, mutate } = useMutation({
    mutationFn: verifyNugget,
  });
  return {
    data,
    isPending,
    isError,
    mutate,
  };
};
