import { AdminAppPageRoute } from '@wise-guy/data';
import { environment } from './environments/environment';

export const ADMIN_CLIENT_ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: environment.production ? AdminAppPageRoute.MAIN : AdminAppPageRoute.PUSH_FORM
  },
  {
    path: AdminAppPageRoute.MAIN,
    loadChildren: () =>
      import('./app/admin-client-main/admin-client-main.module').then(
        (module) => module.AdminClientMainModule
      ),
  },
  {
    path: AdminAppPageRoute.PUSH_FORM,
    loadChildren: () =>
      import('./app/admin-client-push-form/admin-client-push-form.module').then(
        (module) => module.AdminClientPushFormModule
      ),
  }
];

