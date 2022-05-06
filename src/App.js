import React, { useEffect, useState } from "react";

import axios from "axios";

import "./index.scss";

import List from "./components/Todo-sidebar/List";
import AddTasks from "./components/Todo-sidebar/AddTasks";
import Tasks from "./components/Tasks/Tasks";
import Context from "./components/Context";

function App() {
  const [lists, setLists] = useState([]);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    axios.get("http://localhost:3001/colors").then(({ data }) => {
      setColors(data);
    });
  }, []);

  let listAddItemsData = [
    {
      name: "Add new tasks",
      icon: (
        <svg
          width="14"
          height="14"
          viewBox="0 0 12 12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 1V11"
            stroke="#868686"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M1 6H11"
            stroke="#868686"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      id: 1,
      className: true,
    },
  ];

  const onAddList = (obj) => {
    if (obj) {
      let newList = [...lists, obj];
      setLists(newList);
    }
  };

  const onRemove = (id) => {
    let newList = lists.filter((list) => list.id !== id);
    setLists(newList);
  };

  const onAddTask = (taskId, newTask) => {
    let newListTask = lists.map((item) => {
      if (item.id === taskId) {
        item.tasks = [...item.tasks, newTask];
      }
      return item;
    });
    setLists(newListTask);
  };

  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("Do you wanna remove your task?")) {
      let newList = lists.map((list) => {
        if (list.id === listId) {
          list.tasks = list.tasks.filter((task) => task.id !== taskId);
        }
        return list;
      });
      setLists(newList);
      axios.delete("http://localhost:3001/tasks/" + taskId).catch(() => {
        alert("Failed to remove your task");
      });
    }
  };

  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch("http://localhost:3001/tasks/" + taskId, { completed })
      .catch(() => {
        alert("Failed to renew your task");
      });
  };

  const onEditTask = (listId, taskId, taskText) => {
    const newTaskText = window.prompt("Text of the task", taskText);
    if (!newTaskText) {
      return;
    }
    let newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = list.tasks.map((task) => {
          if (task.id === taskId) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return list;
    });
    setLists(newList);
    axios
      .patch("http://localhost:3001/tasks/" + taskId, { text: newTaskText })
      .catch(() => {
        alert("Failed to remove your task");
      });
  };

  const onClickItem = (item) => {
    /*navigate(`/lists/${list.id}`);*/
    setActiveItem(item);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        return item.name === title;
      }
      return item;
    });
    setLists(newList);
  };

  return (
    <Context.Provider
      value={{
        onEditTask,
        onRemoveTask,
        onCompleteTask,
        onEditListTitle,
      }}
    >
      <div className="todo">
        <div className="todo__sidebar">
          {lists.length > 1 && (
            <List
              lists={lists}
              onRemove={onRemove}
              onClickIt={onClickItem}
              activeItem={activeItem}
            />
          )}
          <AddTasks
            onAdd={onAddList}
            colors={colors}
            tasks={listAddItemsData}
          />
        </div>
        {lists.length > 1 && activeItem && (
          <div className="todo__tasks tasks">
            <Tasks tasks={activeItem} onAddTask={onAddTask} />
          </div>
        )}
      </div>
    </Context.Provider>
  );
}
export default App;
