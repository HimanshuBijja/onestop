import Image from "next/image";

export default function NavBar() {
    return (
        <section className="container mx-auto bg-surface rounded-normal px-7 py-2 flex justify-between items-center mt-8">
            <div className="flex gap-5">
                <div>
                    <Image src="/logo.png" alt="logo" width={45} height={45} />
                </div>
                <div className="text-green-text text-contest-title font-sans">OneStop</div>
            </div>
            <div className="flex gap-12 items-center">
                <div>Contests</div>
                <ProfileCard />
            </div>
        </section>
    );
}

function ProfileCard() {
    return (
        <div className="bg-green-text rounded-normal px-5 py-2 flex items-center gap-3">
            <div className="rounded-full bg-surface w-3 h-3"/>
            <div className="text-foreground-dark font-medium">Profile</div>
        </div>
    );
}
