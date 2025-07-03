"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function InputCard({
    success,
    label,
    source,
    refetch,
    toggleMenu,
    updateUsername,
}: {
    success: boolean;
    label: string;
    source: string;
    refetch: () => void;
    toggleMenu: () => void;
    updateUsername?: (newUsername: string) => void;
}) {
    const [username, setUsername] = useState<string>(
        localStorage.getItem(source) || ""
    );
    const [storedUsername, setStoredUsername] = useState<string | boolean>(localStorage.getItem(source) || true);
    // const [loading, setLoading] = useState<boolean>(false);
    // const [fetching, setFetching] = useState<boolean>(true);

    const handleSubmit = () => {
        const fetching = username !== localStorage.getItem(source)
        
        localStorage.setItem(source, username);
        if (updateUsername) {
            updateUsername(username);
            // toggleMenu();
        }
        if (fetching) {
            refetch();
        }
        // toggleMenu();
        // setLoading(true);

        // setFetching(true);
    };

    return (
        <div className="relative mt-20 mx-5">
            <div className="absolute z-50 top-0 left-5 transform -translate-y-1/2 bg-surface px-2">
                {success || storedUsername === true? (
                    <div className="text-green-text">Username</div>
                ) : (
                    <div className="text-red">{label}</div>
                )}
            </div>
            <input
                type="text"
                className={` border-2 rounded-2xl h-15 w-full px-5 focus:outline-none ${
                    success || storedUsername === true
                        ? "border-green-text/60 focus:border-green-text"
                        : "border-red/60 focus:border-red"
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={`${source} username`}
            />
            <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-50"
                onClick={ ()=>{handleSubmit();
                    success && toggleMenu()
                }}
            >
                <motion.div
                    className={`${
                        success || storedUsername === true? "bg-green-text" : "bg-red"
                    } rounded-lg w-[43px] h-[43px]`}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Image
                        src="/arrow.svg"
                        alt="Enter"
                        fill
                        className="object-contain"
                    />
                </motion.div>
            </button>
        </div>
    );
}

// function checkUsername(username: string) {
//     return username.length >
// }
