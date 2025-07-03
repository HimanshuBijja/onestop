import axios from "axios";
import { LEETCODE_ENDPOINT, LEETCODE_USER_CONTEST_HISTORY, LEETCODE_USER_PROBLEMS_SOLVED } from "lib/app/utils/apiConfig";
import { lcattendedUserContests } from "lib/app/utils/filterUserData";
import { lcsimplifiedUserData } from "lib/app/utils/simplifiedUserData";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const lcusername = query.get("lcusername") ?? "";

    if(!lcusername){
        return NextResponse.json({
            source: "leetcode",
            success: false,
            msg: "Enter Username",
        });
    }
    const lcDetails = await fetchLeetcode(lcusername);
    return NextResponse.json(lcDetails);
}

const fetchLeetcode = async (lcusername: string) => {
    if (!lcusername) {
        return {
            source: "leetcode",
            success: false,
            msg: "Enter Username",
        };
    } else {
        try {
            const leetcodeResponseProblem = await axios.post(
                LEETCODE_ENDPOINT,
                {
                    query: LEETCODE_USER_PROBLEMS_SOLVED,
                    variables: { username: lcusername },
                },
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
            if (leetcodeResponseProblem.data.data.matchedUser === null) {
                return {
                    source: "leetcode",
                    success: false,
                    msg: "Incorrect Username",
                };
            } else {
                const lcProblemsSolved = lcsimplifiedUserData(
                    leetcodeResponseProblem.data
                );

                const leetcodeResponseContest = await axios.post(
                    LEETCODE_ENDPOINT,
                    {
                        query: LEETCODE_USER_CONTEST_HISTORY,
                        variables: { username: lcusername },
                    },
                    {
                        headers: {
                            "content-type": "application/json",
                        },
                    }
                ); // array of objects
                const lcattendedContests = lcattendedUserContests(
                    leetcodeResponseContest.data.data
                        .userContestRankingHistory
                );
                return {
                    source: "leetcode",
                    success: true,
                    msg: "Success",
                    lcProblemsSolved,
                    lcattendedContests,
                };
            }
        } catch (error) {
            return {
                source: "leetcode",
                success: false,
                msg: "Incorrect Username",
            };
        }
    }
};