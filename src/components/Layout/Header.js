import { useNavigate } from "react-router-dom";
import Cart from "../Cart";
import SearchBox from "../UI/Search";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth";
const Header=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const authState=useSelector(state=>state.auth)
    const logoutHandler=()=>{
        dispatch(logout())

    }

    return ( 
        <header>
            <div className={"nav-brand"}>
                <a to="/">
                    <span>AdaKart</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="30"
                        height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="6" cy="19" r="2" />
                        <circle cx="17" cy="19" r="2" />
                        <path d="M17 17h-11v-14h-2" />
                        <path d="M6 5l14 1l-1 7h-13" />
                    </svg>
                </a>
            </div>
            <div className={"searchBox-container"}>
                <SearchBox/>
            </div>

            {
                authState && authState.idToken?
                <div className="user-actions">
                    <button title="User Profile" className="material-icons">
                        <span className="material-symbols-outlined">account_circle</span>
                    </button>
                    <button onClick={logoutHandler} title="Logout" className="material-icons">
                        <span className="material-symbols-outlined">logout</span>
                    </button>
                </div>
                :<button className="login-btn" onClick={()=>navigate("/login")}>Login</button>
            }
            <div className={"cart-container"}>
                <Cart/>
            </div>
        </header>
          
    )
}

export default Header;