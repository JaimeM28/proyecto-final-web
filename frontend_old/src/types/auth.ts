export interface User {
  id: string;
  name: string;
  email: string;
  role: "client" | "provider";
  isEmailVerified: boolean;
  isOnboardingCompleted: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}