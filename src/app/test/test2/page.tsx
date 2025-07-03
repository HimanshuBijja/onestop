"use client";

import axios from "axios";
import Loading from "lib/app/components/loading";
import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Suspense, useEffect, useState } from "react";
import useSWR from "swr";
import UserCardSkeleton from "../../components/userCardSkeleton";
import Test3 from "../test3/page";
import { div } from "motion/react-client";

export default function Profiles() {
    return (
        <section className="relative py-24 px-4">
            <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-x-10 gap-y-15">
                    <Suspense
                        fallback={
                            <div>
                                <UserCardSkeleton />
                            </div>
                        }
                    >
                        <ProfileCard />
                    </Suspense>
                </div>
            </div>
        </section>
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
                    <Test3
                        success={data.success}
                        label={data.msg}
                        source={data.source}
                        refetch={refetch}
                        toggleMenu={handleToggleMenu}
                    />
                ) : isOpen ? (
                    <Test3
                        success={data.success}
                        label={data.msg}
                        source={data.source}
                        refetch={refetch}
                        toggleMenu={handleToggleMenu}
                    />
                ) : (
                    <div>
                        <LeetcodeProfile data={data} />
                        <AlignJustify
                                size={26}
                                onClick={handleToggleMenu}
                            />
                    </div>
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
