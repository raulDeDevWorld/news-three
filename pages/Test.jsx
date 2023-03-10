import Head from 'next/head'
import Image from 'next/image'
import Layout from '../layout/Layout'
import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import Button from '../components/Button'
import Success from '../components/Success'
import Error from '../components/Error'
import Link from 'next/link'
import FormAdds from '../components/FormAdds'

import BannerLeft from '../components/BannerLeft'
import BannerRight from '../components/BannerRight'
import BannerPortada from '../components/BannerPortada'

import Section from '../components/Section'
import Date from '../components/Date'
import Header from '../components/Header'

import styles from '../styles/Home.module.css'
import { handleSignOut } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Home() {
  const { userDB, setUserData, monthAndYear, setUserSuccess, success, postsIMG, showImg, date, setUserDate } = useUser()
  const router = useRouter()

  const [periodicoPDF, setPeriodicoPDF] = useState(false);
  const [periodicoPDFEffect, setPeriodicoPDFEffect] = useState(false);

  function handlerClickEnlace(data) {
    router.pathname != "/Admin" && window.open(data.href, data.target)
    router.pathname == "/Admin" && setDataEditor(i)
    // console.log(data.href, data.target)

  }

  function handlerClick(url) {
    router.push(url)
  }
  function whatsappClickHandler() {
    router.push("https://api.whatsapp.com/send?phone=+59160589090&text=Buenas%20Hoy...")
  }

  function handlerPDFView(parametro) {
    parametro && setPeriodicoPDFEffect(true)
    setPeriodicoPDF(!periodicoPDF)
  }



  const periodicoPDFImg = {
    height: '100%',
    width: '100%',
    objectFit: 'contain',
    objectPosition: 'center',
    borderRadius: '5px',
    boxShadow: '0 0 15px black',
    transition: 'all',
    transitionDuration: '.3s',

  }



  useEffect(() => {
    if (periodicoPDFEffect == true) {
      return
    }
    setTimeout(() => {
      setPeriodicoPDF(!periodicoPDF)
    }, 2000)

  }, [periodicoPDF == "User" ? '' : periodicoPDF])

  return (
    <Layout>
      
        <main className={styles.main}>
          <Section topic="Inicio" publicView={true} color=''></Section>
          <Section topic="Sociedad" publicView={true} color=''></Section>
          <Section topic="Salud" publicView={true} color=''></Section>
          <Section topic="Seguridad" publicView={true} color=''></Section>
          <Section topic="Politica" publicView={true} color=''></Section>
          <Section topic="Economia" publicView={true} color=''></Section>
          <Section topic="Deportes" publicView={true} color=''></Section>
          <Section topic="GestionDeGobierno" publicView={true} color=''></Section>
          <Section topic="Cultura" publicView={true} color=''></Section>
          <Section topic="Internacional" publicView={true} color=''></Section>
          <Section topic="Opinion" publicView={true} color=''></Section>

          <footer className={styles.footer} id="nosotros">
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
                <p>(519-2) 2488973 <br /> 73002076 <br />60101760</p>
                <img src="/ubication.svg" alt="" />
                <p>Calle Cañada Strongest, <br /> No. 1782 esq. Capitán Castrillo, <br /> Edif. Napolis, Piso 6, Of. 6B <br /> Zona San Pedro</p>
              </div>

            </div>
            <div>
              <h5>VISIÓN</h5>
              <div className={styles.footerItemsContainer}>
                <img src="/mision.svg" alt="" />
                <p>Ser el medio impreso y digital de mayor influencía en la construcción de un cultura ciudadana en torno a la realidad nacional e internacional.</p>
              </div>
            </div>
            <div>
              <h5>DIRECCIÓN</h5>
              <div className={styles.socialMediaIcons}>
                <Link href="https://www.facebook.com/periodicohoybolivia0" legacyBehavior scroll={false}>
                  <a onClick={handlerClick} target="_blank"><img src="/SocialMedia/facebook-fotter.png" alt="SocialMedia" /></a>
                </Link>
                <Link href="https://www.instagram.com/periodicohoybolivia/" legacyBehavior scroll={false}>
                  <a onClick={handlerClick} target="_blank"><img src="/SocialMedia/instagram-fotter.png" alt="SocialMedia" /></a>
                </Link>
                <Link href="https://twitter.com/_HOYBolivia" legacyBehavior scroll={false}>
                  <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/twiter-fotter.png" alt="SocialMedia" /></a>
                </Link>
                <Link href="https://www.youtube.com/channel/UCXFA6pzESb1NQMsepmhC6Vw" legacyBehavior scroll={false}>
                  <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/youtube-fotter.png" alt="SocialMedia" /></a>
                </Link>
                <Link href="https://www.tiktok.com/@periodicohoybolivia" legacyBehavior scroll={false}>
                  <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/tiktok-fotter.png" alt="SocialMedia" /></a>
                </Link>
                <Link href={`https://api.whatsapp.com/send?phone=+59161116665&text=Hola%20Periódico%20HOY%20%20quiero%20contactarme%20con%20un%20agente%20de%20ventas...`} legacyBehavior scroll={false}>
                  <a onClick={handlerClick} target="_blank"> <img src="/SocialMedia/whatsapp.png" alt="SocialMedia" /></a>
                </Link>
              </div>

            </div>

            <span> ©TARKAN Ltda. {monthAndYear.split('-')[1]}</span>
          </footer>
        </main>
    </Layout>

  )
}

export default WithoutAuth(Home)




