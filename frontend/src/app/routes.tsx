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
import { Marketplace } from './pages/Marketplace';
import { ProviderDetail } from './pages/ProviderDetail';
import { MyRequests } from './pages/MyRequests';
import { RequestDetail } from './pages/RequestDetail';
import { MyPayments } from './pages/MyPayments';
import { PaymentCheckout } from './pages/PaymentCheckout';
import { ProviderRequests } from './pages/ProviderRequests';
import { ProviderRequestDetail } from './pages/ProviderRequestDetail';
import { ActiveServices } from './pages/ActiveServices';
import { CompletedJobs } from './pages/CompletedJobs';

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

  // CLIENTE
  {
    path: '/marketplace',
    Component: Marketplace,
  },
  {
    path: '/providers/:id',
    Component: ProviderDetail,
  },
  {
    path: '/my-requests',
    Component: MyRequests,
  },
  {
    path: '/requests/:id',
    Component: RequestDetail,
  },
  {
    path: '/payments',
    Component: MyPayments,
  },
  {
    path: '/checkout/:id',
    Component: PaymentCheckout,
  },

  // PROVEEDOR
  {
    path: '/provider/requests',
    Component: ProviderRequests,
  },
  {
    path: '/provider/requests/:id',
    Component: ProviderRequestDetail,
  },
  {
    path: '/provider/active-services',
    Component: ActiveServices,
  },
  {
    path: '/provider/completed-jobs',
    Component: CompletedJobs,
  },
]);