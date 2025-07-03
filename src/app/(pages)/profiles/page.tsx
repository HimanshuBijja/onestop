"use client";

import LeetcodeUserData from "./Leetcode";
import CodeforcesUserData from "./codeforces";
import GeeksforGeeksUserData from "./geeksforgeeks";

export default function Profiles() {
    return (
        <section className="relative py-24 px-4">
            <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-x-10 gap-y-15">
                    <LeetcodeUserData />
                    <CodeforcesUserData />
                    <GeeksforGeeksUserData />
                </div>
            </div>
        </section>
    );
}
