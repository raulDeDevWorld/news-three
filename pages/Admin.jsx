import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { useUser } from '../context/Context.js'
import { WithAuth } from '../HOCs/WithAuth'
import Button from '../components/Button'
import Success from '../components/Success'
import Error from '../components/Error'
import Layout from '../layout/Layout'

import BannerLeft from '../components/BannerLeft'
import BannerRight from '../components/BannerRight'
import Modal from '../components/Modal'

import Section from '../components/Section'
import Date from '../components/Date'
import Header from '../components/Header'

import styles from '../styles/Home.module.css'
import { handleSignOut } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function Admin() {
  const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, setUserDate, viewPeriodista, setUserViewPeriodista } = useUser()
  const router = useRouter()


  //console.log(postsIMG)

  function handlerUploadFile(e, fileName) {
    const file = e.target.files[0]
    uploadIMG(file, fileName, setUserSuccess, postsIMG, setUserPostsIMG)
  }

  const [elements, setElements] = useState(false)
  const [dataForDate, setDataForDate] = useState([])
  const [dataEditor, setDataEditor] = useState(null)

  function setPostsElements() {
    setElements(!elements)
  }


  function handlerLogout(e) {
    handleSignOut()
    router.push("/Login")

  }

  function dateEvent(e) {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

    console.log(e.target.value)
    const format = e.target.value.split("-")
    console.log(format)
    setUserDate(`${parseInt(format[2])}-${months[format[1] - 1]}-${format[0]}`)

  }
  function handlerViewPeriodista() {
    setUserViewPeriodista(!viewPeriodista)
  }
  // console.log(user.uid)
  function handlerClickEnlace(i) {
    router.pathname != "/Admin" && router.push("/" + userDB[topic]["Posts"][`PostImage_${i}`])
    router.pathname == "/Admin" && setDataEditor(i)
  }
  useEffect(() => {

    if (userDB.users && userDB.users[user.uid] == undefined) {
      router.replace('/Register')
      return
    }
  }, [userDB]);

  return (
    <Layout>
        <main className={styles.main}>
          <div className={styles.containerLogout}>
            <span> <img src={postsIMG[`users/${user.uid}`]} className={styles.perfilIMG} alt="" />Bienvenido {userDB.users && userDB.users[user.uid] && userDB.users[user.uid].name} </span>
            <Button style="buttonPrimary" click={handlerLogout}>Logout</Button>
          </div>
          <Header></Header>
          <Section topic="Inicio" publicView={false} color='#8FC2C9'></Section>
          <Section topic="Sociedad" publicView={false} color='#c98f8f'></Section>
          <Section topic="Salud" publicView={false} color='#8FC2C9'></Section>
          <Section topic="Seguridad" publicView={false} color='#c98f8f'></Section>
          <Section topic="Politica" publicView={false} color='#8FC2C9'></Section>
          <Section topic="Economia" publicView={false} color='#c98f8f'></Section>
          <Section topic="Deportes" publicView={false} color='#8FC2C9'></Section>
          <Section topic="GestionDeGobierno" publicView={false} color='#c98f8f'></Section>
          <Section topic="Cultura" publicView={false} color='#8FC2C9'></Section>
          <Section topic="Internacional" publicView={false} color='#c98f8f'></Section>
          <Section topic="Empresarial" publicView={false} color='#8FC2C9'></Section>
          {userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol === 'admin' && <button className={styles.viewPeriodista} onClick={handlerViewPeriodista}>P</button>}
        </main>
   

      {dataEditor && <Modal post={dataEditor.key} topic={'/'} i={dataEditor.i} close={handlerClickEnlace}></Modal>}
        {success === "CompleteFORM" && <Error>Complete el formulario...</Error>}
        {success === "CompleteFechaInit" && <Error>Complete la fecha de inicio...</Error>}
        {success === "CompleteFechaFinish" && <Error>Complete la fecha final...</Error>}
        {success === "CompleteIMG" && <Error>Añade una imagen...</Error>}
        {success == "Cargando" && <Success>Cargando...</Success>}
        {success == "save" && <Success>Cargando...</Success>}

    </Layout>
  )
}

export default WithAuth(Admin) 









