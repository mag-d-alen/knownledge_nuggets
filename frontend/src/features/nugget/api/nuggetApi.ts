import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { CreateNugget, Nugget, PaginatedNuggets } from "../models/types";

const API_BASE_URL = "http://localhost:8080/api";

export const getNuggets = async ({
  page,
  limit = 5,
}: {
  page: number;
  limit?: number;
}): Promise<PaginatedNuggets> => {
  const { data } = await axios.get<PaginatedNuggets>(
    `${API_BASE_URL}/nuggets?page=${page}&limit=${limit}`,
  );
  return data;
};

export const useGetNuggetById = (id: string) => {
  return useQuery({
    queryKey: ["nugget", id],
    queryFn: async () => {
      const { data } = await axios.get<Nugget[]>(
        `${API_BASE_URL}/nuggets/${id}`,
      );
      return data[0];
    },
  });
};
export const createNugget = async (nugget: CreateNugget) => {
  const { data } = await axios.post<Partial<Nugget>>(
    `${API_BASE_URL}/nuggets`,
    nugget,
  );
  return data;
};

export const useUpdateNugget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (nugget: Nugget) => {
      const { data } = await axios.put<Nugget>(
        `${API_BASE_URL}/nuggets/${nugget.id}`,
        nugget,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nuggets"] });
    },
  });
};
export const deleteNugget = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/nuggets/${id}`);
};

export const useDeleteNugget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_BASE_URL}/nuggets/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["nuggets"] });
    },
  });
};

// Verify Nugget with AI
export const useVerifyNuggetWithAI = () => {
  return useMutation({
    mutationFn: async ({
      title,
      content,
    }: {
      title: string;
      content: string;
    }) => {
      const { data } = await axios.post<{ feedback: string }>(
        `${API_BASE_URL}/nuggets/verify`,
        { title, content },
      );
      return data;
    },
  });
};

export const useExplainNuggetWithAI = () => {
  return useMutation({
    mutationFn: async ({
      title,
      content,
      question,
    }: {
      title: string;
      content: string;
      question: string;
    }) => {
      const { data } = await axios.post<{ explanation: string }>(
        `${API_BASE_URL}/nuggets/explain`,
        { title, content, question },
      );
      return data;
    },
  });
};
