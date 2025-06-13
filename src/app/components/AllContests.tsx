"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ContestCard from "./contestCard";

interface RenderContestType {
    startTime: number;
    title: string;
    source: string;
    link: string;
}

export default function AllContests() {
    const [upcomingContests, setUpcomingContests] = useState<
        RenderContestType[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const response = await axios.get(
                    `/api/contest?source=all&day=all&month=all&sortBy=startTime&sortOrder=asc`
                );
                setUpcomingContests(response.data.upcomingContests);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(true);
                setLoading(false);
            }
        };

        fetchContests();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading contests...
            </div>
        );
    }

    if (error) {
        return <div>Error fetching contests</div>;
    }

    return (
        <section className="relative py-24 px-4">
            <div className="flex flex-col gap-7 justify-center">
                {upcomingContests.map((x: RenderContestType, index: number) => (
                    <RenderContest
                        source={x.source}
                        title={x.title}
                        startTime={Number(x.startTime)}
                        link={x.link}
                        key={index}
                    />
                ))}
            </div>
        </section>
    );
}

function RenderContest({ source, startTime, title, link }: RenderContestType) {
    const time = new Date(startTime * 1000);

    let hours = time.getHours().toString();
    let minutes = time.getMinutes().toString();
    const seconds = "0" + time.getSeconds();
    if (Number(hours) < 10) {
        hours = "0" + hours.toString();
    }
    if (Number(minutes) < 10) {
        minutes = "0" + minutes.toString();
    }
    const formattedTime = hours + ":" + minutes;

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const year = time.getFullYear();
    const month = months[time.getMonth()];
    const date = time.getDate();

    const formattedDate = date + " " + month;

    return (
        <div className="">
            <ContestCard
                source={source}
                label={title}
                time={formattedTime}
                date={formattedDate}
                url={link}
            />
        </div>
    );
}
