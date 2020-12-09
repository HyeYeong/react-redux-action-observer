import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Action, useActionObserver } from 'react-redux-action-observer';
import { changeBy, decrement, increment, selectState } from './redux';

const Home = () => {
  const dispatch = useDispatch();

  const state = useSelector(selectState);

  const [action, setAction] = useState<Action>({ type: 'INIT' });

  const [input, setInput] = useState('0');

  const actionTypes = ['INCREMENT', 'DECREMENT', 'CHANGE_BY'];
  const [actionTypesToObserve, setActionTypesToObserve] = useState(actionTypes);
  const toggleActionTypesToObserve = (actionType: string) => {
    if (actionTypesToObserve.includes(actionType)) {
      setActionTypesToObserve(
        actionTypesToObserve.filter(
          (existingActionType) => existingActionType !== actionType
        )
      );
    } else {
      setActionTypesToObserve([...actionTypesToObserve, actionType]);
    }
  };

  useActionObserver((action) => {
    console.log('component says:', action);
    setAction(action);
  }, actionTypesToObserve);

  return (
    <div className="Demo">
      <div></div>
      <button onClick={() => dispatch(increment())}>increase</button>
      <button onClick={() => dispatch(decrement())}>decrease</button>
      <input
        type="number"
        value={input}
        onChange={(event) => setInput(event.target.value)}
      ></input>
      <button
        onClick={() => {
          const value = Number(input);
          if (isNaN(value)) {
            alert('Invalid number.');
            return;
          }
          dispatch(changeBy(value));
        }}
      >
        Add
      </button>
      <p>{`state: ${state}`}</p>
      <p>{`listening for: ${actionTypesToObserve}`}</p>
      <div className="toggle-action-types">
        <p>toggle: </p>
        {actionTypes.map((actionType) => (
          <button
            key={actionType}
            onClick={() => toggleActionTypesToObserve(actionType)}
          >
            {actionType}
          </button>
        ))}
      </div>
      <div className="last-action">
        <p>observed action:</p>
        <pre>{JSON.stringify(action, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Home;
