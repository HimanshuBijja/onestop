"use client";

import axios from "axios";
import InputCard from "lib/app/components/inputCard";
import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import UserCardSkeleton from "lib/app/components/userCardSkeleton";

export default function LeetcodeUserData() {
    return (
        
        
            <ProfileCard />
        
    );
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ProfileCard = () => {
    const [username, setUsername] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const stored = localStorage.getItem("leetcode") ?? "";
        setUsername(stored);
    }, []);
    const { data, error, mutate , isLoading} = useSWR(
        `/api/user/leetcode?lcusername=${username}`,
        fetcher,
        {
            
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
            revalidateOnMount: true,
        }
    );

    const updateUsername = useCallback((newUsername: string) => {
        setUsername(newUsername);
    }, []);

    const refetch = () => {
        mutate();
    };
    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    };
    if(isLoading){
        return <UserCardSkeleton />
    }

    return (
        <div>
            <div className="bg-surface rounded-curved px-8 py-9 w-110 h-93">
                <div className="flex flex-row justify-between ">
                    <div className="flex gap-8 items-center">
                        <div>
                            <Image
                                src="/leetcode_logo.png"
                                alt="profile"
                                width={60}
                                height={60}
                            />
                        </div>
                        <div className="flex flex-row gap-3">
                            <div>Handle: </div>
                            <div>{username}</div>
                        </div>
                    </div>
                    <div className="pt-2 pr-2">
                        {isOpen ? (
                            <X size={26} onClick={handleToggleMenu} />
                        ) : (
                            <AlignJustify
                                size={26}
                                onClick={handleToggleMenu}
                            />
                        )}
                    </div>
                </div>
                {!data.success ? (
                    <InputCard
                        success={data.success}
                        label={data.msg}
                        source={data.source}
                        refetch={refetch}
                        toggleMenu={handleToggleMenu}
                        updateUsername={updateUsername}
                    />
                ) : isOpen ? (
                    <InputCard
                        success={data.success}
                        label={data.msg}
                        source={data.source}
                        refetch={refetch}
                        toggleMenu={handleToggleMenu}
                        updateUsername={updateUsername}
                    />
                ) : (
                    <LeetcodeProfile data={data} />
                )}
                {/* contains all the data */}
            </div>
            <div className="text-small pt-1 px-7">
                <Link href="https://leetcode.com/">
                    <div>Leetcode</div>
                </Link>
            </div>
        </div>
    );
};

const LeetcodeProfile = ({ data }: { data: any }) => {
    const ranking = data.lcattendedContests[0]?.ranking ?? 0;
    const rating = data.lcattendedContests[0]?.rating ?? 0;
    const problemsSolved = data.lcProblemsSolved.problemsSolved[0]?.count ?? 0;
    const contestsParticipated = data.lcattendedContests.length;

    return (
        <div className="flex flex-row gap-6 px-9 pt-11 pb-9">
            <div className="flex flex-col gap-4">
                <div>Rank :</div>
                <div>Rating :</div>
                <div>Problems Solved :</div>
                <div>Contests Participated :</div>
            </div>
            <div className="flex flex-col gap-4">
                <div>{ranking}</div>
                <div>{rating}</div>
                <div>{problemsSolved}</div>
                <div>{contestsParticipated}</div>
            </div>
        </div>
    );
};
