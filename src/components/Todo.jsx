//

import { useState, useEffect } from "react";
import "./Todo.css";
import { FaCheck } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
const myTodo = "myTodoApp";

export default function Todo() {
  const [inputValue, setInputValue] = useState("");
  const [task, setTask] = useState(() => {
    const rawTodo = localStorage.getItem(myTodo);
    if (!rawTodo) return [];
    return JSON.parse(rawTodo);
  });
  const [time, setTime] = useState("");

  // Task Entry Area
  const handleTaskEntry = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmitData = (e) => {
    e.preventDefault();

    if (!inputValue) return;

    if (task.some((t) => t.text === inputValue)) {
      setInputValue("");
      return;
    }

    setTask((prevTask) => [
      ...prevTask,
      { text: inputValue, completed: false },
    ]);
    setInputValue("");
  };
  // Todo Local Storage
  useEffect(() => {
    localStorage.setItem(myTodo, JSON.stringify(task));
  }, [task]);

  // Date & Time code (useEffect instead of setInterval in render)
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedDate = new Date().toLocaleDateString();
      const updatedTime = new Date().toLocaleTimeString();
      setTime(`${updatedDate} - ${updatedTime}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Delete Entry from the list
  const handleTaskDeletebtn = (value) => {
    const updatedTask = task.filter((curTask) => curTask.text !== value);
    setTask(updatedTask);
  };

  // Checked / Unchecked
  const handleCheckedClass = (value) => {
    const updatedTask = task.map((curTask) =>
      curTask.text === value
        ? { ...curTask, completed: !curTask.completed }
        : curTask
    );
    setTask(updatedTask);
  };

  return (
    <div className="todo-app">
      <header className="todo-header">
        <h1>TODO APP</h1>

        <h2>{time}</h2>
      </header>

      <section className="add-task">
        <form onSubmit={handleSubmitData}>
          <div className="task-entry">
            <input type="text" value={inputValue} onChange={handleTaskEntry} />
          </div>
          <div className="add-btn">
            <button type="submit">Add Task</button>
          </div>
        </form>
      </section>

      <section className="show-entry">
        <ul className="list-entry">
          {task.map((curElem, index) => {
            return (
              <li
                key={index}
                className={`task-list ${curElem.completed ? "checked" : ""}`}
              >
                <span>{curElem.text}</span>
                <button
                  className="check-btn"
                  onClick={() => handleCheckedClass(curElem.text)}
                >
                  <FaCheck />
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleTaskDeletebtn(curElem.text)}
                >
                  <MdDeleteForever />
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="clear-btn">
        <button
          className="clear"
          onClick={() => {
            setTask([]);
            localStorage.removeItem(myTodo);
          }}
        >
          Clear All
        </button>
      </section>
    </div>
  );
}
