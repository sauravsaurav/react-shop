import "./Menu.styles.scss";
import {motion} from "framer-motion";
import {  useState , useCallback } from "react";
import FolderInput from "../FolderInput/FolderInput.component";

const Menu = (props)=>{
    const [inputIsOpen , setInputIsOpen] = useState(false);
    const [currentAction , setCurrentAction] = useState('');
    const {isRoot=false} = props;

    const variants = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      };

    

    const closeMenuHandler = useCallback((e)=>{
        props.onClose(e,props.path);
    },[props]);


    const inputBoxSubmitHandler = useCallback((value , e)=>{
        props.onClose(e, currentAction, value, isRoot , currentAction);
    },[props,currentAction, isRoot]);


    const actionHandler = useCallback((e)=>{
       switch(e){
        case 'NEW_FOLDER':
                setCurrentAction('NEW_FOLDER');
                setInputIsOpen(true);
                localStorage.setItem("isSaved", "false");
        break;
        case 'NEW_FILE':
                setCurrentAction('NEW_FILE');
                setInputIsOpen(true);
                localStorage.setItem("isSaved", "false");
        break;
        case 'DELETE':
            props.onClose(null, "DELETE", '', isRoot , currentAction);
            localStorage.setItem("isSaved", "false");
        break;
        default:
            console.log("No action matched");
       }
    },[currentAction,isRoot,props]);

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

export default (Menu) ;