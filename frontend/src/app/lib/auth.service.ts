import { api } from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "client" | "provider";
    isEmailVerified: boolean;
    isOnboardingCompleted: boolean;
  };
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: "client" | "provider";
}

export interface SignupResponse {
  message: string;
  requiresEmailVerification: boolean;
  expiresInSeconds: number;
  codeAlreadySent: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: "client" | "provider";
    isEmailVerified: boolean;
    isOnboardingCompleted: boolean;
  };
}

export interface VerifyEmailRequest {
  email: string;
  code: string;
}

export const verifyEmail = async (data: VerifyEmailRequest) => {
  const response = await api.post('/auth/verify-email', data);
  return response.data;
};

export const resendVerificationEmail = async (email: string) => {
  const response = await api.post('/auth/resend-verification-email', {
    email,
  });

  return response.data;
};

export const signup = async (
  data: SignupRequest
): Promise<SignupResponse> => {
  const response = await api.post<SignupResponse>("/auth/signup", data);
  return response.data;
};

export const login = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", data);
  
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  localStorage.setItem('user', JSON.stringify(response.data.user));
  return response.data;
};

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  code: string;
  newPassword: string;
}

export const forgotPassword = async (data: ForgotPasswordRequest) => {
  const response = await api.post('/auth/forgot-password', data);
  return response.data;
};

export const resetPassword = async (data: ResetPasswordRequest) => {
  const response = await api.post('/auth/reset-password', data);
  return response.data;
};