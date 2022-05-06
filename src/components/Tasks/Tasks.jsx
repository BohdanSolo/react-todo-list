import React, { useContext } from "react";
import Context from "../Context";

import "./Tasks.scss";

import panSVG from "../../assets/img/pan.svg";

import axios from "axios";

import AddTaskForm from "./AddTaskForm";
import Task from "./Task";


const Tasks = ({ tasks, onAddTask, withoutEmpty }) => {
  const { onEditListTitle } = useContext(Context);


    const onEdit = () => {
    const newTitle = window.prompt("Name of the title", tasks.name);
    if (newTitle) {
      axios
        .patch("http://localhost:3001/lists/" + tasks.id, {
          name: newTitle,
        })
        .catch(() => {
          alert("Server wasn't refreshed");
        });
      onEditListTitle(tasks.id, newTitle);
    }
  };

  return (
    <div className="tasks__item">
      <div className="tasks__title">
        {tasks.tasks && (
          <h2 style={{ color: `${tasks.color.hex}` }}>{tasks.name}</h2>
        )}
        <img
          onClick={onEdit}
          className={"tasks__icon"}
          src={panSVG}
          alt="Pen icon"
        />
      </div>
      {!withoutEmpty && tasks.tasks && tasks.tasks.length < 1 && (
        <h2 className="tasks__subtitle">There is no tasks</h2>
      )}
      <ul className="tasks__list">
        {tasks.tasks &&
          tasks.tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              tasks={tasks}
              completed={task.completed}
            />
          ))}
      </ul>
      <AddTaskForm tasks={tasks} onAddTask={onAddTask} />
    </div>
  );
};

export default Tasks;
