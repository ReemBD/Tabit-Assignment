import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserIndexComponent } from './components/user-index/user-index.component';
import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { UserDetailsModalComponent } from './components/user-details-modal/user-details-modal.component';
import { SharedModule } from 'app/modules/shared/shared.module';

@NgModule({
  declarations: [UserIndexComponent, UserListComponent, UserPreviewComponent, UserDetailsModalComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
