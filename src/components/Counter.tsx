import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increaseByAmount,
  increment,
  reset,
} from "../store/slices/counterSlice";
import { RootState } from "../store/store";

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  const [amt, setAmt] = useState(0);
  const addValue = Number(amt) || 0;
  const resetAll = () => {
    setAmt(0);
    dispatch(reset());
  };
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
      <br />
      <hr />
      <input
        type='number'
        value={amt}
        onChange={(e) => setAmt(+e.target.value)}
      />
      <button onClick={() => dispatch(increaseByAmount(addValue))}>
        Add Amount
      </button>
      <button onClick={resetAll}>Reset All</button>
    </div>
  );
}

export default Counter;
