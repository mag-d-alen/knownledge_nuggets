import { useQueryClient, useMutation } from "@tanstack/react-query";

import { createNugget } from "../../api/nuggetApi";

export const useCreateNugget = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createNugget,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['nuggets'] });
        },
    });
};