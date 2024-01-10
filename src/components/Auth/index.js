import { Fragment, useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate} from "react-router-dom"
import Loader from "../UI/Loader"
import { signUpWithEmailAndPassword } from "../../actions/auth"
import { useDispatch } from "react-redux"
import { logInWithEmailAndPassword } from "../../actions/auth"


const AuthIndex=()=>{
    const locat=useLocation()
    const [details,setDetails]=useState({
        email:"",
        password:""
    })
    const [loader,setLoader]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleInput=e=>{
        setDetails({
            ...details,
            [e.target.name]:e.target.value

        })
    }

    useEffect(()=>{
        return ()=>{
            setLoader(false)
            setDetails({
                email:"",
                password:""
            })
        }

    },[])

    const handleSubmission=e=>{
        e.preventDefault()
        console.log(details)
        if(locat.pathname==="/signup"){
            setLoader(true)
            dispatch(signUpWithEmailAndPassword(details,data=>{
                if(data.error){
                    console.log(data.error)
                    alert("some error occured")
                }
                else{
                    console.log("Successfully Signed up!")
                    navigate("/")
                }
                setLoader(false)

            }))
           
        }
        else if(locat.pathname==="/login"){
            setLoader(true)
            dispatch(logInWithEmailAndPassword(details,data=>{
                if(data.error){
                    console.log(data.response)
                    alert(data.response.data.error.message || "Some Error Occured")
                }
                else{
                    console.log("Successfully Loged in!")
                    navigate("/")
                }
                setLoader(false)

            }))
                
        }
    }

    return (
        <Fragment>
            <div className="auth-container">
                <div className="auth-container--box">
                    <div className="tab-selector">
                        <NavLink to={"/login"}><h3>Login</h3></NavLink>
                        <NavLink to={"/signup"}><h3>Signup</h3></NavLink>
                    </div>
                    <form autoComplete="off" onSubmit={handleSubmission}>
                        <div className="input-wrap">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text" 
                                name="email" 
                                placeholder="Enter Email"
                                value={details.email}
                                onChange={handleInput}>

                            </input>
                        </div>
                        <div className="input-wrap">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Enter Password"
                                value={details.password}
                                onChange={handleInput}>

                            </input>
                        </div>
                        <div className="button-wrap">
                            <button className="login-btn">
                                {locat.pathname==="/login"?"Login":"Signup"}
                            </button>

                        </div>

                    </form>
                </div>
            </div>
            {loader && <Loader/>}
        </Fragment>
    )
}

export default AuthIndex