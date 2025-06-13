export default function Loading() {
    return (
        <div className="absolute inset-0 z-10  flex justify-center items-center bg-gradient-to-b from-background from-50% to-[#282828] to-100% overflow-y-hidden">
            <div className="w-full h-full bg-background-end">
                <div className="w-full h-full bg-background-start">
                    <div className="w-full h-full bg-background-end">
                        loading...
                    </div>
                </div>
            </div>
        </div>
    )
}