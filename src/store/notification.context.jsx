import { createContext, useState } from "react";



export const NotificationContext = createContext({
    notification : {},
    setNotification : () => {}
});


export const NotificationContextProvider = ({children}) => {
    const [notification , setNotification] = useState({});
    const value = {notification , setNotification};

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    )
}