import {Action, Selector, State, StateContext} from '@ngxs/store';
import {SetName} from "./actions";

type MetaStateModel = { timestamp: string };

@State<MetaStateModel>({
  name: "meta",
  defaults: {
    timestamp: undefined
  }
})
export class MetaState {

  @Action(SetName)
  setName({patchState}: StateContext<MetaStateModel>, {payload}: SetName) {
    patchState({
      timestamp: payload
    });
  }

}
