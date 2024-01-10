import Products from "./components/Products/Products";
import Header from "./components/Layout/Header";
import Subheader from "./components/Layout/Subheader";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import AuthIndex from "./components/Auth";
import { redirect } from "react-router-dom";
import { checkIsLoggedIn } from "./actions/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const App=()=> {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const authState=useSelector(state=>state.auth)
  useEffect(()=>{
    dispatch(checkIsLoggedIn(()=>{}))

  },[])
  
  return (
    <div>
      <Header/>
      <Subheader/>
      <Routes>
        {  
           !authState.idToken &&
          <Route path="/login" element={<AuthIndex/>}></Route>
        }
        {
          !authState.idToken &&
          <Route path="/signup" element={<AuthIndex/>}></Route>
        }
        <Route path="/login" element={<Navigate to="/"/>}/>
        <Route path="/signup" element={<Navigate to="/"/>}/>
         
        <Route path="/:category?" element={<Products/>}></Route>
        <Route path="/404" element={<h1>Not Found!</h1>}></Route>
        
        
      </Routes> 
    </div>
  );
}

export default App
