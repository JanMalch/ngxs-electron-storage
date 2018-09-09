import {Person} from "./store";

export class AddPerson {
  static type = 'AddPerson';
  constructor(public readonly payload: Person) {}
}
