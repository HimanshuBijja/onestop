"use client";

import Image from "next/image";
import { useState } from "react";

export default function InputCard({success, label, source}: {success: boolean, label: string, source: string}) {

    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <div className="relative mt-20 mx-5">
            <div className="absolute z-50 top-0 left-5 transform -translate-y-1/2 bg-surface px-2">
                {success ? <div className="text-green-text">Username</div> : <div className="text-red">{label}</div>}
            </div>
            <input
                type="text"
                className={` border-2 rounded-2xl h-15 w-full px-5 focus:outline-none ${success ? "border-green-text/60 focus:border-green-text" : "border-red/60 focus:border-red"}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 z-50" onClick={() => {
                setLoading(true);
                localStorage.setItem(source, username);
            }}>
                <div className={`${success ? "bg-green-text" : "bg-red"} rounded-lg w-[43] h-[43]`}>
                    <Image
                        src="/arrow.svg"
                        alt="Enter"
                        width={43}
                        height={43}
                    />
                </div>
            </button>
        </div>
    );
}
