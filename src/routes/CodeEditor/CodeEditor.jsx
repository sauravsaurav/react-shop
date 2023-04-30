import "./CodeEditor.scss";
import Directory from "../../components/Directory/Directory.component";
import TextEditor from "../../components/TextEditor/TextEditor.component";
const CodeEditor = () => {
    return (
        <>
            <div className="codeeditor">
                <Directory/>
                <TextEditor/>
            </div>
        </>
    )
}

export default CodeEditor;