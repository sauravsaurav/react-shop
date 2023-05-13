import "./StretchButton.styles.scss";
import { motion } from "framer-motion";

const StretchButton = ({children, onClick ,title='', style={position:'absolute',top:'70%',right:'-1%'}})=>{

    return (
        <motion.button style={{...style}} onClick={onClick} className="stretchButton"
          initial="initial"
          whileTap={{scale:0.8}}
          whileHover={{scale:1.2}}
          title={title}
        >
            {children}
        </motion.button>
    );
}

export default StretchButton;