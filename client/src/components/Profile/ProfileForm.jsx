import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
import axios from 'axios';
import toast from "react-hot-toast";
import classes from "./Profile.module.scss";

const ProfileForm = () => {
const [user, setUser] = useState({
    name: '',
    email: ''
})   
const navigate = useNavigate(); 

/*It should be field with current email & password so for that use iffy inside useEffect */
useEffect(()=>{
    (
      async () =>{
        try {
        const {data} = await axios.get("/api/users/me");
        console.log(data)
        setUser(data);
        } catch (error) {
          console.log(error)  
        }
      }  
    )()
}, []);
/*To change the value in input fields that's why call this function onchange */
const updateUserInfo = (e)=>{
    setUser({
      ...user,
      /*Whatever value is already here that's why above */
      [e.target.name]: e.target.value,
    // [e.target.name] It is also known as computed property name in es6 so need to call frequent route 
    })
    /*whenEver we'll some changes into our input we called this fuction from input field here it'll call the function whatever current value we have in useState like name:"", email:"" i put here ...user, 
    so [e.target.name] is from input name which will upadate the current value hint "" e.target.value is the value of input it's key:value formate it will set it the user Variable eventually it upadate the current value from where we calling */
}

  /*upadate value onsubmit on from field in backed we already upadte */

  const upadateProfile = async(e)=>{
  e.preventDefault();
  try {
   const res = await axios.put("/api/users/me/u", user);
   setUser(res.data);
   console.log(res);
   toast.success("user successfully upadated"); 
   navigate("/")
  } catch (error) {
    console.log(error);
    toast.error("Upadate fail")
  }
  }

  return (
    <div>
      <Link to='/' className={classes.backBtn}>
        <BsArrowLeftShort />
        Home
      </Link>
      <div>
        <h1>Edit Profile</h1>
        <form className={classes.editForm} onSubmit={upadateProfile}>
          <label htmlFor='name'>
            Full name
            <input
              type='text'
              name='name'
              placeholder='name required'
              required
              value={user.name}
              onChange={updateUserInfo}//why we add this To change to movement in input
            />
          </label>
          <label htmlFor='email'>
            email:
            <input name='email' type='email' placeholder='email' required 
            value={user.email} 
            onChange={updateUserInfo}   
            />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
