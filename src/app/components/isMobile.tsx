
export default function Warning({toggle}: {toggle:()=>void}) {
    return (
        <div className="absolute inset-0 z-50 p-20 bg-background text-center">
            <div className=" relative bg-surface/50 flex justify-center items-center w-full h-full rounded-curved p-5">
            <div>

            ⚠️ Best viewed on <span className="text-green-text">Desktop</span>. Mobile layout may appear distorted.
            </div>
                <div className="absolute bottom-5 transform left-1/2 -translate-x-1/2  bg-green-text  text-background px-13 py-3 rounded-[30px] font-medium "
                onClick={toggle}>
                    View Anyway
                </div>
            </div>
        </div>
    );
}
