import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Profile.module.scss";
import axios from "axios";



const Edit = () => {
  // const navigate = useNavigate();
  const [titleHead, setTitle] = useState({
    title: '',
    completed:''
  })


  useEffect(()=>{
  (
    async ()=>{
      try {
        const {data} = await axios.get("/api/task/mytask");
        setTitle(data);
        console.log(data)
        }catch (error) {
          console.log(error)  
        }
    }
  )()
  },[])

  return (
    <div>
      <h1>
        <Link to='/'>Back</Link>
      </h1>
      <h1>Edit Page</h1>
      <form className={classes.editForm}>
        <label htmlFor='title'>
          title
          <input
            type='text'
            placeholder='required title'
            name='title'
            required
            value={titleHead.title}
          />
        </label>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

export default Edit;
