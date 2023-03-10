import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context.js'

import style from '../styles/Navbar.module.css'

export default function Navbar() {
    const { pathname } = useRouter()
    const { setUserShowImg, showImg } = useUser()
    function handleClick() {
        setUserShowImg(!showImg)
    }
    function handlerClick() {
        setUserShowImg(false)
    }
    return (
        <>
            <div className={style.socialMedia} style={{height: 'auto'}}>

            <div className={style.container}>
                <nav className={style.nav}>
                    <Link href="/#Sociedad" legacyBehavior scroll={false}>
                        <a className={`${style.link} ${pathname == "#Sociedad" ? style.active : ''}`} onClick={handlerClick}>SOCIEDAD</a>
                    </Link>
                    <Link href="/#Salud" legacyBehavior scroll={false}>
                        <a className={`${style.link} ${pathname == "#Salud" ? style.active : ''}`} onClick={handlerClick}>SALUD</a>
                    </Link>
                    <Link href="/#Seguridad" legacyBehavior scroll={false}>
                        <a className={`${style.link} ${pathname == "#Seguridad" ? style.active : ''}`} onClick={handlerClick}>SEGURIDAD</a>
                    </Link>
                    <Link href="/#Politica" legacyBehavior scroll={false}>
                        <a className={`${style.link} ${pathname == "#Politica" ? style.active : ''}`} onClick={handlerClick}>POLÍTICA</a>
                    </Link>
                    <Link href="/#Economia" legacyBehavior scroll={false}>
                        <a className={`${style.link} ${pathname == "#Economia" ? style.active : ''}`} onClick={handlerClick}>ECONOMÍA</a>
                    </Link>
                    <Link href="/#Deportes" legacyBehavior scroll={false}>
                        <a className={`${style.link} ${pathname == "#Deportes" ? style.active : ''}`} onClick={handlerClick}>DEPORTES</a>
                    </Link>
                    <Link href="/#GestionDeGobierno" legacyBehavior scroll={false}>
                        <a className={`${style.link} ${pathname == "#GestionDeGobierno" ? style.active : ''}`} onClick={handlerClick}>GESTIÓN DE GOBIERNO</a>
                    </Link>
                    <Link href="/#Cultura" legacyBehavior scroll={false}>
                        <a className={`${style.link} ${pathname == "#Cultura" ? style.active : ''}`} onClick={handlerClick}>CULTURA</a>
                    </Link>
                    <Link href="/#Internacional" legacyBehavior scroll={false}>
                        <a className={`${style.link} ${pathname == "#Internacional" ? style.active : ''}`} onClick={handlerClick}>INTERNACIONAL</a>
                    </Link>
                    <Link href="/#Opinion" legacyBehavior scroll={false}>
                        <a className={`${style.link} ${pathname == "#Opinion" ? style.active : ''}`} onClick={handlerClick}>OPINIÓN</a>
                    </Link>
                    <Link href="/#Imagenes" legacyBehavior scroll={false}>
                        <a className={`${style.link} ${pathname == "#Imagenes" ? style.active : ''}`} onClick={handlerClick}>IMÁGENES</a>
                    </Link>
                    <Link href="/#Videos" legacyBehavior scroll={false}>
                        <a className={`${style.link} ${pathname == "#Videos" ? style.active : ''}`} onClick={handleClick}>VIDEOS</a>
                    </Link>
                    <Link href="/#Nosotros" legacyBehavior scroll={false}>
                        <a className={`${style.link} ${pathname == "#Nosotros" ? style.active : ''}`} onClick={handleClick}>NOSOTROS</a>
                    </Link>

                </nav>
                <div className={style.containerSocialMediaIcons}>
                        <div className={style.socialMediaIcons} style={{position:'absolute', top: '20px'}}>

                        <Link href="https://api.whatsapp.com/send?phone=+59161116665&text=Hola%20Periódico%20HOY%20%20quiero%20contactarme%20con%20un%20agente%20de%20ventas..." legacyBehavior scroll={false}>
                            <a onClick={handlerClick} target="_blank"><img src="/SocialMedia/whatsapp.svg" alt="SocialMedia" /></a>
                        </Link>
                        <Link href="https://www.facebook.com/periodicohoybolivia0" legacyBehavior scroll={false}>
                            <a onClick={handlerClick} target="_blank"><img src="/SocialMedia/facebook.png" alt="SocialMedia" /></a>
                        </Link>
                        <Link href="https://www.instagram.com/periodicohoybolivia/" legacyBehavior scroll={false}>
                            <a onClick={handlerClick} target="_blank"><img src="/SocialMedia/instagram.png" alt="SocialMedia" /></a>
                        </Link>
                        <Link href="https://twitter.com/_HOYBolivia" legacyBehavior scroll={false}>
                            <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/twiter.png" alt="SocialMedia" /></a>
                        </Link>
                        <Link href="https://www.youtube.com/channel/UCXFA6pzESb1NQMsepmhC6Vw" legacyBehavior scroll={false}>
                            <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/youtube.png" alt="SocialMedia" /></a>
                        </Link>
                        <Link href="https://www.tiktok.com/@periodicohoybolivia" legacyBehavior scroll={false}>
                            <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/tiktok.png" alt="SocialMedia" /></a>
                        </Link>
                    </div>
                </div>
            </div>
            </div>
            
        </>
    )
}