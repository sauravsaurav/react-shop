import "./FolderInput.styles.scss";
import { useRef } from "react";

const FolderInput = (props)=>{
    const inputRef = useRef('');
    const submitHandler = (e)=>{
        e.preventDefault();
        console.log("Submitting the button");
        props.onSubmitHandler(inputRef.current.value , e);
    }

    const keyUpHandler = (e)=>{
        e.preventDefault();
        if(e.key === 'Escape'){
            props.onClose(e);
        }
        else if(e.key === 'Enter'){
            props.onSubmitHandler(inputRef.current.value, e );
        }
    }

    return (
        <form className="each-menu folder-input-container" onSubmit={submitHandler}>
            <input ref={inputRef} type='text' placeholder="Your Folder Name" onKeyUp={keyUpHandler} autoFocus/> <br/>
            <button type="submit" name="submit">✔️ Save</button>
        </form>
    )
}

export default FolderInput;