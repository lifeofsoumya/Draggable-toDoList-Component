import React, { useState} from "react";
import Draggable from "react-draggable";
import "./styles.css"

function Todo({ item, index, removeTodo }) {
  return (
    <li key={index}>
      {item}
      <span
        id="rmv"
        onClick={() => removeTodo(index)}
        style={{ float: "right" }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3zm1 2H6v12h12V8zm-4.586 6 1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14zM9 4v2h6V4H9z" />
        </svg> 
      </span>
    </li>
  );
}

function App() {
  const [isDrag, setDrag] = useState(false)
  const [InputText, setInputText] = useState("");
  const [All, setAll] = useState(
    JSON.parse(localStorage.getItem("todo-list")) || []
  );

  function handleChange(event) {
    const newVal = event.target.value;
    setInputText(newVal);
  }

  function handleSubmit(event) {
    if (event.key === "Enter") {
      updateChange();
    }
  }

  function updateChange() {
    setAll((prevVal) => {
      return [...prevVal, InputText];
    });
    setInputText("");
    localStorage.setItem("todo-list", JSON.stringify(All));
  }

  function removeTodo(index) {
    setAll((prevVal) => {
      return prevVal.filter((_, i) => i !== index);
    });
    localStorage.setItem("todo-list", JSON.stringify(All));
  }

  function toggleDrag(){
    setDrag(prev => {
      return !isDrag;
    })
  }

  return (
    isDrag ? 
    <Draggable>
      <div className="container">
      <p class="drag" title="Make undraggable" onClick={toggleDrag} ><span role="img"> 📎 </span></p>
        <div className="heading">
          <h1>To-Do List</h1>
        </div>
        <div className="form">
          <input
            id="ip"
            // autoFocus
            onChange={handleChange}
            onKeyDown={handleSubmit}
            type="text"
            value={InputText}
            autocomplete="off"
            className="ipVal"
          />
          <button onClick={updateChange}>
            <span>Add</span>
          </button>
        </div>
        <div>
          <ul>
            {All.map((item, index) => (
              <Todo
                key={index}
                item={item}
                index={index}
                removeTodo={removeTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    </Draggable>

    : 
    <div className="container">
        <p class="drag" title="Make Draggable" onClick={toggleDrag}><span role="img"> 📎 </span></p>
        <div className="heading">
          <h1>To-Do List</h1>
        </div>
        <div className="form">
          <input
            id="ip"
            // autoFocus
            onChange={handleChange}
            onKeyDown={handleSubmit}
            type="text"
            value={InputText}
            autocomplete="off"
            className="ipVal"
          />
          <button onClick={updateChange}>
            <span>Add</span>
          </button>
        </div>
        <div>
          <ul>
            {All.map((item, index) => (
              <Todo
                key={index}
                item={item}
                index={index}
                removeTodo={removeTodo}
              />
            ))}
          </ul>
        </div>
      </div>
  );
}

export default App;
