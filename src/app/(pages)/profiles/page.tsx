"use client";

import axios from "axios";
import Loading from "lib/app/components/loading";
import { useEffect, useState } from "react";
import LeetcodeUserData from "./Leetcode";
import CodeforcesUserData from "./codeforces";
import GeeksforGeeksUserData from "./geeksforgeeks";

export default function Profiles() {
    const [profiles, setProfiles] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProfiles = async () => {
            const response = await axios.get(
                `http://localhost:3000/api/user?cfusername=tourist&lcusername=fjzzq2002&gfgusername=ajaysinghdeopa`
            );
            setProfiles(response.data.userDetails);
            setLoading(false);
        };
        fetchProfiles();
    }, []);
    // console.log(profiles)
    if (loading) {
        return <Loading />;
    }
    return (
        <section className="relative py-24 px-4">
            <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-x-10 gap-y-15">
                    <LeetcodeUserData />
                    <CodeforcesUserData />
                    <GeeksforGeeksUserData />
                </div>
            </div>
        </section>
    );
}
