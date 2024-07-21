import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserIndexComponent } from './components/user-index/user-index.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserIndexComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
