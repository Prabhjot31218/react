import React, { useState, useEffect, useRef } from 'react';
import {animateScroll } from 'react-scroll';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import './Styles1.css'
import userNameState from '../../../States.js'
import { UserItem,UserListCreator} from '../../atoms';
function User() {
  const scroll = useRef();
    const userList = useRecoilValue(userNameState);
  const setUserList = useSetRecoilState(userNameState);
  const [startHeight, setHeight] = useState(600);
  useEffect(() =>
  {
 axios
   .get(`https://randomuser.me/api/?page=1 &results=14 &seed=abc&inc=id,name,email,phone,gender,dob,nat,picture`)
   .then((res) => {
     const posts = res.data;
      setUserList(posts.results);
   })
   .catch((error) => console.log("error", error.message));
  },[] )
  

  const scrollToB = () => {
  const height = scroll.current?.clientHeight;
    if (height > startHeight)
    {
      animateScroll.scrollToBottom()
      setHeight(height)
     }
   }
   if(userList.length) return (
     <div ref={scroll} onTouchStart={scrollToB}>
       <h1
         style={{
           marginTop: 0,
           color: "tomato",
           fontSize: "40px",
           fontWeight: "900",
         }}
       >
         Users List
       </h1>
       <UserListCreator scroll={scroll} scrollTo={scrollToB} />
       <table>
         <thead>
           <tr>
             <th className="th">Profile Picture</th>
             <th className="th">User Id</th>
             <th className="th">User Name</th>
             <th className="th">Nationality</th>
             <th className="th">Email Id</th>
             <th className="th">Actions</th>
           </tr>
         </thead>
         <tbody>
           {userList.map((userItem) => (
             <UserItem key={userItem.id} item={userItem} />
           ))}
         </tbody>
       </table>
     </div>
   );
   else {
     return <div className="loading"></div>
  }
}
export default User;