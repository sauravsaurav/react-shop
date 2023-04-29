import { createContext, useState , useEffect } from "react";
import { onAuthStateChangeHandler  ,createUserDocumentFromAuth} from "../utils/firebase";


export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => {}
});


export const UserProvider = ({children}) => {
    const [currentUser , setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        console.log("USE EFFECT IS RUNNING");
        const unsubscribe = onAuthStateChangeHandler((user) => {
            if(user){
                // Creating the user document
                createUserDocumentFromAuth(user);
            }
            console.log(user);
            setCurrentUser(user);
        });

        return unsubscribe;
    },[])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}