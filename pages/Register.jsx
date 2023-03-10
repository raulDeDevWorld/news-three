import { onAuth, signUpWithEmail, writeUserData } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/Context'

import Image from 'next/image'
import { WithAuth } from '../HOCs/WithAuth'
import Button from '../components/Button'
import Error from '../components/Error'
import style from '../styles/Login.module.css'
import Link from 'next/link'

function Register() {
    const { user, userDB, setUserProfile, setUserSuccess, success, setUserData, postsIMG, setUserPostsIMG, monthAndYear } = useUser()
    const router = useRouter()

    const [perfil, setPerfil] = useState(null);
    const [name, setName] = useState(null);

    function save(e) {
        e.preventDefault()
        if (perfil == null || name == null || name == '') {
            setUserSuccess('complete')
            return
        }
        const fileName = user.uid
        const file = perfil.file
        const object = {
            [fileName]: {name, rol: 'periodista'} }
        const ruteDB = 'users'
        writeUserData(ruteDB, object, setUserSuccess)
        uploadIMG(ruteDB, fileName, file, null, monthAndYear)
    }

    console.log(userDB)

    function handlePerfilImg(e) {
        console.log('hello')
        const file = e.target.files[0]
        const url = (URL.createObjectURL(file))
        setPerfil({ url, file })
    }

    function handlePerfilName(e) {
        const name = e.target.value
        setName(name)
    }


    useEffect(() => {
        const uid = userDB.users ? user.uid in userDB.users : false

        if (user && userDB.users && uid) {
            router.replace('/Admin')
            return
        }

    }, [user, perfil, userDB]); 
    return (
        <div className={style.container}>
            <header className={style.header}>INICIO DE SESION PERIODICO HOY</header>
            <main className={style.main}>
                <Image src="/logo.png" width="350" height="150" alt="User" />
                <br />
                <form className={style.form}>
                    <h4 className={style.subtitle}>Regitro de Usuario</h4>
                    <input className={style.input} type="text" onChange={handlePerfilName} placeholder="Nombres y apellidos" />
                    <label htmlFor="inputFile" className={style.label}> Subir Perfil Personal</label>
                    <input className={style.inputFile} id='inputFile' type="file" onChange={handlePerfilImg} placeholder="contraseña" accept=".jpg, .jpeg, .png"/>
                    <img src={perfil ? perfil.url : '/User.svg'} className={style.perfil} alt="Perfil" />
                    <div className={style.buttonsContainer}>
                        <Button style='buttonSecondary' click={save}>Registrate</Button>
                    </div>
                </form>
            </main>
            {success == false && <Error>ERROR: verifique e intente nuevamente</Error>}
            {success == 'complete' && <Error>Llene todo el formulario</Error>}
        </div>
    )
}

export default WithAuth(Register)
