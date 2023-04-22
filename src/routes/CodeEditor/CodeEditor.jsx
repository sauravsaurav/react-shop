import { Link } from "react-router-dom";
import "./CodeEditor.scss";
const CodeEditor = () => {
    return (
        <>
            <div className="content">
                <div className="left-sidebar">Left sidebar <Link to="/signin" style={{color:'white'}}>Signin</Link></div>
                <div className="right-sidebar">Right Sidebar</div>
            </div>
        </>
    )
}

export default CodeEditor;