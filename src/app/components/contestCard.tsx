"use client";

import Image from "next/image";
import Link from "next/link";

interface ContestCardType {
    label: string;
    time?: string;
    date?: string;
    source: string;
    url: string;
}

export default function ContestCard({
    source,
    label,
    time,
    date,
    url,
}: ContestCardType) {
    return (
        <div className="container mx-auto bg-surface rounded-4xl px-8 py-5 flex justify-between items-center max-w-3xl">
            <div className="flex  gap-5 items-center">
                <div>
                    {source === "Leetcode" && (
                        <Image
                            src="/leetcode_logo.png"
                            alt="logo"
                            width={60}
                            height={60}
                        />
                    )}
                    {source === "Code forces" && (
                        <Image
                            src="/codeforces_logo.png"
                            alt="logo"
                            width={60}
                            height={60}
                        />
                    )}
                    {source === "Code Chef" && (
                        <Image
                            src="/codechef_logo.png"
                            alt="logo"
                            width={60}
                            height={60}
                        />
                    )}
                    {source === "Geeks for Geeks" && (
                        <Image
                            src="/gfg_logo.png"
                            alt="logo"
                            width={60}
                            height={60}
                        />
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="text-contest-title">{label}</div>
                    <div className="flex gap-2 items-baseline-last pl-3">
                        <div className="text-time text-green-text">{time}</div>
                        <div>{date}</div>
                    </div>
                </div>
            </div>
            <VisitButton url={url} />
        </div>
    );
}

function VisitButton({ url }: { url: string }) {
    return (
        <div className="bg-green-text/70 hover:bg-green-text transition-all duration-300 rounded-normal px-7 py-2 flex items-center text-foreground-dark font-medium">
            <Link href={url}>Visit</Link>
        </div>
    );
}
