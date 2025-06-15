"use client";

import axios from "axios";
import Loading from "lib/app/components/loading";
import { AlignJustify } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
                    <ProfileCard data={profiles.leetcodeResponse} />
                    <ProfileCard data={profiles.codeforcesResponse} />
                    <ProfileCard data={profiles.geeksforgeeksResponse} />
                </div>
            </div>
        </section>
    );
}

const ProfileCard = ({ data }: { data: any }) => {
    return (
        <div>
            <div className="bg-surface rounded-curved px-8 py-9 w-110 h-93">
                <div className="flex flex-row justify-between ">
                    <div className="flex gap-8 items-center">
                        <div>
                            {data.source === "geeksforgeeks" && <Image
                                src="/gfg_logo.png"
                                alt="profile"
                                width={60}
                                height={60}
                            />}
                            {data.source === "leetcode" && <Image
                                src="/leetcode_logo.png"
                                alt="profile"
                                width={60}
                                height={60}
                            />}
                            {data.source === "codeforces" && <Image
                                src="/codeforces_logo.png"
                                alt="profile"
                                width={60}
                                height={60}
                            />}
                            
                        </div>
                        <div className="flex flex-row gap-3">
                            <div>Handle: </div>
                            <div>himanshu</div>
                        </div>
                    </div>
                    <div className="pt-2 pr-2">
                        <AlignJustify size={26} />
                    </div>
                </div>
                {data.source === "geeksforgeeks" && <GeeksForGeeksProfile data={data.data} />}
                {data.source === "leetcode" && <LeetcodeProfile data={data} />}
                {data.source === "codeforces" && <CodeForcesProfile data={data.data.result[0]} />}
            </div>
            <div className="text-small pt-1 px-7">
                {data.source === "geeksforgeeks" && <Link href="https://www.geeksforgeeks.org/"><div>GeeksForGeeks</div></Link>}
                {data.source === "leetcode" && <Link href="https://leetcode.com/"><div>Leetcode</div></Link>}
                {data.source === "codeforces" && <Link href="https://codeforces.com/"><div>Codeforces</div></Link>}
            </div>
        </div>
    );
};

const LeetcodeProfile = ({ data }: { data: any }) => {
    return (
        <div className="flex flex-row gap-6 px-9 pt-11 pb-9">
            <div className="flex flex-col gap-4">
                <div>Rank :</div>
                <div>Rating :</div>
                <div>Problems Solved :</div>
                <div>Contests Participated :</div>
            </div>
            <div className="flex flex-col gap-4">
                <div>{data.lcattendedContests[0].ranking}</div>
                <div>{Math.round(data.lcattendedContests[0].rating)}</div>
                <div>{data.lcProblemsSolved.problemsSolved[0].count}</div>
                <div>{data.lcattendedContests.length}</div>
            </div>
        </div>
    );
};

const CodeForcesProfile = ({ data }: { data: any }) => {
    return (
        <div className="flex flex-row gap-6 px-9 pt-11 pb-9">
            <div className="flex flex-col gap-4">
                <div>Rating :</div>
                <div>Max Rating :</div>
                <div>Max Rank :</div>
                <div>Friends :</div>
            </div>
            <div className="flex flex-col gap-4">
                <div>{data.rating}</div>
                <div>{data.maxRating}</div>
                <div>{data.maxRank}</div>
                <div>{data.friendOfCount}</div>
            </div>
        </div>
    );
};

const GeeksForGeeksProfile = ({ data }: { data: any }) => {
    const problems = data.userSubmissionsInfo;
    const problemsSolved =
        (problems?.Easy ?? 0) +
        (problems?.Medium ?? 0) +
        (problems?.Hard ?? 0) +
        (problems?.Basic ?? 0) +
        (problems?.School ?? 0);
    return (
        <div className="flex flex-row gap-6 px-9 pt-11 pb-9">
            <div className="flex flex-col gap-4">
                <div>Rank :</div>
                <div>Score :</div>
                <div>Problems Solved :</div>
                <div>Contests Participated :</div>
            </div>
            <div className="flex flex-col gap-4">
                <div>{data.contestData.user_global_rank}</div>
                <div>{data.userInfo.score}</div>
                <div>{problemsSolved}</div>
                <div>
                    {
                        data.contestData.user_contest_data
                            .no_of_participated_contest
                    }
                </div>
            </div>
        </div>
    );
};
