import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingName } from './modules/core/models/routing-name.model';

const routes: Routes = [
  {
    path: RoutingName.User,
    loadChildren: () =>
      import('./modules/features/user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
