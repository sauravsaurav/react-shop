import "./CodeEditor.scss";
import Directory from "../../components/Directory/Directory.component";
import TextEditor from "../../components/TextEditor/TextEditor.component";
import Output from "../../components/Output/Output.component";

const CodeEditor = () => {
    return (
        <>
            <div className="codeeditor">
                <Directory/>
                <TextEditor/>
                <Output/>
            </div>
        </>
    )
}

export default CodeEditor;