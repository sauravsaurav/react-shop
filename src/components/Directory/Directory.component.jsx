import "./Directory.styles.scss";
import {motion} from "framer-motion";
import { useContext } from "react";
import { DirectoryContext } from "../../store/directory.context";
import AddNewButton from "../AddNewButton/AddNewButton";

const Directory = ()=>{
    const {directoryOptions} = useContext(DirectoryContext);

    const variants = {
        initial: { x: -200, opacity: 0 },
        animate: { x: 0, opacity: 0.6 },
      };
    return (
        <motion.div className="directory-container" variants={variants} initial="initial" animate="animate"
         >
            <center>
                <h5 className="press-start directory-header">Directory Lists</h5>
            </center>
            <div className="directory-content">
            {
                !directoryOptions.directories && 
                <b style={{fontFamily:"Arial",fontSize:'14px'}}>
                    Start by creating folder <AddNewButton/>
                </b>
            }
            </div>
        </motion.div>
    )
}

export default Directory;