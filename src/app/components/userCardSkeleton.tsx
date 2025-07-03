
export default function UserCardSkeleton() {
    

 
    return (
        
                   <ProfileCard />
          
    );
}


const ProfileCard = () => {
    

    return (
        <div>
            <div className="bg-surface rounded-curved px-8 py-9 w-110 h-93">
                <div className="flex flex-row justify-between ">
                    <div className="flex gap-8 items-center">
                        <div className="skeleton w-15 h-15 rounded-full">
                            
                        </div>
                        <div className="flex flex-row gap-3">
                            <div> </div>
                            <div className="skeleton w-40 h-6 rounded-normal"></div>
                        </div>
                    </div>
                    <div className="pt-2 pr-2">
                        
                    </div>
                </div>
                <Data />
            </div>
            <div className="text-small pt-1 px-7">
                <div className=" w-15 h-4"></div>
            </div>
        </div>
    );
};




 function Data() {
    return (
        <div className="flex flex-row gap-6 px-9 pt-11 pb-9">
        <div className="flex flex-col gap-4">
            <div className="skeleton w-35 h-6 rounded-normal"></div>
            <div className="skeleton w-30 h-6 rounded-normal"></div>
            <div className="skeleton w-40 h-6 rounded-normal"></div>
            <div className="skeleton w-25 h-6 rounded-normal"></div>
        </div>
        <div className="flex flex-col gap-4">
            <div className="skeleton w-10 h-6 rounded-normal"></div>
            <div className="skeleton w-30 h-6 rounded-normal"></div>
            <div className="skeleton w-25 h-6 rounded-normal"></div>
            <div className="skeleton w-15 h-6 rounded-normal"></div>
        </div>
    </div>
    );
}