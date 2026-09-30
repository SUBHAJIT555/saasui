import CertificationHero from "@/components/features/certification/CertificationHero"
import OfficialCertificate from "@/components/features/certification/OfficialCertificate"
import GradePerformance from "@/components/features/certification/GradePerformance"
import WhatThisMean from "@/components/features/certification/WhatThisMean"
import AssesmentPhilosophy from "@/components/features/certification/AssesmentPhilosophy"

const Certification = () => {
    return (
        <>
           
            <div className="relative z-10">
                <CertificationHero />
                <OfficialCertificate />
                <GradePerformance />
                <AssesmentPhilosophy />
                <WhatThisMean />
            </div>
        </>
    )
}

export default Certification