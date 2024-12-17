import React, { useState, useEffect } from "react";
import { useUser } from "../../Context/userContext";
import { useNavigate } from "react-router-dom";

export default function Header() {

    const [currentDate, setCurrentDate] = useState("");
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        const date = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(date.toLocaleDateString(undefined, options));
    }, [user]);

    if (!user) {
        navigate("/");
    }

    return (
        <div className="ml-60 bg-gray-100 px-8 py-5">

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="font-bold text-2xl">Welcome, Admin!</h2>
                    <p className="text-gray-500">{currentDate}</p>
                </div>
            </div>
        </div>
    )
}