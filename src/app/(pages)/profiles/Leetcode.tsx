"use client";

import axios from "axios";
import InputCard from "lib/app/components/inputCard";
import Loading from "lib/app/components/loading";
import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";

export default function LeetcodeUserData() {
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
    const username = localStorage.getItem("leetcode");
    const { data, error, mutate } = useSWR(
        `/api/user/leetcode?lcusername=${username}`,
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
