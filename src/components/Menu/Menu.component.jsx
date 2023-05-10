import "./Menu.styles.scss";
import {motion} from "framer-motion";
import {  useState} from "react";
import FolderInput from "../FolderInput/FolderInput.component";

const Menu = (props)=>{
    const [inputIsOpen , setInputIsOpen] = useState(false);
    const [currentAction , setCurrentAction] = useState('');
    const {isRoot=false} = props;

    const variants = {
        initial: { x: -200, opacity: 0 },
        animate: { x: 0, opacity: 1 },
      };

    

    const closeMenuHandler = (e)=>{
        props.onClose(e,props.path);
    }


    const inputBoxSubmitHandler = (value , e)=>{
        props.onClose(e, currentAction, value, isRoot , currentAction);
    }


    const actionHandler = (e)=>{
       switch(e){
        case 'NEW_FOLDER':
                setCurrentAction('NEW_FOLDER');
                setInputIsOpen(true);
        break;
        case 'NEW_FILE':
                setCurrentAction('NEW_FILE');
                setInputIsOpen(true);
        break;
        case 'DELETE':
            props.onClose(null, "DELETE", '', isRoot , currentAction);
        break;
        default:
            console.log("No action matched");
       }
    }

    return (
        <motion.ul className="folder-menu-container" initial="initial" animate='animate' variants={variants} >
            {
                !inputIsOpen && 
                <>
                    <li className="each-menu" onClick={actionHandler.bind(null , 'NEW_FOLDER')}>📂 Create new folder</li>
                    <li className="each-menu" onClick={actionHandler.bind(null , 'NEW_FILE')}>🗃️ Create new file</li>
                    <li className="each-menu" onClick={actionHandler.bind(null , 'DELETE')}>🗑️ Delete</li>
                </>
            }
            {
                inputIsOpen && 
                <FolderInput onSubmitHandler={inputBoxSubmitHandler} onClose={closeMenuHandler}/>
            }
            <li className="each-menu closeMenu" onClick={closeMenuHandler}>❌ Close</li>
        </motion.ul>
    )
}

export default Menu;