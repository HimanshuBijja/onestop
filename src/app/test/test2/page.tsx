"use client"

import { lcUserdata } from "lib/atoms/profile"
import { Suspense } from "react"
import { RecoilRoot, useRecoilValue, useRecoilValueLoadable } from "recoil"

export default function Fn(){

    // const data = useRecoilValue(lcUserdata)
    // console.log(data)
    return (
        <RecoilRoot>
            <div>
            <Suspense fallback={<div>Loading...</div>}>
                    <Fn2 />
                </Suspense>
            </div>
        </RecoilRoot>
    )
}

const Fn2 = () => {
    const dataLoadable = useRecoilValueLoadable(lcUserdata);

    if (dataLoadable.state === "loading") return <div>Loading...</div>;
    if (dataLoadable.state === "hasError") return <div>Error loading data</div>;

    return <div>{JSON.stringify(dataLoadable.contents)}</div>;
};

