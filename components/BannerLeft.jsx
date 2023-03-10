import { useUser } from '../context/Context.js'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css';
import styles from '../styles/Banner.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'


export default function Banner({ carpeta, items, click }) {

    const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, monthAndYear } = useUser()
    const router = useRouter()

    const buttonStyle = {
        width: "30px",
        background: 'none',
        border: '0px'
    };

    const properties = {
        prevArrow: <button style={{ ...buttonStyle }}></button>,
        nextArrow: <button style={{ ...buttonStyle }}></button>
    }
function redirect(rute) {
        window.open(rute, '_blank')
    }

    return (
        <>{
            items.map((item,) =>
                userDB[`${carpeta}${item}`] && postsIMG && <div className={`${styles.containerFadeLeft}`} >
                    <Fade transitionDuration={800} duration={2000} scale={1}{...properties} indicators={true}>
                        {
                            Object.keys(userDB[`${carpeta}${item}`]).map((i, index) =>
                                <div className="each-slide" key={index} >
                                    <div>
                                        {
                                            router.pathname === "/Admin" ?
                                                <span onClick={() => click({ carpeta, item, i })}><img className={styles.sliderIMG} src={postsIMG[`Banners/${i}`]} /></span>
                                                : <span onClick={() => redirect(userDB[`${carpeta}${item}`][i].enlace ? userDB[`${carpeta}${item}`][i].enlace : '#')}><img className={styles.sliderIMG} src={postsIMG[`Banners/${i}`]} /></span>
                                        }
                                    </div>
                                </div>
                            )}
                    </Fade>
                </div>
            )
        }

        </>
    )
}
















{/*<Link href={`https://api.whatsapp.com/send?phone=${userDB[carpeta][i].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                                    <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
                            </Link>*/}


{/* <div className={styles.containerFadeLeft} >
            {userDB[carpeta] && postsIMG && <Fade transitionDuration={800} duration={2000} scale={1.4}{...properties} indicators={true}>
                {
                    Object.keys(userDB[carpeta]).map((i, index) =>
                        <div className="each-slide" key={index} >

                            <div>
                                {
                                    router.pathname == "/Admin" ?
                                        <span onClick={() => click({ key: 'BannerLeft', i })}><img className={styles.sliderIMGLeft} src={postsIMG[`${carpeta}/${i}`]} /></span>
                                        : <span onClick={() => click({ href: userDB['BannerLeft'][i].enlace ? userDB['BannerLeft'][i].enlace : '#', target: userDB['BannerLeft'][i].enlace ? "_blank" : '' })}>
                                            <img className={styles.sliderIMGLeft} src={postsIMG[`${carpeta}/${i}`]} />
                                        </span>
                                }
                               

                            </div>
                        </div>
                    )}
            </Fade>}
        </div> */}
{/*<Link href={`https://api.whatsapp.com/send?phone=${userDB[carpeta][i].whatsapp}&text=Hola%20vi%20su%20anuncion%20en%20el%20PERIODICO%20HOY%20`} legacyBehavior>
                                    <a target="_blank"><img className={styles.sliderWhatsapp} src={`/SocialMedia/whatsapp.svg`} /></a>
                            </Link>*/}
