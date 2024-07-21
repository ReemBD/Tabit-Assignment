import { NgModule } from '@angular/core';
import { ModalWrapperComponent } from './components/modal/modal-wrapper.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ModalWrapperComponent],
  imports: [CommonModule],
  exports: [ModalWrapperComponent],
})
export class SharedModule {}
