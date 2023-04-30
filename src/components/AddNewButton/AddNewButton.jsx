import "./AddNewButton.styles.scss";
import { useState } from "react";



const AddNewButton = () => {
    const [showMenu , setShowMenu] = useState(false);

    const toggleAddNewHandler = (e)=>{
        e.preventDefault();
        setShowMenu(prevState => !prevState);
    }


    return (
        <div className="add-new-button-container">
            <button className="menu-btn" onClick={toggleAddNewHandler}>
                 +
            </button>
            {
                showMenu && 
                <ul className="options-container">
                    <li>🗀  Create new folder</li>
                </ul>
            }
        </div>
    )
}

export default AddNewButton;