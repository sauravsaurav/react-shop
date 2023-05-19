import "./Button.styles.scss";
import {motion} from "framer-motion";
import React from "react";

// Accepted params : 
// type : default / inverse . default for bright , inverse for dark
// onClick : onClick handler to handle the onClick event
const Button = ({type ='submit', buttonType="default" , onClick=null , children="" , style={}})=>{
    return (
        <>
            <motion.button initial={{scale:1, ...style}} whileHover={{scale:1.05, cursor:'pointer'}} whileTap={{scale:0.8}} className={`${buttonType} smallSize bolder`} onClick={onClick} type={type}>
                {children}
            </motion.button>
        </>
    )
}

export default React.memo(Button);