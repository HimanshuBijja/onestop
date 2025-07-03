export default function Loading() {
    return (
        <div>
            <div className="fixed inset-0 h-screen w-screen z-20 bg-gradient-to-b from-background from-50% to-[#282828] to-100% flex justify-center items-center" >
                <div className="loader"></div>
        </div>
        </div>
    )
}