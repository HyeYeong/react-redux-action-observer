import { createContext } from 'react';
import ActionObservable from './ActionObservable';

export const ActionObservableContext = createContext<ActionObservable>(
  new ActionObservable()
);
