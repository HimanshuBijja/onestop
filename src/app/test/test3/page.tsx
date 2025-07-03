"use client";

import axios from "axios";
import Loading from "lib/app/components/loading";
import { Suspense } from "react";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then(res => res.data)
 

export default function App() {
    
  
    return (
       <Suspense fallback={<div><Loading /></div>}>
        <Render />
       </Suspense>
    );
}
export  function Render() {
    
    const { data, error } = useSWR('/api/contest?source=all&day=all&month=all&sortBy=startTime&sortOrder=asc', fetcher , {
        suspense : true,
        // fallbackData: {},
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        revalidateOnMount: true,
    })
  
    return (
       <div>
        {JSON.stringify(data)}
       </div>
    );
}
