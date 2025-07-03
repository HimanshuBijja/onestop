import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;
    const gfgusername = query.get("gfgusername") ?? "";

    if(!gfgusername){
        return NextResponse.json({
            source: "geeksforgeeks",
            success: false,
            msg: "Enter Username",
        });
    }
    const gfgDetails = await fetchGeeksforgeeks(gfgusername);
    return NextResponse.json(gfgDetails);
}

export const fetchGeeksforgeeks = async (gfgusername: string) => {
    if (!gfgusername) {
        return {
            source: "geeksforgeeks",
            success: false,
            msg: "Enter Username",
        };
    } else {
        const hash = "kPIBY_e295Ksh2RjZIzKa"
        try {
            const geeksforgeeksFullResponse = await axios.get(
                // `https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${gfgusername}&article_count=false&redirect=true`,
                `https://www.geeksforgeeks.org/gfg-assets/_next/data/${hash}/user/${gfgusername}.json`,

                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );

            const {
                badgesInfo,
                footerData,
                headerData,
                heatMapData,
                initialState,
                lineChartData,
                subHeaderData,
                ...destructuredData
            } = geeksforgeeksFullResponse.data.pageProps;   
            const userSubmissionsInfo = {
                ...destructuredData.userSubmissionsInfo,
                Medium : Object.keys(destructuredData.userSubmissionsInfo.Medium).length > 0 ? Object.keys(destructuredData.userSubmissionsInfo.Medium).length : 0,
                Hard : Object.keys(destructuredData.userSubmissionsInfo.Hard).length > 0 ? Object.keys(destructuredData.userSubmissionsInfo.Hard).length : 0,
                Easy : Object.keys(destructuredData.userSubmissionsInfo.Easy).length > 0 ? Object.keys(destructuredData.userSubmissionsInfo.Easy).length : 0,
                Basic : Object.keys(destructuredData.userSubmissionsInfo.Basic).length > 0 ? Object.keys(destructuredData.userSubmissionsInfo.Basic).length : 0,
                School : Object.keys(destructuredData.userSubmissionsInfo.School).length > 0 ? Object.keys(destructuredData.userSubmissionsInfo.School).length : 0,
            }
            const {contest_data, ...rest} = destructuredData.contestData.user_contest_data
            const user_contest_data = rest
            const contestData = {
                ...destructuredData.contestData,
                user_contest_data,
            }
                

            const response = {
                ...destructuredData,
                userSubmissionsInfo,
                contestData,
            }

            return {
                source: "geeksforgeeks",
                success: true,
                msg: "Success",
                data: response,
            };
        } catch (error) {
            return {
                source: "geeksforgeeks",
                success: false,
                msg: "Incorrect Username",
            };
        }
    }
};