import React, {createContext} from "react";

const UserContext = createContext();

function UserProvider(props){

    return (
        <UserContext.Provider>
            {props.children}
        </UserContext.Provider>
    );
};

export {UserContext, UserProvider}