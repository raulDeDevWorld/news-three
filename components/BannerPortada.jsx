import { useUser } from '../context/Context.js'
import { Zoom, Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css';
import styles from '../styles/Banner.module.css'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

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
        <>
            {
                items.map((item,) =>
                    userDB[`${carpeta}${item}`] && postsIMG && <div className={`${styles.containerFade} ${styles.boxShadow}`} >
                        <Fade transitionDuration={800} duration={2000} scale={1}{...properties} indicators={true}>
                            {
                                Object.keys(userDB[`${carpeta}${item}`]).map((i, index) =>
                                    <div className="each-slide" key={index} >
                                        <div>
                                            {
                                                router.pathname === "/Admin" ?
                                                    <span onClick={() => click({ carpeta, item, i})}><img className={styles.sliderIMG} src={postsIMG[`Banners/${i}`]} /></span>
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




