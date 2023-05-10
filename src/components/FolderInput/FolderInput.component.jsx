import "./FolderInput.styles.scss";
import { useRef , useContext} from "react";
import { NotificationContext } from "../../store/notification.context";

const FolderInput = (props)=>{
    const inputRef = useRef('');
    const {setNotification} = useContext(NotificationContext);
    const submitHandler = (e)=>{
        e.preventDefault();
        if(inputRef.current.value === '')
        {
            setNotification({status : "error", message : "Name can't be blank 😒"});
            return;
        }
        props.onSubmitHandler(inputRef.current.value , e);
    }

    const keyUpHandler = (e)=>{
        e.preventDefault();
        if(e.key === 'Escape'){
            props.onClose(e);
        }
        else if(e.key === 'Enter'){
            if(inputRef.current.value === '')
            {
                setNotification({status : "error", message : "Name can't be blank bro 😒"});
                return;
            }
            props.onSubmitHandler(inputRef.current.value, e );
        }
    }

    return (
        <form className="each-menu folder-input-container" onSubmit={submitHandler}>
            <input ref={inputRef} type='text' placeholder="Provide a name" onKeyUp={keyUpHandler} autoFocus/> <br/>
            <button type="submit" name="submit">✔️ Save</button>
        </form>
    )
}

export default FolderInput;