import { assetSrc } from "@/lib/utils";
import LogoWhite from '@/assets/img/logo/Cyberlabs-logo-03.svg'

const Logo = () => {
    return (

        <img src={assetSrc(LogoWhite)} alt="Logo" className='w-full h-full' />

    )
}

export default Logo