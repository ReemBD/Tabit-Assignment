import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SecurityContext,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: 'a[href]',
})
export class ExternalLinkDirective implements OnChanges {
  @HostBinding('attr.rel') public relAttr: string = null;
  @HostBinding('attr.target') public targetAttr: string = null;
  @Input() href: string;

  constructor(private readonly elementRef: ElementRef, private readonly sanitizer: DomSanitizer) {}

  public ngOnChanges(): void {
    this.elementRef.nativeElement.href = this.sanitizer.sanitize(SecurityContext.URL, this.href);
    if (this.isLinkExternal()) {
      this.relAttr = 'noopener';
      this.targetAttr = '_blank';
    } else {
      this.relAttr = null;
      this.targetAttr = null;
    }
  }

  private isLinkExternal(): boolean {
    return !this.elementRef.nativeElement.hostname.includes(location.hostname);
  }
}
