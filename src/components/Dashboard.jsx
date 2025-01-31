import { useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";
const Dashboard = () => {
    const {session,SignOut} = UserAuth();
    const navigate = useNavigate();
    console.log(session);
    const handleSignOut =async (e)=>{
   e.preventDefault();
   try {
    await SignOut();
    navigate("/");
   } catch (error) {
    console.error(error)
   }
    }
  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {session?.user?.email}</h2>
      <div onClick={handleSignOut}>
        <p className="hover:cursor-pointer border inline-block px-4 py-3 mt-4">Sign out</p>
      </div>
    </div>
  )
};

export default Dashboard
