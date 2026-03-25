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

export const createNugget = async (nugget: CreateNugget) => {
  const { data } = await axios.post<Partial<Nugget>>(
    `${API_BASE_URL}/nuggets`,
    nugget,
  );
  return data;
};
export const updateNugget = async (nugget: Nugget) => {
  const { data } = await axios.put<Nugget>(
    `${API_BASE_URL}/nuggets/${nugget.id}`,
    nugget,
  );
  return data;
};

export const deleteNugget = async (id: string) => {
  await axios.delete(`${API_BASE_URL}/nuggets/${id}`);
};

export const verifyNugget = async ({
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
};
