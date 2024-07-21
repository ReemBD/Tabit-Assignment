import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserIndexComponent } from './components/user-index/user-index.component';
import { UserRoutingModule } from './user-routing.module';
import { UserTableComponent } from './components/user-table/user-table.component';

import { UserPreviewComponent } from './components/user-preview/user-preview.component';
import { UserDetailsModalComponent } from './components/user-details-modal/user-details-modal.component';
import { SharedModule } from 'app/modules/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [UserIndexComponent, UserTableComponent, UserPreviewComponent, UserDetailsModalComponent],
  imports: [CommonModule, UserRoutingModule, MatTableModule, SharedModule],
})
export class UserModule {}
