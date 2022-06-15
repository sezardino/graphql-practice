import { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { mutations } from "../graphql";
import { ContextUser, RefreshUser } from "../types";

export interface IAuthContext {
  user: ContextUser;
  setUser: (user: ContextUser) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = (props) => {
  const [user, setUser] = useState<ContextUser>({} as ContextUser);
  const [refreshHandler, { data: userData }] = useMutation<{
    refresh: RefreshUser;
  }>(mutations.REFRESH_USER);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userRefresh") || "{}");

    if (!token.refresh) {
      return;
    }

    refreshHandler({
      variables: { refreshToken: token.refresh },
    });
  }, []);

  useEffect(() => {
    if (!userData || !userData.refresh) {
      return;
    }

    localStorage.setItem(
      "userRefresh",
      JSON.stringify(userData.refresh.tokens)
    );

    setUser({
      email: userData.refresh.email,
      id: userData.refresh.id,
      username: userData.refresh.username,
    });
  }, [userData]);

  const contextProps: IAuthContext = { user, setUser };

  return (
    <AuthContext.Provider value={contextProps}>
      {props.children}
    </AuthContext.Provider>
  );
};

interface UseAuth {
  user: ContextUser;
  setUser: (user: ContextUser) => void;
}

export const useTheme = (): UseAuth => {
  const { user, setUser } = useContext(AuthContext);

  return { user, setUser };
};
