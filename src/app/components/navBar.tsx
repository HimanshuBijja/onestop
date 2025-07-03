import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
    return (
        <section className=" bg-[#2A2D32]/30 rounded-normal px-7 py-2 flex justify-between items-center mt-8">
            <Link href="/">
                <div className="flex gap-5">
                    <div>
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={45}
                            height={45}
                        />
                    </div>
                    <div className="text-green-text text-[30px] font-sans">
                        OneStop
                    </div>
                </div>
            </Link>
            <div className="flex gap-12 items-center">
                <Link href="/contests">Contests</Link>
                <ProfileCard />
            </div>
        </section>
    );
}

function ProfileCard() {
    return (
        <div className="bg-green-text rounded-normal px-5 py-1.5 flex items-center gap-3">
            <div className="rounded-full bg-surface w-3 h-3" />
            <div className="text-foreground-dark font-medium">
                <Link href="/profiles">Profile</Link>
            </div>
        </div>
    );
}
