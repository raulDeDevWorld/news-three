import style from '../styles/Modal.module.css'
import { writeUserData, getData, removeData } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useUser } from '../context/Context.js'
import Button from '../components/Button'
import { useState, useEffect } from 'react'
import { getDate, getDayMonthYear, getMonthAndYear } from '../utils/Utils'
import FormAddsC from './FormAddsC'


export default function Error({ key, rute, carpeta, item, i, post, topic, close }) {
    const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear } = useUser()

    const [data, setData] = useState({})

    const [postImage, setPostImage] = useState(null)
    const [urlPostImage, setUrlPostImage] = useState(null)

    function manageInputIMGSetting(e) {

        ("funcionando")
        const fileName = `${e.target.name}`
        const file = e.target.files[0]

        if (fileName === 'PostImage') {
            setPostImage(file)
            setUrlPostImage(URL.createObjectURL(file))
        }
    }

    function handlerEventChange(e) {
        const name = e.target.name
        const value = e.target.value
        const object = { [name]: value }
        setData({ ...data, ...object })
    }

    function handlerEventChange(e) {
        const name = e.target.name
        const value = e.target.value
        const object = { [name]: value }
        setData({ ...data, ...object })
    }

    function saveConfig(e, key) {
        e.preventDefault()

        const monthYear = monthAndYear ? monthAndYear : getMonthAndYear()
        const newDate = new Date()
        if (key == "SavePost") {
            const ruteDB = `/${topic}/Posts` // Nov-2022/Inicio
            const ruteSTG = `${topic}` // Nov-2022/
            const fileName = `PostImage_${i}` // PostImage_Tue Nov 15 2022 
            const object = { [fileName]: { ...userDB[topic].Posts[`PostImage_${i}`], fecha: newDate.toString(), description: data.descriptionPost ? data.descriptionPost : userDB[topic].Posts[`PostImage_${i}`].description, enlace: data.enlacePost ? data.enlacePost : userDB[topic].Posts[`PostImage_${i}`].enlace, objectFit: data.objectPositionPost ? data.objectPositionPost : userDB[topic].Posts[`PostImage_${i}`].objectFit } }
            writeUserData(ruteDB, object, setUserSuccess, setUserData)
            postImage && uploadIMG(ruteSTG, fileName, postImage, setUserSuccess, monthYear)
        }
    }

    function remove(e, key) {
        e.preventDefault()
        if (key == 'DeletePost') {
            const ruteDB = `${topic}/Posts/PostImage_${i}`
            console.log(ruteDB)
            removeData(ruteDB, setUserData, setUserSuccess)
            close(null)
        }
    }

    return (
        <div className={style.containerEditor}>
            <div className={style.containerForm}>
                <span className={style.close} onClick={() => close(null)}>X</span>
                {carpeta == 'Post' &&
                    <form className={style.formSelectPost}>
                        <label htmlFor={`${topic}-PostConfig`} className={style.label} >Seleccionar Post </label>
                        <img className={style.previewIMG} style={{ objectPosition: `${data.objectPositionPost ? data.objectPositionPost : userDB[topic]["Posts"][`PostImage_${i}`].objectFit} ` }} src={urlPostImage == null ? postsIMG[`${topic}/PostImage_${i}`] : urlPostImage} alt="" />
                        <input type="file" id={`${topic}-PostConfig`} className={style.inputFile} name={`PostImage`} onChange={manageInputIMGSetting} accept=".jpg, .jpeg, .png, .mp4, webm" />
                        <input type="text" placeholder='Descripción' name="descriptionPost" defaultValue={userDB[topic]["Posts"][`PostImage_${i}`].description} onChange={handlerEventChange} />
                        <input type="text" placeholder='Enlace' name="enlacePost" defaultValue={userDB[topic]["Posts"][`PostImage_${i}`].enlace} onChange={handlerEventChange} />
                        <div className={style.radioInputs}>
                            <input type="radio" value="left" name="objectPositionPost" onChange={handlerEventChange} /> ⇦
                            <input type="radio" value="top" name="objectPositionPost" onChange={handlerEventChange} /> ⇧
                            <input type="radio" value="center" name="objectPositionPost" onChange={handlerEventChange} /> c
                            <input type="radio" value="bottom" name="objectPositionPost" onChange={handlerEventChange} /> ⇩
                            <input type="radio" value="right" name="objectPositionPost" onChange={handlerEventChange} /> ⇨
                        </div>
                        <Button style="buttonMiniSecondary" click={(e) => saveConfig(e, "SavePost")}>Guardar</Button>
                        <br />
                        <Button style="buttonMiniSecondary" click={(e) => remove(e, "DeletePost")}>Eliminar</Button>
                    </form>}



                  
                {userDB && postsIMG && carpeta === "BannerTop" && <FormAddsC ruteDB={`${topic}/${carpeta}`} ruteSTG='Banners' id={`BP${item}`} title={`Seleccionar Banner Cabecera`} i={i} carpeta={carpeta} dataDB={userDB[topic][`${carpeta}`][i]} dataSTG={postsIMG[`Banners/${i}`]} close={close} />}

                {userDB && postsIMG && carpeta === "BannerBottom" && <FormAddsC ruteDB={`${topic}/${carpeta}`} ruteSTG='Banners' id={`BP${item}`} title={`Seleccionar Banner Pie`} i={i} carpeta={carpeta} dataDB={userDB[topic][`${carpeta}`][i]} dataSTG={postsIMG[`Banners/${i}`]} close={close} />}

                {userDB && postsIMG && carpeta === "BannerPortada" && <FormAddsC ruteDB={`${carpeta}${item}`} ruteSTG='Banners' id={`BP${item}`} title={`Seleccionar Banner Portada ${item}`} i={i} carpeta={carpeta} dataDB={userDB[`${carpeta}${item}`][i]} dataSTG={postsIMG[`Banners/${i}`]} close={close} />}

                {userDB && postsIMG && carpeta === "BannerIzquierdo" && <FormAddsC ruteDB={`${carpeta}${item}`} ruteSTG='Banners' id={`BP${item}`} title={`Seleccionar Banner Izquierdo ${item}`} i={i} carpeta={carpeta} dataDB={userDB[`${carpeta}${item}`][i]} dataSTG={postsIMG[`Banners/${i}`]} close={close} />}

                {userDB && postsIMG && carpeta === "BannerDerecho" && <FormAddsC ruteDB={`${carpeta}${item}`} ruteSTG='Banners' id={`BP${item}`} title={`Seleccionar Banner Derecho ${item}`} i={i} carpeta={carpeta} dataDB={userDB[`${carpeta}${item}`][i]} dataSTG={postsIMG[`Banners/${i}`]} close={close} />}
             
                    </div>
        </div>
    )
}



