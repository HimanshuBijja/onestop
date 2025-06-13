
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


export default function Home() {
    return (
        <div>
            <div className="fixed inset-0 h-screen w-screen -z-20 bg-gradient-to-b from-background from-50% to-[#282828] to-100%" />
            <Image
                src="/homeBgDesign.png"
                alt="logo"
                fill
                className="fixed inset-0 h-screen w-screen -z-10"
            />
            <div className="grid grid-cols-12 gap-4 mt-32">
                <div className="col-span-5">
                    <Image
                        src="/heroImage.png"
                        alt="logo"
                        width={400}
                        height={300}
                    />
                </div>

                <div className="col-span-7 flex flex-col gap-10 mt-15 text-center justify-center">
                    <div className="flex flex-row gap-9 text-[50px] justify-center">
                        <div className="font-rosarivo">OneStop for</div>
                        <motion.div className="font-sans text-green-text font-bold">
                            Everything
                        </motion.div>
                    </div>
                    <div className="text-center mx-[17%] ">
                        <div>
                            We've created a streamlined platform with careful
                        </div>
                        <div>
                            attention to detail, prioritizing what matters most
                        </div>
                        <div>— your Progress in Programming</div>
                    </div>
                    <div className="flex flex-row gap-10 justify-center">
                        <ButtonFilled />
                        <ButtonHollow />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ButtonFilled() {
    const router = useRouter();
    return (
        <div className="bg-green-text/70 hover:bg-green-text text-background px-13 py-3 rounded-[30px] font-medium transition-all duration-300">
            <button onClick={() => {
                router.push("/contests");
            }}>
                View Contests
            </button>
        </div>
    )
}
function ButtonHollow() {
    return (
        <div className="bg-transparent text-foreground px-13 py-3 rounded-[30px] font-medium border border-green-text hover:bg-surface/50 hover:border-green-text/50 transition-all duration-300">
            <div>
                Get Started
            </div>
        </div>
    )
}
