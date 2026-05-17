import { api } from './api';

export interface ProviderOnboardingRequest {
  trade: string;
  location: string;
  description: string;
  price: number;
}

export interface ClientOnboardingRequest {
  location: string;
}

export const completeProviderOnboarding = async (
  data: ProviderOnboardingRequest
) => {
  const token = localStorage.getItem('accessToken');

  const response = await api.post('/providers/onboarding', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const completeClientOnboarding = async (
  data: ClientOnboardingRequest
) => {
  const token = localStorage.getItem('accessToken');

  const response = await api.post('/clients/onboarding', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};