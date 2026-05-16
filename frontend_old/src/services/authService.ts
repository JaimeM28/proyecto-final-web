import axios from "axios";
import type { LoginResponse } from "../types/auth";

const API_URL = "http://localhost:3000";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, {
    email,
    password,
  });

  return response.data;
};