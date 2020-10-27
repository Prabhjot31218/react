import userNameState from '../../../States.js';
import React, { useState } from 'react';
import './Styles.css';
import { useSetRecoilState,useResetRecoilState } from 'recoil';
var randomUserPicUrl;
function UserListCreator({scrollTo}) {
    const [inputValue, setInputValue] = useState("");
    var randomUserPicUrl = Math.floor(Math.random()* Math.floor(23));
  const setUserList = useSetRecoilState(userNameState);
 
    const addItem = () => {
        setUserList((oldUserList) => [
          ...oldUserList,
          {
              id:
              {
                  value: Date.now(),
              },
            name: {
              first: inputValue,
            },
            picture: {
              medium:`https://randomuser.me/api/portraits/med/women/${randomUserPicUrl}.jpg`,
              },
            email:`${inputValue}@gmail.com`
          },
        ]);
      setInputValue("");
      scrollTo()
    };
  
    const onChange = ({ target: { value } }) => {
        setInputValue(value);
    };

    return (
      <div >
        <input
          type="text"
          placeholder='User name'
          value={inputValue}
          onChange={onChange}
          style={{ width: "70%", padding: 5 ,marginBottom:10,}}
        />
        <button
        className="button2"
          onClick={()=>inputValue ? inputValue.match((/^[A-Za-z]+$/g)) ? addItem() : alert('only alphabets allowed') : alert('no data to add')}
        >
          Add
        </button>
      </div>
    );
}
export default UserListCreator;