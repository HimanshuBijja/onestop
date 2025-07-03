import axios from "axios";
import { CODEFORCES_USER_ENDPOINT } from "lib/app/utils/apiConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const cfusername = query.get("cfusername") ?? "";

    if(!cfusername){
        return NextResponse.json({
            source: "codeforces",
            success: false,
            msg: "Enter Username",
        });
    }
    const cfDetails = await fetchCodeforces(cfusername);
    return NextResponse.json(cfDetails);
}

const fetchCodeforces = async (cfusername: string) => {
    if (!cfusername) {
        return {
            source: "codeforces",
            success: false,
            msg: "Enter Username",
        };
    } else {
        try {
            const codeforcesFullResponse = await axios.get(
                CODEFORCES_USER_ENDPOINT + cfusername,
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
            return {
                source: "codeforces",
                success: true,
                msg: "Success",
                data: codeforcesFullResponse.data,
            };
        } catch (error) {
            return {
                source: "codeforces",
                success: false,
                msg: "Incorrect Username",
            };
        }
    }
};