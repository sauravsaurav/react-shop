import { createContext, useState , useEffect} from "react";
import { getDirectoriesOfUser } from "../utils/firebase";
import { useContext } from "react";
import { CodeContext } from "./code.context";



export const DirectoryContext = createContext({
    // It consists of directories , selectedDirectories , selectedFiles
    directoryOptions: {},
    setDirectoryOption : () => {}
});


export const DirectoryContextProvider = ({children}) => {
    const [directoryOptions , setDirectoryOption] = useState({});
    const {setCodedFile} = useContext(CodeContext);
    const value = {directoryOptions , setDirectoryOption};

    useEffect(()=>{
        if(directoryOptions.uid && !directoryOptions.directories){
             getDirectoriesOfUser(directoryOptions.uid).then(res => {
                const isEmpty = JSON.stringify(res.directories) === '{}';
                if(!isEmpty){
                    setDirectoryOption(prevstate=>{
                        return {
                            ...prevstate,
                            directories : {...JSON.parse(res.directories),showMenu: false},
                            selectedFile : '',
                            fileToCode : ''
                            
                        }
                    });
                }
                else{
                    setDirectoryOption(prevstate=>{
                        return {
                            ...prevstate,
                            directories : {name : "root", directories : [] , files : [],showMenu: false},
                            selectedFile : '',
                            fileToCode : ''
                            
                        }
                    });
                }
                
                setCodedFile(res.codedFile ? JSON.parse(res.codedFile) : []);
             });
        }
    },[directoryOptions , setCodedFile]);

    return (
        <DirectoryContext.Provider value={value}>
            {children}
        </DirectoryContext.Provider>
    )
}
