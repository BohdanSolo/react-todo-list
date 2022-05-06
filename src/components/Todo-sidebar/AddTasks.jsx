import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import "./Pop-up.scss";
import "../../index.scss";
import closeSVG from "../../assets/img/close.svg";
import axios from "axios";

const AddTasks = ({ tasks, colors, onAdd }) => {
  const [visible, setVisible] = useState(false);
  const [activeColor, setActiveColor] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const popUpRef = useRef();

  useEffect(() => {
    if (Array.isArray(colors)) {
      setActiveColor(colors[0].id);
    }
  }, [colors]);
  const addList = () => {
    if (!inputValue) {
      alert("Set value");
      return;
    }
    setIsLoading(true);
    axios
      .post("http://localhost:3001/lists", {
        name: inputValue,
        colorId: activeColor,
      })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === activeColor)[0].hex;
        const listObj = { ...data, color, tasks: [] };
        onAdd(listObj);
        onClose();
      })
      .catch((e) => {
        alert(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
    /*
    onAdd(obj);
*/
    onClose();
    /*метод пост каже що ми маємо створити на сервері новий об'єкт, першим аргументом пердаєш сервер, а другим об'єкт який хочеш стоврити.
     * Загалом що робить фнція, вона каже що ми хочем ств новй об'єкт на такому то сервері. Другим аругментом ми передаєм цей об'єкт, той який хочемо створити. після цього ми отримуємо цей об'єкт в дейті. і передаємо його в фнцію onAdd. Зауваж, що ми можемо створювати об'єкт в .пост повністю, а можемо і створювати його в .зені. Але в зені ми може створювати нові властивості об'єкту, в той час як в потсі ми маємо передати другим аргументом ті властиості об які від нас очікують.   */
  };
  const onClose = () => {
    setVisible(false); // Close input
    setInputValue(""); // Clear input value
    setActiveColor(colors[0].id); // Set default color
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClose = (e) => {
      if ((!e.path.includes(popUpRef.current))) {
        onClose()
      }
  };

  useEffect(() => {
        if (visible) {
          document.body.addEventListener("click", handleClose);
        }
        return () => document.body.removeEventListener("click", handleClose);
      },
      [handleClose, visible]);

  return (
    <React.Fragment>
      <div className={"list__add-tasks"} onClick={() => setVisible(!visible)}>
        {tasks.map((item) => (
          <div className={classnames({ active: item.active })} key={item.id}>
            {item.icon ? (
              <i>{item.icon}</i>
            ) : (
              <i
                className={"list__icon"}
                style={{ backgroundColor: `${item.color}` }}
              />
            )}
            <span className={item.className ? "lists__add-tasks-btn" : ""}>
              {item.name}
            </span>
            {/* Також можна застосувати бібліотеку classnames: className={classnames({'add-tasks__btn': item.className})}*/}
          </div>
        ))}
      </div>
      {visible && (
        <div className="list__pop-up" ref={popUpRef}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={"input__field"}
            type="text"
            placeholder={"Name of directory"}
          />
          <div className="list__pop-up-colors">
            <ul>
              {colors.map((color) => (
                <li
                  onClick={() => setActiveColor(color.id)}
                  className={activeColor === color.id ? "active" : ""}
                  key={color.id}
                  style={{ backgroundColor: `${color.hex}` }}
                />
              ))}
            </ul>
          </div>
          <button onClick={addList} className={"btn"}>
            {isLoading ? "Adding..." : "Add"}
          </button>
          <div onClick={onClose} className="list__pop-up-close">
            <img src={closeSVG} alt="Close icon" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default AddTasks;
