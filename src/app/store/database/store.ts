import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AddPerson} from "./actions";

export type Person = { id: string, name: string};
export type PersonMap = { [id: string]: Person };

@State<PersonMap>({
  name: "persons",
  defaults: {}
})
export class PersonMapState {

  @Action(AddPerson)
  addPerson({getState, patchState}: StateContext<PersonMap>, {payload}: AddPerson) {
    patchState({
      [payload.id]: payload
    });
  }
}
