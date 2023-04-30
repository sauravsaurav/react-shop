import { createContext, useState } from "react";



export const DirectoryContext = createContext({
    // It consists of directories , selectedDirectories , selectedFiles
    directoryOptions: {},
    setDirectoryOption : () => {}
});


export const DirectoryContextProvider = ({children}) => {
    const [directoryOptions , setDirectoryOption] = useState({});
    const value = {directoryOptions , setDirectoryOption};

    return (
        <DirectoryContext.Provider value={value}>
            {children}
        </DirectoryContext.Provider>
    )
}