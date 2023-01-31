import axios from "axios";
import { useEffect, useState } from "react";

export default () => {
  const [auth, setAuth] = useState();

  const varifyAuth = async () => {
    try {
      const res = await axios.get('/api/auth/is_logged_in');
      return res.data;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  useEffect(() => {
    /*we use iffy here To instantly Invoke*/
    (
        async () => {
        const data = await varifyAuth();
        setAuth(data);
    })();
  });
  return { auth };
};
