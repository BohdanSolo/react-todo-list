import React from "react";
import "./List.scss";
import classnames from "classnames";
import removeSVG from "../../assets/img/remove.svg";
import axios from "axios";
/*Бібліотека для класів (npm install classnames) Викликаєш функцію classnames в атрибуті className. Аргументи функції це класи, скільки аргументі стільки і окремих класів ("a","b","c" -or- items.class). Також можна по умові ці класи ставити в аргументи фнції: classnames("active": item.active) --- задасьбся клас ектів якщо items.active є ture*/
const List = ({
  lists,
  onRemove,
  onClickIt,
  activeItem,
  allTasks,
}) => {
  const RemoveList = (item) => {
    axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
      onRemove(item.id);
    });
  };

  return (
    <ul className="list">
      {lists?.map((item, index) => (
          <li
            key={index}
            onClick={() => onClickIt(item)}
            className={classnames(
              {
                active: allTasks
                  ? allTasks
                  : !allTasks && activeItem && activeItem.id === item.id,
              },
              "list__item"
            )}
          >
            {item && (
              <i
                className={"list__icon"}
                style={{
                  backgroundColor: `${item.color.hex || "#C355F5"}`,
                  width: 14,
                  height: 14,
                }}
              />
            )}
            <span
              className={item.className ? "lists__add-tasks-btn" : "list__text"}
            >
              {item.name}
              {lists &&
                lists.length > 1 &&
                item.tasks &&
                ` (${item.tasks.length})`}
            </span>
            {/*Також можна застосувати бібліотеку classnames: className={classnames({'add-tasks__btn': item.className})} */}
              <img
                onClick={() => RemoveList(item)}
                className={"list__icon-close"}
                src={removeSVG}
                alt="Close icon"
              />
          </li>
        ))}
    </ul>
  );
};

export default List;
