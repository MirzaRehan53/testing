import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";
import { data } from "react-router-dom";
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  //Sign In
  const SignInUser = async (email,password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error("Sign in error occured", error);
        return { success: false, error: error };
      }

      console.log("sign-in success", data);
      return{success:true,data}
    } catch (error) {}
  };

  //SIGNUP FUNCTION

  const signUpNewUser = async (email,password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error("There was a problem signing up", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  //SIGN OUT

  const SignOut = () => {
    const { error } = supabase.auth.signOut();
    if (error) {
      console.error("There was an error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ session, signUpNewUser, SignOut,SignInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
