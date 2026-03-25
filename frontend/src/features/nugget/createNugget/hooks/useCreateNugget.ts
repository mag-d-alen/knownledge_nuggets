import { useQueryClient, useMutation } from "@tanstack/react-query";

import { createNugget } from "../../api/nuggetApi";

export const useCreateNugget = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationFn: createNugget,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['nuggets'] });
        },
    });

    return { mutate, isPending, isError, isSuccess };
};