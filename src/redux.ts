import { Action, ActionObservable } from 'react-redux-action-observer';
import { applyMiddleware, createStore } from 'redux';

export const increment = () => ({
  type: 'INCREMENT',
  time: Date.now(),
});

export const decrement = () => ({
  type: 'DECREMENT',
  time: Date.now(),
});

export const changeBy = (value: number) => ({
  type: 'CHANGE_BY',
  payload: value,
  time: Date.now(),
});

const reducer = (state = 0, action: Action): number => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'CHANGE_BY':
      return state + action.payload;
    default:
      return state;
  }
};

export const actionObservable = new ActionObservable();

export const selectState = (state: number) => state;

export const store = createStore(
  reducer,
  applyMiddleware(actionObservable.createMiddleware())
);
