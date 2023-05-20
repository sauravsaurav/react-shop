import "./CodeEditor.scss";
import Directory from "../../components/Directory/Directory.component";
import TextEditor from "../../components/TextEditor/TextEditor.component";
import Output from "../../components/Output/Output.component";
import { useState } from "react";
import Tutorial from "../../components/Tutorial/Tutorial.component";

const CodeEditor = () => {
    const [skipTutorial , setSkipTutorial] = useState(localStorage.getItem("skipTutorial") && localStorage.getItem("skipTutorial") === 'true');
    const closeHandler = (e)=>{
        setSkipTutorial(true);
    }
    const dontShowHandler = (e)=>{
        localStorage.setItem("skipTutorial", 'true');
        setSkipTutorial(true);
    }
    return (
        <>
            <div className="codeeditor">
            {!skipTutorial && <Tutorial close={closeHandler} dontShowAgain={dontShowHandler}/>}
                <Directory/>
                <TextEditor/>
                <Output/>
                
            </div>
        </>
    )
}

export default CodeEditor;