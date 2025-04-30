import React from "react";
import ReactDOM from "react-dom/client";
import { createOvermind, derived } from "overmind";
import { createStateHook, createActionsHook, Provider } from "overmind-react";

const app = createOvermind({
  state: {
    count: 0,
    isEven: derived((state) => state.count % 2 == 0),
  },
  actions: {
    increaseCount({ state }) {
      state.count++;
    },
    decreaseCount({ state }) {
      state.count--;
    },
    reportState({ state }) {
      window.alert(state.isEven);
    },
  }
}, { devtools: false });

const useAppState = createStateHook();
const useActions = createActionsHook();

function App() {
  const state = useAppState();
  const actions = useActions();

  return (
    <div className="App">
      <h1>{state.count}</h1>
      <div>
        <button onClick={actions.decreaseCount}>decrease</button>
        <button onClick={actions.increaseCount}>increase</button>
      </div>
      <div>
        {/*<pre>{JSON.stringify(state, undefined, 2)}</pre>*/}
        <button onClick={actions.reportState}>Show State</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(window.document.getElementById("root")).render(
  <Provider value={app}>
    <App />
  </Provider>
);
