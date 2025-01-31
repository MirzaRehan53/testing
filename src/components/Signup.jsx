import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

const Signup = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState("");
    const navigate = useNavigate();

    const {session,signUpNewUser} = UserAuth();
    console.log(session);


    const handleSignUp =async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const result = await signUpNewUser(email,password)
            if(result.success){
                navigate("/dashboard")
            }
        }
        catch (err){
            setError("an error occured")

        }
        finally {
            setLoading(false)
        }
    }
  return (
    <div>
      <form className="max-w-md m-auto pt-24" onSubmit={handleSignUp}>
        <h2 className="font-bold ">Sign up Today</h2>
        <p>Already have an account?  <Link to={"/signin"}>Sign In!</Link></p>
        <div className="flex flex-col py-4">
            <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="p-3 mt-6" type="email" id=""/>
            <input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="p-3 mt-6" type="password" id=""/>
            <button type="submit" disabled={loading} className="mt-6 w-full">Sign up</button>
            {error && <p className="text-red-600 text-center pt-4">{error}</p>}
        </div>
      </form>
    </div>
  )
};

export default Signup
