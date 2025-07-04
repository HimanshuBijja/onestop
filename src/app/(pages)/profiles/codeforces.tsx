"use client";

import axios from "axios";
import InputCard from "lib/app/components/inputCard";
import Loading from "lib/app/components/loading";
import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Suspense, useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import UserCardSkeleton from "lib/app/components/userCardSkeleton";

export default function CodeforcesUserData() {
    return (
        
            <ProfileCard />
        
    );
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ProfileCard = () => {
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const stored = localStorage.getItem("codeforces") ?? "";
        setUsername(stored);
    }, []);
    const { data, error, mutate , isLoading} = useSWR(
        `/api/user/codeforces?cfusername=${username}`,
        fetcher,
        {
            
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            revalidateIfStale: false,
            revalidateOnMount: true,
        }
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const refetch = () => {
        mutate();
    };
    const handleToggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const updateUsername = useCallback((newUsername: string) => {
        setUsername(newUsername);
    }, []);
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
                                src="/codeforces_logo.png"
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
                    <CodeForcesProfile data={data} />
                )}
                {/* contains all the data */}
            </div>
            <div className="text-small pt-1 px-7">
                <Link href="https://codeforces.com/">
                    <div>Codeforces</div>
                </Link>
            </div>
        </div>
    );
};

const CodeForcesProfile = ({ data }: { data: any }) => {

    const userData = data.data.result[0] ?? "-";
    const rating = userData.rating ?? "-";
    const maxRating = userData.maxRating ?? "-";
    const rank = userData.rank ?? "-";
    const friendOfCount = userData.friendOfCount ?? "-";

    return (
        <div className="flex flex-row gap-6 px-9 pt-11 pb-9">
            <div className="flex flex-col gap-4">
                <div>Rating :</div>
                <div>Max Rating :</div>
                <div>Rank :</div>
                <div>Friends :</div>
            </div>
            <div className="flex flex-col gap-4">
                <div>{rating}</div>
                <div>{maxRating}</div>
                <div>{rank}</div>
                <div>{friendOfCount}</div>
            </div>
        </div>
    );
};;
