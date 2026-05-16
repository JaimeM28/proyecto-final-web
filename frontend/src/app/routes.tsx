import { createBrowserRouter } from 'react-router';
import { Landing } from './pages/Landing';
import { Register } from './pages/Register';
import { VerifyEmail } from './pages/VerifyEmail';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { OnboardingClient } from './pages/OnboardingClient';
import { OnboardingProvider } from './pages/OnboardingProvider';
import { DashboardClient } from './pages/DashboardClient';
import { DashboardProvider } from './pages/DashboardProvider';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/verify-email',
    Component: VerifyEmail,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/forgot-password',
    Component: ForgotPassword,
  },
  {
    path: '/reset-password',
    Component: ResetPassword,
  },
  {
    path: '/onboarding-client',
    Component: OnboardingClient,
  },
  {
    path: '/onboarding-provider',
    Component: OnboardingProvider,
  },
  {
    path: '/dashboard-client',
    Component: DashboardClient,
  },
  {
    path: '/dashboard-provider',
    Component: DashboardProvider,
  },
]);
