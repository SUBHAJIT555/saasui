import AdmissionHero from "@/components/features/admissions/AdmissionHero"
import GeneralAdmission from "@/components/features/admissions/GeneralAdmission"
import ProgramAlignmentTable from "@/components/features/certification/ProgramAlignmentTable"



const Admissions = () => {
    return (
        <>
            
            <div className="relative z-10">
                <AdmissionHero />
                <ProgramAlignmentTable />
                <GeneralAdmission />
            </div>
        </>
    )
}

export default Admissions