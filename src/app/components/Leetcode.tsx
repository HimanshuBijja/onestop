import axios from "axios";
import ContestCard from "./contestCard";

interface RenderContestType {
    startTime: number;
    title: string;
    source : string;
    link : string;
}

export default async function Leetcode() {
    const response = await axios.get(
        "http://localhost:3000/api/contest?source=all&day=all&month=all&sortBy=startTime&sortOrder=asc"
    );
    const upcomingContests = response.data.upcomingContests;


  


    return (
        <section className="relative py-24 px-4">
            <div className="flex flex-col gap-7">
                {upcomingContests.map((x: RenderContestType, index:any) => (
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

function RenderContest({source, startTime, title, link }: RenderContestType) {
    const time = new Date(startTime * 1000);

    const hours = time.getHours();
    const minutes = "0" + time.getMinutes();
    const seconds = "0" + time.getSeconds();
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
           

            <ContestCard  source={source} label={title} time={formattedTime} date={formattedDate} url={link} />


        </div>
    );
}

