import { Middleware } from 'redux';
import { Action, Observer } from './types';

class ActionObservable<T = any> {
  private observers = new Set<Observer>();

  constructor() {
    this.subscribe = this.subscribe.bind(this);
    this.notifyObservers = this.notifyObservers.bind(this);
    this.createMiddleware = this.createMiddleware.bind(this);
  }

  public subscribe(observer: Observer) {
    this.observers.add(observer);
    return () => {
      this.observers.delete(observer);
    };
  }

  public notifyObservers(action: Action<T>) {
    this.observers.forEach((observer) => observer(action));
  }

  public createMiddleware(): Middleware {
    return (_storeApi) => (next) => (action) => {
      next(action);

      // call after all reducer runs
      this.notifyObservers(action);
    };
  }
}

export default ActionObservable;
