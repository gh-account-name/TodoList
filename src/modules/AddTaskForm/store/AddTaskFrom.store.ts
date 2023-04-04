import { action, computed, observable, makeObservable } from 'mobx';
import { delay } from 'helpers/index';
import { AddFormEntity } from 'domains/index';

type PrivateFields = '_isLoading';

export class AddTaskFormStore {
  constructor() {
    makeObservable<this, PrivateFields>(this, {
      _isLoading: observable,

      isLoading: computed,

      addTask: action,
    });
  }

  private _isLoading = false;

  get isLoading(): boolean {
    return this._isLoading;
  }

  addTask = async (body: AddFormEntity) => {
    this._isLoading = true;

    console.log(body);
    console.log('sending data...');
    await delay(3000);
    console.log('success!');

    this._isLoading = false;
  };
}

export const AddTaskFormStoreInstance = new AddTaskFormStore();
