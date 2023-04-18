import "./Navigation.style.scss";
import {NavLink, Outlet} from "react-router-dom";
import {motion} from "framer-motion";


const Navigation = ()=>{
    return (
        <>
            <header>
                <nav className="navigation">
                    <ul>
                        <motion.li whileTap={{scale:0.8}} whileHover={{scale:1.2}}><NavLink to="/" className={(props)=> props.isActive ? 'active' : '' }>🏠</NavLink></motion.li>
                        <motion.li whileTap={{scale:0.8}}  whileHover={{scale:1.2}}><NavLink to="/shop">🛍️</NavLink></motion.li>
                        <motion.li whileTap={{scale:0.8}}  whileHover={{scale:1.2}}><NavLink to="/cart">🛒</NavLink></motion.li>
                    </ul>
                </nav>
            </header>
            <main className="main-container">
                <Outlet/>
            </main>
        </>
    );
}

export default Navigation;