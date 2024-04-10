import { Provider } from "react-redux";
import "./App.css";
import Counter from "./components/Counter";
import { store } from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Counter />
      </Provider>
    </>
  );
}

export default App;
