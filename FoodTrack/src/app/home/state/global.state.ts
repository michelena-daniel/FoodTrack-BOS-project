import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Global } from '../home.models';
import {
  Login,
  Register,
  UpdateUserProfile,
  LoginSuccess,
  RegisterSuccess,
  LoginFailed,
  UpdateUserProfileSuccess,
  RegisterFailed,
  UpdateUserProfileFailed
} from '../../auth/store/auth.actions';

@State<Global>({
  name: 'global',
  defaults: {
    isFetching: false
  }
})
export class GlobalState {
  @Selector()
  static isFetching({ isFetching }: Global) {
    return isFetching;
  }

  @Action([Login, Register, UpdateUserProfile])
  startFetching({ patchState }: StateContext<Global>) {
    patchState({ isFetching: true });
  }

  @Action([
    LoginSuccess,
    RegisterSuccess,
    UpdateUserProfileSuccess,
    LoginFailed,
    RegisterFailed,
    UpdateUserProfileFailed
  ])
  endFetching({ patchState }: StateContext<Global>) {
    patchState({ isFetching: false });
  }
}
