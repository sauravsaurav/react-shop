 import "./Output.styles.scss";
import {motion} from "framer-motion";
import useHttp from "../../hooks/useHttps";
import Loader from "../Loader/Loader.component";

const Output = () => {
    

    const variants = {
        initial: { x: 200, opacity: 0 },
        animate: { x: 0, opacity: 0.6 },
      };

    


    return (
        <motion.div className="output-container" initial="initial" animate="animate" variants={variants}>
            <center>
                <h5 className="press-start text-output-header">
                    
                    <p>Output Goes Here</p>
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