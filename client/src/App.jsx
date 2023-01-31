import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import EditProfile from "./pages/EditProfile";
import { Toaster } from "react-hot-toast";
import Auth from "./pages/Auth";
import PrivateRoute from "./components/PrivateRoute"
import Edit from "./pages/Edit";
import Register from "./pages/Register"


function App() {
  
  return (
    <>
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            fontSize: "1.8rem",
          },
        }}
      />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/edit' element={<EditProfile />} />
        </Route>
        <Route path='/auth' element={<Auth/>} />
        <Route path="/edittask" element={<Edit/>}/>
        <Route path="/re" element={<Register/>}/>
      </Routes>
    </>
  );
}

export default App;
