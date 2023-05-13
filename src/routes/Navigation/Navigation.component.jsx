import "./Navigation.style.scss";
import {Outlet} from "react-router-dom";
import {motion} from "framer-motion";
import {useContext , useEffect } from "react";
import {UserContext} from "../../store/user.context";
import { signOutUser } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast , ToastContainer} from "react-toastify";
import { NotificationContext } from "../../store/notification.context";



const Navigation = ()=>{
    const colors1 = ['#C147E9' , '#810CA8' , '#2D033B','#810CA8','#C147E9'];
    const {currentUser , setCurrentUser} = useContext(UserContext);
    const {notification , setNotification} = useContext(NotificationContext);

    const navigate = useNavigate();
    
    const logoutHandler = async()=> {
        await signOutUser();
        setCurrentUser(null);
    }
    const loginHandler = () => {
        navigate('/signin');
    }


    useEffect(()=>{
        let identifier;
        
        if(notification && notification.status !== ''){
            if(notification.status === 'error'){
                toast.error(notification.message, {
                    className: "snackbar",
                    position: "bottom-center",
                    autoClose: 10000,
                    style:{position:'auto',zIndex:'9999999999999999 !important'}
                });
            }else if(notification.status === 'success'){
                toast.success(notification.message, {
                    className: "snackbar",
                    position: "bottom-center",
                    autoClose: 10000,
                    style:{position:'auto',zIndex:'9999999999999999 !important'}
                });
            }
            identifier = setTimeout(()=>{
                setNotification({});
            },11000)
        }
        return clearTimeout(identifier);
    },[notification , setNotification]);



    return (
        <>
            <div className="container">
                <main className="main-container">
                    <ul className="circles">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                    </ul>
                    <Outlet/>
                    <ToastContainer/>
                </main>
                <header>
                    <nav className="navigation area">
                            <ul className="siteName">
                                <li>
                                    <motion.span animate={{ color: colors1 }} 
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity 
                                    }}
                                    className="press-start"
                                    >
                                        &lt; 
                                        C O D E S K  
                                        &gt;
                                    </motion.span>
                                    <div className="author">
                                        Design and developed by <a className="special" href="mailto:someone@mozilla.org">Saurav Kumar</a>
                                    </div>
                                    {
                                        currentUser && 
                                        <motion.span className="logoutButton" whileTap={{scale:0.8}} onClick={logoutHandler}>
                                            Logout
                                        </motion.span>
                                    }
                                    {
                                        !currentUser && 
                                        <motion.span className="loginUser" whileTap={{scale:0.8}} onClick={loginHandler}>
                                            Login
                                        </motion.span>
                                    }                                    
                                </li>
                            </ul>
                            
                    </nav>
                </header>
            </div>
        </>
    );
}

export default Navigation;