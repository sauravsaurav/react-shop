 import StretchButton from "../StretchButton/StretchButton";
import "./Output.styles.scss";
import {motion} from "framer-motion";
import { useState } from "react";
// import useHttp from "../../hooks/useHttps";
// import Loader from "../Loader/Loader.component";

const Output = () => {
    const [isShrinked , setIsShrinked] = useState({
        arrow : '⬅️',
        shrinked : true
    });

    const variants = {
        initial: { x: 200, opacity: 0 },
        animate: { x: 0, opacity: 0.6 },
      };

    
    const shrinkHandler = (e)=>{
        e.preventDefault();
        setIsShrinked(prevState => {
            return {
                ...prevState, 
                arrow : prevState.shrinked ? '➡️' : '⬅️',
                shrinked : !prevState.shrinked
            }
        });
    }
    


    return (
        <motion.div className={`output-container ${isShrinked.shrinked ? 'shrink' : 'expand'}`} initial="initial" animate="animate" variants={variants} 
        >
            <center>
                <h5 className="press-start text-output-header">
                    <p>Output </p>
                    <StretchButton title="Shrink / Expand" onClick={shrinkHandler}>
                        {isShrinked.arrow}
                    </StretchButton>
                </h5>
            </center>
                {/* {
                    isLoading && <h1 className="press-start"><center><br/>Loading...</center></h1>
                }
                {
                    !isLoading && response !== '' && <p>{response}</p>
                } */}
        </motion.div>
    )
}

export default Output;