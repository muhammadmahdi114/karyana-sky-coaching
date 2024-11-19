import React, { useState, useEffect } from "react";
import { useUser } from "../../Context/userContext";

export default function Header() {

    const [currentDate, setCurrentDate] = useState("");
    const { user } = useUser();

    useEffect(() => {
        const date = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(date.toLocaleDateString(undefined, options));
        console.log("USER: ",user);
    }, []);

    return (
        <div className="ml-60 bg-gray-100 px-8 py-5">

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="font-bold text-2xl">Welcome, {user.username}!</h2>
                    <p className="text-gray-500">{currentDate}</p>
                </div>
                <div className="flex gap-x-2 items-center justify-center mr-5">
                    <img src="/notification.png" alt="Notification" className="h-10" />
                    <div className="flex ">
                        <div>
                            <img
                                src={user.userImage}
                                alt={user.username}
                                className="w-12 h-12 mr-4"
                            />
                        </div>
                        <div>
                            <h2 className="font-bold">{user.username}</h2>
                            <p className="text-gray-500 text-sm">Admin</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}