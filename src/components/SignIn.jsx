import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

const SignIn = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");
    const [loading,setLoading]=useState("");
    const navigate = useNavigate();

    const {session,SignInUser} = UserAuth();
    console.log(session);


    const handleSignIn =async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const result = await SignInUser(email,password)
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
      <form className="max-w-md m-auto pt-24" onSubmit={handleSignIn}>
        <h2 className="font-bold ">Sign in </h2>
        <p>Dont have an account?  <Link to={"/signup"}>Sign up!</Link></p>
        <div className="flex flex-col py-4">
            <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="p-3 mt-6" type="email" id=""/>
            <input placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="p-3 mt-6" type="password" id=""/>
            <button type="submit" disabled={loading} className="mt-6 w-full">Sign in</button>
            {error && <p className="text-red-600 text-center pt-4">{error}</p>}
        </div>
      </form>
    </div>
  )
};

export default SignIn
