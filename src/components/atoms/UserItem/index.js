import  userNameState  from '../../../States.js';
import { useRecoilState,useResetRecoilState} from 'recoil';
import React,{ useState } from 'react';
import './Styles.css';
function UserItem({ item }) {
  const [userList, setUserList] = useRecoilState(userNameState);
  const [toggleEdit, setToggleEdit] = useState(false);
  const index = userList.findIndex((listItem) => listItem === item);
  const editItemFirstName = ({ target: { value } }) => {
    if (value) {
      if (value.length > 1) {
        if (value.match(/^[A-Za-z]+$/g)) {
          const newList = replaceItemAtIndex(userList, index, {
            ...item,
            name: {
              first: value,
            },
          });
          setUserList(newList);
        }
        else {
          alert("only alphabets allowed");
        }
      }
      else {
        alert('needs atleast two characters')
      }
    }
    else {
      alert('name is required')
    }
  };
  
  const editItem = () =>
  {
setToggleEdit(!toggleEdit)
  }
  const editItemText = ({ target: { name, value } }) => {
    if (name == "email" &&value &&value.match(/(^[a-zA-Z0-9]+)([\_\.\-{1}])?([a-zA-Z0-9]+)\@([a-zA-Z0-9]+)([\.])([a-zA-Z\.]+)/g)) {
      const newList = replaceItemAtIndex(userList, index, {
        ...item,
        [name]: value,
      });
      setUserList(newList);
    } else if (name != "email" && value) {
      if (value.length > 1) {
        if (value.match(/^[A-Za-z]+$/g)) {
          const newList = replaceItemAtIndex(userList, index, {
            ...item,
            [name]: value,
          });
          setUserList(newList);
        } else {
          console.log("only alphabets allowed");
        }
      } else {
        alert("atleast two characters required");
      }
    } else {
      alert("email is required");
    }
   };
  
  const editItemId = ({ target: { name, value } }) => {
    if (value && value.length > 1) {
      const newList = replaceItemAtIndex(userList, index, {
        ...item,
        id: {
          [name]: value,
        },
      });
      setUserList(newList);
    }
     console.log("put required data in field");
   };

  
  const deleteItem = () => {
    const newList = removeItemAtIndex(userList, index);
    setUserList(newList);
  };
 
  return (
    <tr>
      <td >
        <img
          src={item.picture.medium}
          alt="randomuser"
          className="image"
        />
      </td>
      {toggleEdit ? (
        <td >
          <input
            name="value"
            type="text"
            value={item.id.value ? item.id.value : Date.now()}
            onChange={editItemId}
          />
        </td>
      ) : (
        <td >
          {item.id.value ? item.id.value : Date.now()}
        </td>
      )}
      {toggleEdit ? (
        <td>
          <input
            type="text"
            name="first"
            pattern={/^[A-Za-z]+$/g}
            value={item.name.first}
            onChange={editItemFirstName}
          />
        </td>
      ) : (
        <td>
          {item.name.first ? item.name.first : "null"}
        </td>
      )}

      {toggleEdit ? (
        <td >
          <input
            type="text"
            name="nat"
            value={item.nat}
            onChange={editItemText}
          />
        </td>
      ) : (
        <td >{item.nat ? item.nat : "null"}</td>
      )}
      {toggleEdit ? (
        <td >
          <input
            type="text"
            name="email"
            value={item.email}
            onChange={editItemText}
          />
        </td>
      ) : (
        <td >{item.email ? item.email : "null"}</td>
      )}
      <td>
        <button
         className="button"
          onClick={editItem}
        >
          {toggleEdit ? "Update" : "Edit"}
        </button>
        <button
        className="button1"
          onClick={deleteItem}
        >
          Delete
        </button>
       
      </td>
    </tr>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
function resetItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}
function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export default UserItem;