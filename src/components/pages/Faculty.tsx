import FacultyHero from "@/components/features/faculty/FacultyHero"
import FoundationFaculty from "@/components/features/faculty/FoundationFaculty"
import CoreFaculty from "@/components/features/faculty/CoreFaculty"
// import WhatAndWhyTeam from "@/components/WhatAndWhyTeam"
// import CallToAction from "@/components/common/CallToAction"
import WhatTruelySet from "@/components/features/home/WhatTruelySet"

const Faculty = () => {
    return (
        <>
            
            <div className="relative z-10">
                <FacultyHero />
                <FoundationFaculty />
                <CoreFaculty />
                <WhatTruelySet />
            </div>
        </>
    )
}

export default Faculty;