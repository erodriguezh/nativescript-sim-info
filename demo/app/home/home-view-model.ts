import { Observable } from '@nativescript/core';

import { SimInfo } from "nativescript-sim-info";

export function ObservableProperty() {
  return (target: Observable, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      get() {
        return this["_" + propertyKey];
      },
      set(value) {
        if (this["_" + propertyKey] === value) {
          return;
        }

        this["_" + propertyKey] = value;
        this.notifyPropertyChange(propertyKey, value);
      },
      enumerable: true,
      configurable: true
    });
  };
}

export class HomeViewModel extends Observable {
  @ObservableProperty() simData: string;

  constructor() {
    super();
    this.simData = 'empty';
  }

  load(): void {
    const simInfo = new SimInfo();
    simInfo
      .getData()
      .then((resolved) => {
        this.simData = JSON.stringify(resolved, null, 4);
      }).catch((error) => {
        this.simData = JSON.stringify(error, null, 4);
      });
  }
}
