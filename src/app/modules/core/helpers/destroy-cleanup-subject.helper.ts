import { ReplaySubject } from 'rxjs';

export class DestroyCleanupSubject extends ReplaySubject<boolean> {
  public constructor() {
    super(1);
  }

  public cleanup(): void {
    this.next(true);
    this.complete();
  }
}
