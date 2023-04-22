import "./Navigation.style.scss";
import {Outlet} from "react-router-dom";
import {motion} from "framer-motion";


const Navigation = ()=>{
    const colors1 = ['#C147E9' , '#810CA8' , '#2D033B','#810CA8','#C147E9'];

    return (
        <>
            <div className="container">
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
                                </li>
                            </ul>
                            
                    </nav>
                </header>
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
                </main>
            </div>
        </>
    );
}

export default Navigation;