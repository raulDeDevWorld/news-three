import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import Button from '../components/Button'
import Success from '../components/Success'
import Error from '../components/Error'
import Link from 'next/link'
import FormAdds from '../components/FormAdds'
import Modal from '../components/Modal'

import BannerLeft from '../components/BannerLeft'
import BannerRight from '../components/BannerRight'
import BannerPortada from '../components/BannerPortada'

import Section from '../components/Section'
import Date from '../components/Date'
import Header from '../components/Header'

import styles from '../styles/Layout.module.css'
import { handleSignOut } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Layout({ children }) {
    const { userDB, setUserData, monthAndYear, setUserSuccess, success, postsIMG, showImg, date, setUserDate } = useUser()

    const [dataEditor, setDataEditor] = useState(null)


    const router = useRouter()



    function handlerClickEnlace(data) {
        router.pathname != "/Admin" && window.open(data.href, data.target)
        router.pathname == "/Admin" && setDataEditor(data)
        // console.log(data.href, data.target)
    }

    function handlerClick(url) {
        router.push(url)
    }



    return (

        <div className={styles.container}>
            <div>
                <BannerPortada carpeta="BannerPortada" items={[1, 2, 3]} click={handlerClickEnlace}></BannerPortada>
            </div>
            <div>
                <BannerLeft carpeta="BannerIzquierdo" items={[1, 2, 3]} click={handlerClickEnlace}></BannerLeft>
            </div>
            <div>
                <BannerRight carpeta="BannerDerecho" items={[1, 2, 3]} click={handlerClickEnlace}></BannerRight>
            </div>
            <main className={styles.main}>
                    {children}

                    <footer className={styles.footer} id="Nosotros">
                        <div>
                            <h5>MISIÓN</h5>
                            <div className={styles.footerItemsContainer}>
                                <img src="/vision.svg" alt="" />
                                <p className={styles.paragraph}>Informar, educar y contribuir a la formación de una cultura ciudadana en torno a la realidad nacional e internacional.</p>

                            </div>
                        </div>
                        <div>
                            <h5>DIRECCIÓN Y PUBLICIDAD ONLINE</h5>
                            <div className={styles.footerItemsContainer}>
                                <img src="/contact.svg" alt="" />
                                <p>(+591) 2 488973 <br /> 73002076 <br />60101760</p>
                                <img src="/ubication.svg" alt="" />
                                <p>Calle Cañada Strongest, <br /> No. 1782 esq. Capitán Castrillo, <br /> Edif. Napolis, Piso 6, Of. 6B <br /> Zona San Pedro</p>
                            </div>

                        </div>
                        <div>
                            <h5>VISIÓN</h5>
                            <div className={styles.footerItemsContainer}>
                                <img src="/mision.svg" alt="" />
                                <p>Ser el medio impreso y digital de mayor influencia en la construcción de un cultura ciudadana en torno a la realidad nacional e internacional.</p>
                            </div>
                        </div>
                        <div>
                            <h5>DIRECCIÓN</h5>
                            <div className={styles.socialMediaIcons}>
                                <Link href="https://www.facebook.com/periodicohoybolivia0" legacyBehavior scroll={false}>
                                    <a onClick={handlerClick} target="_blank"><img src="/SocialMedia/FACEBOOK-01.svg" alt="SocialMedia" /></a>
                                </Link>
                                <Link href="https://www.instagram.com/periodicohoybolivia/" legacyBehavior scroll={false}>
                                    <a onClick={handlerClick} target="_blank"><img src="/SocialMedia/INSTAGRAM-02.svg" alt="SocialMedia" /></a>
                                </Link>
                                <Link href="https://twitter.com/_HOYBolivia" legacyBehavior scroll={false}>
                                    <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/TWITTER-03.svg" alt="SocialMedia" /></a>
                                </Link>
                                <Link href="https://www.youtube.com/channel/UCXFA6pzESb1NQMsepmhC6Vw" legacyBehavior scroll={false}>
                                    <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/YOUTUBE-04.svg" alt="SocialMedia" /></a>
                                </Link>
                                <Link href="https://www.tiktok.com/@periodicohoybolivia" legacyBehavior scroll={false}>
                                    <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/tIK tOK-05.svg" alt="SocialMedia" /></a>
                                </Link>
                                <Link href={`https://api.whatsapp.com/send?phone=+59161116665&text=Hola%20Periódico%20HOY%20%20quiero%20contactarme%20con%20un%20agente%20de%20ventas...`} legacyBehavior scroll={false}>
                                    <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/WHATSAPP-06.svg" alt="SocialMedia" /></a>
                                </Link>
                            </div>

                        </div>

                        <span> ©TARKAN Ltda.</span>
                    </footer>



            </main>
            {dataEditor && <Modal carpeta={dataEditor.carpeta} item={dataEditor.item} i={dataEditor.i} close={handlerClickEnlace}></Modal>}
        </div>

    )
}

export default Layout


