import { useUser } from '../context/Context.js'
import { useState, useEffect } from 'react'
import Banner from './Banner'
import Modal from './Modal'
import { downloadIMG } from '../firebase/storage'
import styles from '../styles/Template.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'


function TemplateSix({ color, topic, post1, post2, post3, post4, post5, post6,
    description1, description2, description3, description4, description5, description6,
    objectPosition1, objectPosition2, objectPosition3, objectPosition4, objectPosition5, objectPosition6 }) {

    const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, monthAndYear } = useUser()
    const router = useRouter()
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']


    const [elements, setElements] = useState(false)
    const [dataForDate, setDataForDate] = useState([])
    const [dataEditor, setDataEditor] = useState(null)

    function setPostsElements() {
        setElements(!elements)
    }

    function handlerClickEnlace(info) {
        router.pathname != "/Admin" && info.i !== undefined && router.push("/" + userDB[topic]["Posts"][`PostImage_${info.i}`])
        router.pathname == "/Admin" && setDataEditor(info)
    }

    useEffect(() => {
        userDB[topic] && userDB[topic]["Posts"] && setDataForDate(Object.keys(userDB[topic]["Posts"]).map(i => { const newI = i.split('_'); return newI[1] }).sort((a, b) => b - a))
    }, [userDB, postsIMG]);
    return (
        <section className={styles.section} id={topic} style={{backgroundColor: color}}>
            {topic != "Inicio" && <div className={styles.containerSubtitle}><h4 className={styles.subtitle}>{topic == 'GestionDeGobierno' ? 'GESTIÓN DE GOBIERNO':topic.toUpperCase()}</h4></div>}

            {userDB[topic]["BannerTop"] && <Banner ruta={topic} carpeta="BannerTop" click={handlerClickEnlace}></Banner>}

            {topic != "Inicio" && <button className={styles.buttonSeeAll} onClick={setPostsElements}>Ver todo</button>
            }

            <div className={`${styles.gridSeven} ${elements == true && styles.allVisible}`} style={{backgroundColor: color}}>

                {userDB && dataForDate.length > 0 && dataForDate.map((i, index) =>
                    userDB[topic]["Posts"] && userDB[topic]["Posts"][`PostImage_${i}`] && <div key={index} >

                        {userDB[topic]["Posts"][`PostImage_${i}`]['content'] ? '' : <span className={styles.inDevelop}>{router.pathname !== "/Admin" && ''}</span>} 
                        {router.pathname == "/Admin" && <span className={styles.datePost} onClick={() => handlerClickEnlace({ i, carpeta: 'Post' })}>{`${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getDate()}-${months[new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMonth()]} ${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getHours()}:${new Date(userDB[topic].Posts[`PostImage_${i}`].fecha).getMinutes()}`}</span>}

                        <Link href={userDB[topic]["Posts"][`PostImage_${i}`]['enlace']} legacyBehavior>
                            <a target={userDB[topic]["Posts"][`PostImage_${i}`]['enlace'].includes('http') ? '_blanck' : ''}><img src={postsIMG[`${topic}/PostImage_${i}`]} style={{ objectPosition: `${userDB[topic]["Posts"][`PostImage_${i}`]['objectFit']}` }} /></a>
                        </Link>

                        {userDB[topic]["Posts"][`PostImage_${i}`]['description'] && <p className={styles.description}>{userDB[topic]["Posts"][`PostImage_${i}`]['description']}</p>}
                    </div>

                )}

            </div>

            {dataEditor && <Modal topic={topic} carpeta={dataEditor.carpeta}  i={dataEditor.i} close={handlerClickEnlace} ></Modal>}
            {dataEditor && <Modal rute={topic} carpeta={dataEditor.carpeta}  i={dataEditor.i} close={handlerClickEnlace} ></Modal>}
        </section>
    )
}
export default TemplateSix 