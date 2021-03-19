import { ClientAuthGuard } from '@wise-guy/client-auth';
import { AppPageRoute } from '@wise-guy/data';

export const USER_CLIENT_ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./app/client-landing/client-landing.module').then(
        (module) => module.ClientLandingModule
      ),
  },
  {
    path: AppPageRoute.STACK,
    loadChildren: () =>
      import('./app/client-stack/client-stack.module').then(
        (module) => module.ClientStackModule
      ),
    canLoad: [ClientAuthGuard]
  },
  {
    path: AppPageRoute.DASHBOARD,
    loadChildren: () =>
      import('./app/client-dashboard/client-dashboard.module').then(
        (module) => module.ClientDashboardModule
      ),
    canLoad: [ClientAuthGuard]
  },
  {
    path: AppPageRoute.ORDER_FORM,
    redirectTo: `${AppPageRoute.ORDER_FORM}/new`,
    pathMatch: 'full',
    canLoad: [ClientAuthGuard]
  },
  {
    path: `${AppPageRoute.ORDER_FORM}/:id`,
    loadChildren: () =>
      import('./app/client-order-form/client-order-form.module').then(
        (module) => module.ClientOrderFormModule
      ),
    canLoad: [ClientAuthGuard]
  },
  {
    path: `${AppPageRoute.ORDER_INFO}/:id`,
    loadChildren: () =>
      import('./app/client-order-info/client-order-info.module').then(
        (module) => module.ClientOrderInfoModule
      )
  }
];

