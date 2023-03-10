import { useUser } from '../context/Context.js'
import { useRouter } from 'next/router'
import Navbar from './Navbar'
import Link from 'next/link'
import Modal from './Modal'

import Date from './Date'
import styles from '../styles/Header.module.css'
import { useState } from 'react'
import Button from '../components/Button'
import BannerPortada from '../components/BannerPortada'
import BannerLeft from '../components/BannerLeft'
import RelojDigital from './RelojDigital'

import FormAdds from '../components/FormAdds'

import { getDate } from '../utils/Utils'
import { uploadIMG } from '../firebase/storage'
import { writeUserData } from '../firebase/utils'
import { Fade } from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css';


import { connectStorageEmulator } from 'firebase/storage'

export default function Header(props) {
    const router = useRouter()
    const { user, userDB, postsIMG, setUserMonthAndYear, setUserDayMonthYear, setUserSuccess, setUserPostsIMG, date } = useUser()

    const [data, setData] = useState({})

    const [newBannerIntro, setNewBannerIntro] = useState(null)
    const [urlBannerIntro, setUrlBannerIntro] = useState(null)

    const [elements, setElements] = useState(false)
    const [dataForDate, setDataForDate] = useState([])
    const [dataEditor, setDataEditor] = useState(null)

    function setPostsElements() {
        setElements(!elements)
    }

    function handlerEventChange(e) {
        const name = e.target.name
        const value = e.target.value
        const object = { [name]: value }
        setData({ ...data, ...object })
    }

    function dateEvent(e) {
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        const format = e.target.value.split("-")
        setUserDayMonthYear(`${parseInt(format[2])}-${months[format[1] - 1]}-${format[0]}`)
        setUserMonthAndYear(`${months[format[1] - 1]}-${format[0]}`)
    }

    function handlerClick(url) {       
        router.push(url)
    }      
    function handlerClickEnlace(i) {
        router.pathname != "/Admin" && router.push("/" + userDB[topic]["Posts"][`PostImage_${i}`])
        router.pathname == "/Admin" && setDataEditor(i)

        console.log(i)
    }

    return (
        <>
            { router.pathname == "/Admin"  && <FormAdds />}
            <header className={styles.header}>
                <div className={styles.fecha}>
                    <Date></Date>
                    <input className={styles.calendario} type="date" id="start" name="trip" onChange={dateEvent} />
                </div>
                <div className={styles.portada}>
                    <RelojDigital></RelojDigital>

                    <img className={styles.video} src="/1675975675928.gif" alt="navidad" />
                    <img className={styles.navidad} src="/dia-mujer.webp" alt="navidad" />
 
                </div>
            </header>
            <Navbar />
            {dataEditor && <Modal post={dataEditor.key} topic={'/'} i={dataEditor.i} close={handlerClickEnlace}></Modal>}
        </>
    )
}





