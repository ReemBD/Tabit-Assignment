import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { createPhoneValidator, createWebsiteLinkValidator } from '@core/helpers/validations.helper';
import { UserService } from '@core/services/user.service';
import { User } from '@features/user/models/user.model';

type UserFormFields = 'name' | 'email' | 'phone' | 'website';

@Component({
  selector: 'app-user-details-modal',
  templateUrl: './user-details-modal.component.html',
  styleUrl: './user-details-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailsModalComponent implements OnInit {
  @ViewChild('modal') modalRef: ElementRef;
  @Input() user: User;
  @Output() closeUserDetails: EventEmitter<null> = new EventEmitter();

  public userForm: FormGroup;

  public constructor(
    private readonly formBuilder: FormBuilder,
    public readonly userService: UserService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  @HostListener('document:click', ['$event'])
  public onGlobalClick($event: Event): void {
    const isClickOutside = !this.modalRef.nativeElement.contains($event.target);
    if (!isClickOutside) return;
    this.closeUserDetails.emit();
  }

  public isFieldValid(field: UserFormFields): boolean {
    const controls = this.userForm.controls;
    return !(controls[field].touched && controls[field].dirty && controls[field].invalid);
  }

  public onSubmit(): void {
    if (!this.isFormValid()) return;
    this.userService
      .updateUser(this.user.id, this.userForm.value)
      .subscribe(() => this.closeUserDetails.emit());
  }

  private isFormValid(): boolean {
    return Object.keys(this.userForm.controls).every((key) =>
      this.isFieldValid(key as UserFormFields)
    );
  }

  private initForm(): void {
    this.userForm = this.formBuilder.group({
      name: [this.user.name, [Validators.required, Validators.maxLength(20)]],
      email: [{ value: this.user.email, disabled: true }, [Validators.email]],
      phone: [this.user.phone, [createPhoneValidator()]],
      website: [this.user.website, [createWebsiteLinkValidator()]],
    });
  }
}
