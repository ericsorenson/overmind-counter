import ReactDOM from 'react-dom/client';
import { createOvermind, derived, IContext } from "overmind";
import { createStateHook, createActionsHook, Provider } from "overmind-react";

type State = {
  count: number;
  isEven: boolean;
}

const state: State = {
  count: 0,
  isEven: derived((state: State) => state.count % 2 === 0),
};

type Actions = {
  increaseCount: (state: State) => void;
  decreaseCount: (state: State) => void;
  reportState: (state: State) => void;
}

const actions: Actions = {
  increaseCount( state: State ) {
    state.count++;
  },
  decreaseCount(state: State) {
    state.count--;
  },
  reportState(state: State) {
    window.alert(state.isEven);
  },
};

const overmindApp = createOvermind({
  state,
  actions
}, { devtools: false });

export type Context = IContext<{
  state: State;
  actions: Actions;
}>;

const useAppState = createStateHook<Context>();
const useActions = createActionsHook<Context>();

function App() {
  const { count } = useAppState();
  const {decreaseCount, increaseCount, reportState} = useActions();

  return (
    <div className="App">
      <h1>{count}</h1>
      <div>
        <button onClick={decreaseCount}>decrease</button>
        <button onClick={increaseCount}>increase</button>
      </div>
      <div>
        <button onClick={reportState}>Show State</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(window.document.getElementById("root")!).render(
  <Provider value={overmindApp}>
    <App />
  </Provider>
);
