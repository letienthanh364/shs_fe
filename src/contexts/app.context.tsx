import { useState, createContext } from "react";
import {
  clearLS,
  getAccessTokenFromLS,
  getAccessTokenFromSessionStorage,
  getProfileFromLS,
} from "../utils/auth.util";
import { UserModel } from "src/types/user/user.type";

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  loadingPage: boolean;
  setLoadingPage: React.Dispatch<React.SetStateAction<boolean>>;
  profile: UserModel | null;
  setProfile: React.Dispatch<React.SetStateAction<UserModel | null>>;
  handleLogout: () => void;
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(
    getAccessTokenFromLS() || getAccessTokenFromSessionStorage()
  ),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  loadingPage: false,
  setLoadingPage: () => null,

  handleLogout: () => null,
};

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  );
  const [loadingPage, setLoadingPage] = useState<boolean>(
    initialAppContext.loadingPage
  );
  const [profile, setProfile] = useState<UserModel | null>(
    initialAppContext.profile
  );

  const handleLogout = () => {
    setIsAuthenticated(false);
    setProfile(null);
    clearLS();
  };

  return (
    <AppContext.Provider
      value={{
        handleLogout,
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        loadingPage,
        setLoadingPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
