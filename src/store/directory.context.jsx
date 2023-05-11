import { createContext, useState , useEffect} from "react";
import { getDirectoriesOfUser } from "../utils/firebase";



export const DirectoryContext = createContext({
    // It consists of directories , selectedDirectories , selectedFiles
    directoryOptions: {},
    setDirectoryOption : () => {}
});


export const DirectoryContextProvider = ({children}) => {
    const [directoryOptions , setDirectoryOption] = useState({});
    const value = {directoryOptions , setDirectoryOption};

    useEffect(()=>{
        if(directoryOptions.uid && !directoryOptions.directories){
             getDirectoriesOfUser(directoryOptions.uid).then(res => {
                setDirectoryOption(prevstate=>{
                    return {
                        ...prevstate,
                        directories : {...JSON.parse(res),showMenu: false},
                        selectedFile : '',
                        fileToCode : ''
                        
                    }
                })
             });
        }
    },[directoryOptions]);

    return (
        <DirectoryContext.Provider value={value}>
            {children}
        </DirectoryContext.Provider>
    )
}