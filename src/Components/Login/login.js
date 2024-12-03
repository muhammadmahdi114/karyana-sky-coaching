import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../Context/userContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser } = useUser();

    async function submit(e) {
        e.preventDefault();
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address");
                return;
            }

            const response = await axios.post(`http://localhost:8000/login`, {
                email,
                password,
            });

            if (response.data.success) {
                const userData = response.data;
                setUser(userData);
                navigate("/dashboard");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert("Error occurred while logging in");
            console.log(error);
        }
    }

    return (
        <>
            <div
                className="bg-gray-200 h-screen flex flex-col justify-center items-center"
                style={{
                    backgroundImage: "url('/login-bg.png')",
                    backgroundRepeat: "repeat",
                }}
            >
                <div className="bg-white flex border rounded-2xl shadow-xl">
                    <div className="-mr-32">
                        <img src="/login-img.png" alt="Login" className="w-3/4 rounded-l-2xl" />
                    </div>
                    <div className=" text-black px-6">
                        <h1 className="text-2xl mt-6 text-primary font-krona font-bold">Karyana</h1>
                        <h2 className="mt-8 text-xl font-bold">Admin Login</h2>
                        <p className="mt-2 w-72 text-gray-400">Please enter the credentials associated with your account.</p>
                        <form onSubmit={submit}>
                            <div className="w-80 mt-2">
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-12 pl-5 w-full rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div className="w-80 mt-2">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="h-12 pl-5 w-full rounded-lg bg-gray-100 text-gray-700 placeholder-gray-400 transition-colors duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200"
                                />
                            </div>
                            <div className="w-80 mt-36">
                                <button
                                    type="submit"
                                    className="p-3 rounded-xl text-center bg-primary text-white h-12 w-full hover:bg-blue-600 hover:shadow-lg transition-transform transform hover:-translate-y-1 hover:scale-105 duration-300 focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}