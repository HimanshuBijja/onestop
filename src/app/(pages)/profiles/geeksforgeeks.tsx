"use client";

import axios from "axios";
import InputCard from "lib/app/components/inputCard";
import Loading from "lib/app/components/loading";
import { AlignJustify, X } from "lucide-react";
import { s } from "motion/react-client";
import Image from "next/image";
import Link from "next/link";

import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";

export default function GeeksforGeeksUserData() {
    return (
        <Suspense
            fallback={
                <div>
                    <Loading />
                </div>
            }
        >
            <ProfileCard />
        </Suspense>
    );
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ProfileCard = () => {
    const username = localStorage.getItem("geeksforgeeks");
    const { data, error, mutate } = useSWR(
        `/api/user/geeksforgeeks?gfgusername=${username}`,
        fetcher,
        {
            suspense: true,
            // // fallbackData: {},
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

    return (
        <div>
            <div className="bg-surface rounded-curved px-8 py-9 w-110 h-93">
                <div className="flex flex-row justify-between ">
                    <div className="flex gap-8 items-center">
                        <div>
                                <Image
                                    src="/gfg_logo.png"
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
                    />
                ) : isOpen ? (
                    <InputCard
                        success={data.success}
                        label={data.msg}
                        source={data.source}
                        refetch={refetch}
                        toggleMenu={handleToggleMenu}
                    />
                ) : (
                    <GeeksForGeeksProfile data={data} />
                )}
                {/* contains all the data */}
            </div>
            <div className="text-small pt-1 px-7">
                <Link href="https://www.geeksforgeeks.org/">
                    <div>GeeksForGeeks</div>
                </Link>
            </div>
        </div>
    );
};

const GeeksForGeeksProfile = ({ data }: { data: any }) => {


    const rank = data?.data?.contestData?.user_global_rank ?? "N/A";
    const score = data?.data?.userInfo?.score ?? 0;
    const problems = data?.data?.userSubmissionsInfo;
    const problemsSolved =
        (problems?.Easy ?? 0) +
        (problems?.Medium ?? 0) +
        (problems?.Hard ?? 0) +
        (problems?.Basic ?? 0) +
        (problems?.School ?? 0);
    const contestsParticipated = data?.data?.contestData?.user_contest_data?.no_of_participated_contest;


    return (
        <div className="flex flex-row gap-6 px-9 pt-11 pb-9">
            <div className="flex flex-col gap-4">
                <div>Rank :</div>
                <div>Score :</div>
                <div>Problems Solved :</div>
                <div>Contests Participated :</div>
            </div>
            <div className="flex flex-col gap-4">
                <div>{rank}</div>
                <div>{score}</div>
                <div>{problemsSolved}</div>
                <div>{contestsParticipated}</div>
            </div>
        </div>
    );
};