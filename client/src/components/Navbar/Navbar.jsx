import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import classes from "./Navbar.module.scss";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get("/api/users/me");
      setUser(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setUser(null);
      toast.success("Logout Successfully");
      navigate("/auth");
    } catch (error) {
      console.log(error);
      //  toast.error("Logout Fail")
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!user) return null;

  return (
    <header>
      <div className={classes.userInfo}>
        <FaUserAlt className={classes.userIcon} />
        <div>
          <h1 className={classes.name}>{user.name}</h1>
          <p className={classes.email}>{user.email}</p>
          <Link to='/edit' className={classes.editBtn}>
            Edit
          </Link>
        </div>
      </div>
      <nav>
        <button type='button' className={classes.logout} onClick={handleLogout}>
          logout
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
