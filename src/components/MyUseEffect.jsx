import React, { useEffect, useState } from "react";

export default function MyUseEffect() {
  const [count, setCount] = useState(0);
  const handleCount = (e) => {
    setCount(count + 1);
  };

  //
  useEffect(() => {
    const hello = document.getElementById("hello");
    hello.innerText = count;
  }, [count]);
  return (
    <div>
      <h1>Use Effect {count}</h1>
      <div id="hello"></div>
      <button onClick={handleCount}>+</button>
    </div>
  );
}
