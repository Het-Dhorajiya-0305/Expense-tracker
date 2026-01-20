import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData,setUserData]=useState(null);


  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userData,
        setUserData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
