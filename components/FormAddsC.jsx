import { writeUserData, getData,  removeData } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useUser } from '../context/Context.js'
import Button from './Button'
import Error from './Error'
import style from '../styles/FormAddsC.module.css'
import { useState } from 'react'
import { getDate, getDayMonthYear, getMonthAndYear } from '../utils/Utils'
import imageCompression from 'browser-image-compression';


export default function Form({ id, ruteDB, ruteSTG, title, i, carpeta, dataDB, dataSTG , close}) {
    const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, monthAndYear, dayMonthYear } = useUser()

    const [data, setData] = useState({})

    const [localFile, setLocalFile] = useState(null)
    const [localFileURL, setLocalFileURL] = useState(null)

    function handlerEventChange(e) {
        const name = e.target.name
        const value = e.target.value
        const object = { [name]: value }
        setData({ ...data, ...object })
    }

    function handlerInputFile(e) {
        const file = e.target.files[0]

        setLocalFile(file)
        setLocalFileURL(URL.createObjectURL(file))
    }

    function save(e, key) {
        e.preventDefault()
        console.log(ruteDB)
        const monthYear = monthAndYear ? monthAndYear : getMonthAndYear()
        const newDate = new Date()
        if (userDB && postsIMG && i) {

            const key = i
            const object = { [key]: { whatsapp: data[`${id}-whatsapp`] ? data[`${id}-whatsapp`] : dataDB.whatsapp, enlace: data[`${id}-enlace`] ? data[`${id}-enlace`] : dataDB.enlace, dateInit: data[`${id}-dateInit`] ? data[`${id}-dateInit`] : dataDB.dateInit, dateFinish: data[`${id}-dateFinish`] ? data[`${id}-dateFinish`] : dataDB.dateFinish } }
            writeUserData(ruteDB, object, setUserSuccess, setUserData)
            localFile && uploadIMG(ruteSTG, key, localFile, setUserSuccess, monthYear)

        } else {
            if (localFile && data[`${id}-dateInit`] && data[`${id}-dateFinish`]) {
                const key = newDate.getTime()
                const object = { [key]: { whatsapp: data[`${id}-whatsapp`] ? data[`${id}-whatsapp`] : '', enlace: data[`${id}-enlace`] ? data[`${id}-enlace`] : '', dateInit: data[`${id}-dateInit`], dateFinish: data[`${id}-dateFinish`] } }
                writeUserData(ruteDB, object, setUserSuccess, setUserData)
                uploadIMG(ruteSTG, key, localFile, setUserSuccess, monthYear)
            } else {
                setUserSuccess("CompleteFORM")
                data.dateInitBannerTop && data.dateFinishBannerLeft && bannerLeftImage == undefined && setUserSuccess("CompleteIMG")
            }
        }

    }


    function remove (e) {
        e.preventDefault()
        removeData(ruteDB, setUserData, setUserSuccess)
        close(null)
    }

    return (

        <>

            {userDB && postsIMG && i ? <form className={style.formSelectAdds}>

                <label for={`for${id}`} className={style.label} >{title}</label>
                <input type="file" id={`for${id}`} className={style.inputFile} name={id} onChange={handlerInputFile} accept=".jpg, .jpeg, .png, .mp4, webm, .gif" />
                <img className={style.previewIMGBanner} src={localFileURL ? localFileURL : dataSTG} alt="" />
                <p className={`${style.require} ${localFileURL ? style.green : ''}`}>{localFileURL ? 'Correcto' : '*Requerido'}</p>

                <input type="text" placeholder='Enlace' name={`${id}-enlace`} defaultValue={data.enlace ? data.enlace : dataDB.enlace} onChange={handlerEventChange} />
                <input type="text" placeholder='Whatsapp' name={`${id}-whatsapp`} defaultValue={data.whatsapp ? data.whatsapp : dataDB.whatsapp} onChange={handlerEventChange} />

                <input className={style.calendario} type="date" id="start" name={`${id}-dateInit`} onChange={handlerEventChange} />
                <p className={`${style.require} ${data[`${id}-dateInit`] ? style.green : ''}`}>{data[`${id}-dateInit`] ? 'Correcto' : '*Requerido'}</p>

                <input className={style.calendario} type="date" id="start" name={`${id}-dateFinish`} onChange={handlerEventChange} />
                <p className={`${style.require} ${data[`${id}-dateFinish`] ? style.green : ''}`}>{data[`${id}-dateFinish`] ? 'Correcto' : '*Requerido'}</p>

                <Button style="buttonMiniSecondary" click={(e) => save(e, id)}>Guardar</Button> 
                <br />
                <Button style="buttonMiniSecondary" click={(e) => remove(e, id)}>Eliminar</Button>

            </form> :
                <form className={style.formSelectAdds}>

                    <label for={`for${id}`} className={style.label} >{title}</label>
                    <input type="file" id={`for${id}`} className={style.inputFile} name={id} onChange={handlerInputFile} accept=".jpg, .jpeg, .png, .mp4, webm, .gif" />
                    <img className={style.previewIMGBanner} src={localFileURL} alt="" />
                    <p className={`${style.require} ${localFileURL ? style.green : ''}`}>{localFileURL ? 'Correcto' : '*Requerido'}</p>

                    <input type="text" placeholder='Enlace' name={`${id}-enlace`} onChange={handlerEventChange} />
                    <input type="text" placeholder='Whatsapp' name={`${id}-whatsapp`} onChange={handlerEventChange} />

                    <input className={style.calendario} type="date" id="start" name={`${id}-dateInit`} onChange={handlerEventChange} />
                    <p className={`${style.require} ${data[`${id}-dateInit`] ? style.green : ''}`}>{data[`${id}-dateInit`] ? 'Correcto' : '*Requerido'}</p>

                    <input className={style.calendario} type="date" id="start" name={`${id}-dateFinish`} onChange={handlerEventChange} />
                    <p className={`${style.require} ${data[`${id}-dateFinish`] ? style.green : ''}`}>{data[`${id}-dateFinish`] ? 'Correcto' : '*Requerido'}</p>

                    <Button style="buttonMiniSecondary" click={(e) => save(e, id)}>Guardar</Button>
                </form>
            }
        </>
    )
}









