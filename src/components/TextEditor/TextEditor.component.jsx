import "./TextEditor.styles.scss";
import { motion } from "framer-motion";

const TextEditor = ()=>{
    const variants = {
        initial: { x: 200, opacity: 0 },
        animate: { x: 0, opacity: 0.6 },
      };
    return (
        <motion.div className="text-editor" variants={variants} initial="initial" animate="animate">
            <center>
                <h5 className="press-start text-editor-header">Write Your Code Here</h5>
            </center>
            <textarea placeholder="I love Javascript">
                
            </textarea>
        </motion.div>
    )
}


export default TextEditor;