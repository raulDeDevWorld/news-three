import Head from 'next/head'
import Image from 'next/image'
import NavbarSimple from '../components/NavbarSimple'
import { useUser } from '../context/Context.js'
import { WithoutAuth } from '../HOCs/WithoutAuth'
import Button from '../components/Button'
import Success from '../components/Success'
import TemplateNota from '../components/TemplateNota'
import Layout from '../layout/Layout'
import TextEditor from '../components/TextEditor'
import { handleSignOut, writeUserData, getSpecificData } from '../firebase/utils'
import { uploadIMG } from '../firebase/storage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import Banner from '../components/Banner'
// import Form from './Form'

import styles from '../styles/Temporal.module.css'


import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('../components/content'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})


function TemplateOne() {
  const [textArea, setTextArea] = useState("");
  const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, specificData, setUserSpecificData } = useUser()
  const [arr, setArr] = useState([0])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [copyrightIMG, setCopyrightIMG] = useState('')

  const [textEditor, setTextEditor] = useState("")

  const [formViewer, setFormViewer] = useState(true)

  const [pluss, setPluss] = useState(false)




  const router = useRouter()

  function handlerOnChange(e) {
    const name = e.target.name
    const value = e.target.value

    name == 'title' ? setTitle(value) : ''
    name == 'description' ? setDescription(value) : ''
    name == 'copyrightIMG' ? setCopyrightIMG(value) : ''






  }
  function handlerTextEditorOnChange(content, delta, source, editor) {
    console.log(editor.getHTML())
    setTextEditor(editor.getHTML())
  }




  function validate() {

    switch (router.query.temporal.slice(0, 2)) {
      case '11':
        return "Inicio"
        break;
      case '12':
        return "Sociedad"
        break;
      case '13':
        return "Salud"
        break;
      case '14':
        return "Seguridad"
        break;
      case '15':
        return "Politica"
        break;
      case '16':
        return "Economia"
        break;
      case '17':
        return "Deportes"
        break;
      case '18':
        return "GestionDeGobierno"
        break;
      case '19':
        return "Cultura"
        break;
      case '20':
        return "Internacional"
        break;
      case '21':
        return "Deportes"
        break;
      case '22':
        return "Empresarial"
        break;
      default:
        return ''
    }
  }


  function save(e, st) {

    const ruteDB = `${validate()}/Posts/PostImage_${router.query.temporal.slice(2)}`
    const objectDB = {
      title: title ? title : '',
      description: description ? description : '',
      copyrightIMG: copyrightIMG ? copyrightIMG : '',
      state: st == 'B' ? 'Borrador' : 'Publicado',
      redactor: user.uid
    }
    const rutePost = `/Posts/PostImage_${router.query.temporal}`
    const objectPost = {
      nota: textEditor,
    }
    writeUserData(ruteDB, objectDB, setUserSuccess, 'save')
    writeUserData(rutePost, objectPost, setUserSuccess, 'save')

return setUserSpecificData({
    ...specificData, [`PostImage_${router.query.temporal}`]: objectPost,
})

  }


  function formViewerHandler() {
    setFormViewer(!formViewer)
  }

  function handlerClickEnlace(info) {
    router.pathname != "/Admin" && info.i !== undefined && router.push("/" + userDB[topic]["Posts"][`PostImage_${info.i}`])
    router.pathname == "/Admin" && setDataEditor(info)
  }


  console.log(specificData && specificData[`PostImage_${router.query.temporal}`] && specificData[`PostImage_${router.query.temporal}`].nota)


  useEffect(() => {
    specificData && specificData[`PostImage_${router.query.temporal}`] && specificData[`PostImage_${router.query.temporal}`].nota
      ? ''
      : getSpecificData(`/Posts/PostImage_${router.query.temporal}`, specificData, setUserSpecificData)
    userDB && userDB[validate()] && setTitle(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].title)
    userDB && userDB[validate()] && setDescription(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].description)
    userDB && userDB[validate()] && setCopyrightIMG(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].copyrightIMG)

    specificData && specificData[`PostImage_${router.query.temporal}`] && specificData[`PostImage_${router.query.temporal}`].nota && setTextEditor(specificData[`PostImage_${router.query.temporal}`].nota)

  }, [specificData, router.query.temporal]);


  // userDB && console.log(userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].nota)
  return (

    <Layout>

      <main className={styles.main}>
        <div>
          <NavbarSimple></NavbarSimple>
        </div>

        <div className={styles.containerBanner}>
          {userDB[validate()] && userDB[validate()]["BannerTop"] && <Banner ruta={validate()} carpeta="BannerTop" click={handlerClickEnlace}></Banner>}
        </div>

        <div className={`${styles.viewer} ${formViewer == false && styles.hideForm}`}>

          <h2 className={styles.title}>{description}</h2>
          <p className={styles.description}>{title}</p>


          <div className={styles.containerIMGCenter}>
            <div className={styles.containerIMG}>
                 <img src={postsIMG[`${validate()}/PostImage_${router.query.temporal.slice(2)}`]} className={styles.image} alt="" />
              <span className={styles.copyrightIMG}>{copyrightIMG}</span>
            </div>
          </div>



          {userDB && userDB[validate()] && userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].state == 'Publicado' || user ?
            <div className={`${styles.qlEditor} `} styles={{ padding: '0', height: '50%' }} >
              <div className={` ql-editor`}>
                {parse(`${textEditor}`)}
              </div>

              {/* {userDB && postsIMG && console.log(`users/${userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor}`)} */}
              <br />
              <div className={styles.perfil}>
                <img src={userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].file} className={styles.perfilIMG} alt="" />
                {userDB.users[userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor] && <p>{userDB.users[userDB[validate()].Posts[`PostImage_${router.query.temporal.slice(2)}`].redactor].name} <br /> Redactor</p>}
              </div>
            </div> : <div>En redacción...</div>
          }
          {formViewer == false ? <span className={styles.formHide} onClick={formViewerHandler}>▷</span> : ''}
        </div>

        <div className={styles.adds}>
          <img src="/publicidad.jpg" alt="" />
        </div>



        {/* editor */}


        {user && <div className={`${styles.viewer} ${formViewer == true && styles.hideForm}`}>


          {/* <Form topic={topic} value={userDB[`${topic}-${date}`]} color={color}></Form> */}





          <label htmlFor="Title" >Titulo</label>
          <input type="text" id="Title" name="description" onChange={handlerOnChange} defaultValue={description} />
          <label htmlFor="Description" >Descripcion</label>
          <input type="text" id="Description" name="title" onChange={handlerOnChange} defaultValue={title} />
          <label htmlFor="Description" >Autor IMG</label>
          <input type="text" id="Description" name="copyrightIMG" onChange={handlerOnChange} defaultValue={copyrightIMG} />


          <h2 className={styles.title}>{description}</h2>
          <p className={styles.description}>{title}</p>

          <div className={styles.containerIMGCenter}>
            <div className={styles.containerIMG}>
                <img src={postsIMG[`${validate()}/PostImage_${router.query.temporal.slice(2)}`]} className={styles.image} alt="" />
              <span className={styles.copyrightIMG}>{copyrightIMG}</span>
            </div>
          </div>
          <div>
            <TextEditor setValue={handlerTextEditorOnChange} value={textEditor ? textEditor : 'nada'}></TextEditor>
          </div>

          <br />

          <div className={styles.buttonsContainer}>
            <Button style="miniButtonPrimary" click={(e) => save(e, 'B')}> Guardar/Borrador</Button>
            <Button style="miniButtonPrimary" click={(e) => save(e, 'P')}> Publicar</Button>
          </div>
        </div>}
        {user && <span className={styles.formViewer} onClick={formViewerHandler}>▷</span>}
        <TemplateNota topic={validate()} publicView={true} banner='none'></TemplateNota>

      </main>

      <br />
      {success == "save" && <Success>Cargando...</Success>}

    </Layout>
  )
}
export default WithoutAuth(TemplateOne)




