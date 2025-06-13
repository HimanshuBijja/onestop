import axios from "axios";
import ContestCard from "./contestCard";

interface RenderContestType {
    startTime: number;
    title: string;
    source: string;
    link: string;
}

export default async function AllContests() {
    try {
        const baseUrl = process.env.VERCEL_ENV === "development"
        ? "http://localhost:3000"
        : `https://${process.env.VERCEL_URL}`;

        const response = await axios.get(
            `${baseUrl}/api/contest?source=all&day=all&month=all&sortBy=startTime&sortOrder=asc`
        );
        const upcomingContests = response.data.upcomingContests;

        return (
            <section className="relative py-24 px-4">
                <div className="flex flex-col gap-7 justify-center">
                    {upcomingContests.map(
                        (x: RenderContestType, index: any) => (
                            <RenderContest
                                source={x.source}
                                title={x.title}
                                startTime={Number(x.startTime)}
                                link={x.link}
                                key={index}
                            />
                        )
                    )}
                </div>
            </section>
        );
    } catch (error) {
        console.error(error);
        return <div>Error fetching contests</div>;
    }
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
