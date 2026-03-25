import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteNugget } from "../../api/nuggetApi";

export const useDeleteNugget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNugget,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nuggets"] });
    },
  });
};
