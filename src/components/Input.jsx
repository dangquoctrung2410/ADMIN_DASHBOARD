import React, { useState } from "react";

function CheckboxInput() {
  const [isChecked, setIsChecked] = useState(false);
  const [state, setState] = useState([
    { id: 1, title: "aaa", checked: false },
    { id: 2, title: "bbb", checked: false },
    { id: 3, title: "ccc", checked: false },
    { id: 4, title: "ddd", checked: false },
    { id: 5, title: "eee", checked: false },
  ]);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return state.map((item, index) => (
    <div key={item.id}>
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => {
          setState(
            state.map((item, index) => {
              if (item.id === item.id) {
                return {
                  ...item,
                  checked: !item.checked,
                };
              }
              return item;
            })
          );
        }}
      />
      <label>{item.title}</label>
    </div>
  ));
}

export default CheckboxInput;
