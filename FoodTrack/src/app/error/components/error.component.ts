import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ErrorState } from '../store/error.state';
import { Observable } from 'rxjs';
import { Error } from 'src/app/error/error.models';
import { ResetErrors } from '../store/error.actions';

@Component({
  selector: 'sn-errors',
  template: `
    <div class="errors" *ngIf="(errors$ | async)?.length">
      <p *ngFor="let error of (errors$ | async)">
      </p>
      <a (click)="resetErrors()"><p>icon error</p></a>
    </div>
  `,
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnDestroy {
  @Select(ErrorState) errors$: Observable<Error[]>;

  constructor(private store: Store) {}

  resetErrors() {
    this.store.dispatch(new ResetErrors());
  }

  getErrorMessage({ detail, data }: Error) {
    if (detail) {
      return detail;
    }

    if (data) {
      return `You ${data.label} is wrong`;
    }
  }

  ngOnDestroy() {
    this.store.dispatch(new ResetErrors());
  }
}
