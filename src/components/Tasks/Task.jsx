import React, { useContext } from "react";
import removeSVG from "../../assets/img/remove.svg";
import panSVG from "../../assets/img/pan.svg";
import "./Tasks.scss";
import Context from "../Context";

const Task = ({ task, tasks, completed }) => {
  const { onEditTask, onRemoveTask, onCompleteTask } = useContext(Context);


  const onChecked = (e) => {
    onCompleteTask(tasks.id, task.id, e.target.checked);
  };


  return (
    <li key={task.id} className="tasks__list-item">
      <div className="tasks__list-wrapper">
        <label className="tasks__checkbox">
          <input
            className="tasks__checkbox-input"
            type="checkbox"
            onChange={onChecked}
            checked={completed}
          />
          <span className="tasks__checkbox-replacer" />
          <div className="tasks__list-text">
            <span>{task.text}</span>
          </div>
        </label>
        <img
          onClick={() => onRemoveTask(tasks.id, task.id)}
          className={"tasks__close-icon"}
          src={removeSVG}
          alt=""
        />{" "}
        <img
          onClick={() => onEditTask(tasks.id, task.id, task.text)}
          className={"tasks__edit"}
          src={panSVG}
          alt=""
        />
      </div>
    </li>
  );
};

export default Task;
