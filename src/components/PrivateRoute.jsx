import { Navigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { session } = UserAuth();

  return (
    <>
      {session ? <>{children} </> : <Navigate to={"/signin"} />}
    </>
  );
};

export default PrivateRoute;
