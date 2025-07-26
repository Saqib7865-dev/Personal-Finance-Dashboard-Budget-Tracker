import { createContext, useContext, useState } from "react";

const context = createContext();

const StateProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(false);
  const [FormTitle, setFormTitle] = useState("Income Form");
  const [userData, setUserData] = useState({});

  return (
    <context.Provider
      value={{
        showForm,
        setShowForm,
        FormTitle,
        setFormTitle,
        userData,
        setUserData,
      }}
    >
      {children}
    </context.Provider>
  );
};

const useStateContext = () => useContext(context);

export { StateProvider, useStateContext };
