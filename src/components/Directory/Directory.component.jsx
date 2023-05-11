import "./Directory.styles.scss";
import {motion} from "framer-motion";
import { useContext } from "react";
import { DirectoryContext } from "../../store/directory.context";
import EachFolderFile from "../EachFolderFile/EachFolderFile";

const Directory = ()=>{
    const {directoryOptions} = useContext(DirectoryContext);
    const variants = {
        initial: { x: -200, opacity: 0 },
        animate: { x: 0, opacity: 0.6 },
      };
    return (
        <motion.div className="directory-container" variants={variants} initial="initial" animate="animate"
         >
            <center>
                <h5 className="press-start directory-header">Directory Lists</h5>
            </center>
            <div className="directory-content">
                <ul className="directory-list">
                    <div className="rootDir"></div>
                    {
                        !directoryOptions.directories && 
                        <EachFolderFile name="Loading..." type = "folder" content = "The content is loading" />
                    }
                    {
                        directoryOptions.directories && 
                        <EachFolderFile path="root@@" isRoot={true} name={`${directoryOptions.directories.name}`} type = "folder" content = {`${directoryOptions.directories.directories.length === 0 && directoryOptions.directories.files.length === 0 ? 'Folder is empty' : ''}`} />
                    }
                </ul>
            </div>
        </motion.div>
    )
}

export default (Directory);