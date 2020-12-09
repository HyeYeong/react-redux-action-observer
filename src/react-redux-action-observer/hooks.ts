import { useContext, useEffect } from 'react';
import { ActionObservableContext } from './context';
import { Action } from './types';

export const useActionObservable = () => useContext(ActionObservableContext);

export const useActionObserver = <T = any>(
  observer: (action: Action<T>) => void,
  types: T[]
) => {
  const actionObserver = useActionObservable();

  useEffect(() => {
    const unsubscribe = actionObserver.subscribe((action) => {
      if (!types.includes(action.type)) {
        return;
      }
      observer(action);
    });

    return () => {
      unsubscribe();
    };
  });
};
