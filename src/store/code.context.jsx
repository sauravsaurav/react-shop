import { createContext, useState} from "react";



export const CodeContext = createContext({
    // For storing the code
    codedFile: [],
    setCodedFile : () => {}
});


export const CodeContextProvider = ({children}) => {
    const [codedFile , setCodedFile] = useState([]);
    const value = {codedFile , setCodedFile};

    return (
        <CodeContext.Provider value={value}>
            {children}
        </CodeContext.Provider>
    )
}