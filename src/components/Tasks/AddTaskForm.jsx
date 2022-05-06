import React, {useEffect, useRef, useState} from "react";
import addSVG from "../../assets/img/add.svg";
import "./Tasks.scss";
import axios from "axios";
import {BASE_URL} from "../../App";

const AddTaskForm = ({ onAddTask, tasks }) => {
  const [visibleForm, setVisibleForm] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef()

  const closeOutside = (e) => {
    if (!e.path.includes(formRef.current)) {
      setVisibleForm(true)
    }
  }

  useEffect(() => {
    if (!visibleForm) {
      document.body.addEventListener("click", closeOutside)
    }
    return (() => document.body.removeEventListener("click", closeOutside))
  }, [visibleForm])

  const AddTask = () => {
    let newTask = {
      listId: tasks.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/tasks`, newTask)
      .then(({ data }) => {
        onAddTask(tasks.id, data);
        setVisibleForm(!visibleForm);
        setInputValue("");
      })
      .catch(() => {
        alert("Error occurred during creating the task");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__add" ref={formRef}>
      {visibleForm ? (
        <div
          className="tasks__add-rolled"
          onClick={() => setVisibleForm(!visibleForm)}
        >
          <img src={addSVG} alt="Add icon(plus)" className="tasks__add-icon" />
          <span className="tasks__add-text">New task</span>
        </div>
      ) : (
        <div className="tasks__add-form">
          <input
            type="text"
            className={"tasks__input"}
            placeholder={"Text of your task"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            disabled={isLoading}
            className={"btn btn--add"}
            onClick={AddTask}
          >
            {isLoading ? "Adding..." : "Add task"}
          </button>
          <button
            className={"btn--close"}
            onClick={() => setVisibleForm(!visibleForm)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
