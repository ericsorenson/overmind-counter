import React from "react";
import ReactDOM from "react-dom/client";
import { createOvermind, derived } from "overmind";
import { createStateHook, createActionsHook, Provider } from "overmind-react";

const app = createOvermind({
  state: {
    count: 0,
    isEven: derived((state) => state.count % 2 == 0),
    isOdd: derived((state) => state.count % 2 !== 0),
  },
  actions: {
    increaseCount({ state }) {
      state.count++;
    },
    decreaseCount({ state }) {
      state.count--;
    },
    reportEvenState({ state }) {
      window.alert(state.isEven);
    },
  },
});

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
        {/* uncomment below to make button behavior as-desired */}
        {/* <p>isEven? {`${state.isEven}`}</p> */}
        <p>
          button below does not correctly report value unless `state.isEven` is
          accessed within this page as above
        </p>
        <button onClick={actions.reportEvenState}>is even?</button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(window.document.getElementById("root")).render(
  <Provider value={app}>
    <App />
  </Provider>
);
