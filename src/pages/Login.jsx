import React, { useEffect, useState } from "react";
import Logo from "../assets/Blogo.png";
import { BiSolidPhoneCall } from "react-icons/bi";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error("Please Check Login Details");
      toast.error("Also Check Network");
    }

    if (user) {
      navigate("/");
      // toast.success("Welcome Back");
    }

    if (navigator.onLine) {
      console.log("online");
    } else {
      toast.error("Network Error");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, isLoading, navigate, dispatch]);

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone) return toast.error("phone needed");
    if (!password) return toast.error("Password needed");

    try {
      setLoading(true);
      const userData = { phone, password };
      dispatch(login(userData));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to sign you in");
    }
  };

  return (
    <div>
      {/* wrapper */}
      <div className="px-[10px] lg:px-[2em] pt-[1em]">
        {/* topbar */}
        <div className="  flex justify-between items-center">
          <Link to="/">
            <img src={Logo} alt="" className="h-16 w-16" />
          </Link>
        </div>
        {/* form */}
        <div className="mt-[10%]">
          <form
            className=" w-[98%] sm:w-[75%]  md:w-[60%] lg:w-[25%] m-auto"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <label htmlFor="phone" className="font-bold text-zinc-400">
                Enter Your Phone Number
              </label>
              <input
                type="text"
                placeholder="+254 798556471"
                id="phone"
                className="bg-transparent border border-pink-600 p-[8px] rounded-lg"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[10px] mb-[20px]">
              <label htmlFor="password" className="font-bold text-zinc-400">
                Enter Your Password
              </label>
              <input
                type="password"
                placeholder="Your password"
                id="password"
                className="bg-transparent border border-pink-600 p-[8px] rounded-lg"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-[20px]">
              {isLoading || loading ? (
                <Spinner message="verifying ..." />
              ) : (
                <button
                  style={{ fontWeight: 600, letterSpacing: "1px" }}
                  onClick={handleLogin}
                  className="backgroundBG w-full text-white p-[8px] rounded-lg"
                >
                  Login
                </button>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div>
                <Link to="/register" className="underline">
                  New here ?
                </Link>
              </div>
              <div className="flex gap-[5px] items-center hover:text-pink-700 cursor-pointer">
                <a href="tel:+254 740 775569">
                  <BiSolidPhoneCall className="text-xl" />
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
