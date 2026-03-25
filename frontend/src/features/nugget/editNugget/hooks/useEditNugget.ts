import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateNugget } from "../../api/nuggetApi";

export const useUpdateNugget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNugget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nuggets"] });
    },
  });
};
