import React, { useRef } from 'react';
import ActionObservable from './ActionObservable';
import { ActionObservableContext } from './context';

interface ActionObservableProviderProps {
  observable: ActionObservable;
}

const ActionObservableProvider: React.FC<ActionObservableProviderProps> = ({
  observable,
  children,
}) => {
  const ref = useRef(observable);

  return (
    <ActionObservableContext.Provider value={ref.current}>
      {children}
    </ActionObservableContext.Provider>
  );
};

export default ActionObservableProvider;
