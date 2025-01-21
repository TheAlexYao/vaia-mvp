import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import axios from "axios";
import Cookies from "js-cookie";
import api from "../utils/api";
import { setTokenCookies } from "../utils/auth";

interface UserDetails {
  version?: number;
  [key: string]: any;
}

interface UserContextType {
  userDetails: UserDetails;
  isUserCreated: boolean;
  txDetails: any;
  getUserDetails: () => Promise<void>;
}

const UserDetailsContext = createContext<UserContextType>({} as UserContextType);

export const UserAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({});
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [txDetails, setTxDetails] = useState({});

  const initDataRaw = useLaunchParams()?.initDataRaw;

  const createUser = useCallback(async (initData: string) => {
    const { data: userInfo } = await api.post("/users/auth", {}, {
      headers: {
        "x-initdata": initData,
      },
    });
    
    setTokenCookies(
      userInfo?.result.access_token,
      userInfo?.result.refresh_token
    );

    setUserDetails(userInfo?.result?.user);
    setIsUserCreated(true);
    setTxDetails(userInfo?.result?.signup_tx || {});
    console.log(userInfo, "userinfo"); // Debug log as requested
  }, []);

  const getUserDetails = useCallback(async () => {
    const { data: userInfo } = await api.get("/users");
    setUserDetails(userInfo?.result?.user);
    setIsUserCreated(true);
    setTxDetails(userInfo?.result?.signup_tx || {});
  }, []);

  useEffect(() => {
    (async () => {
      if (initDataRaw) {
        try {
          const { data } = await axios.post("/api/verify", {
            initData: initDataRaw,
          });
          
          const refresh_token = Cookies.get("refresh_token");
          if (!refresh_token) {
            await createUser(data.initData);
          } else {
            await getUserDetails();
          }
        } catch (err) {
          console.error(err);
        }
      }
    })();
  }, [initDataRaw, createUser, getUserDetails]);

  return (
    <UserDetailsContext.Provider value={{ userDetails, isUserCreated, txDetails, getUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserDetails = () => useContext(UserDetailsContext); 