import { useUser } from '../context/Context.js'
import { useState, useEffect } from 'react'
import Banner from './Banner'
import Modal from './Modal'
import { downloadIMG } from '../firebase/storage'
import styles from '../styles/Template.module.css'
import { useRouter } from 'next/router'
import Link from 'next/link'



function Template ({ color, topic }) {
    
    const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, monthAndYear } = useUser()
    const router = useRouter()
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    

    const [elements, setElements] = useState(false)
    const [dataForDate, setDataForDate] = useState([])
    const [dataEditor, setDataEditor] = useState(null)

    function setPostsElements() {
        setElements(!elements)
    }

    function handlerClickEnlace(i) {
        router.pathname != "/Admin" && router.push("/" + userDB[topic]["Posts"][`PostImage_${i}`])
        router.pathname == "/Admin" && setDataEditor(i)
    }

    useEffect(() => {
        userDB[topic] && userDB[topic]["Posts"] && setDataForDate(Object.keys(userDB[topic]["Posts"]).map(i => { const newI = i.split('_'); return new Date(newI[1]) }).sort((a, b) => b - a))
    }, [userDB, postsIMG]);
    return (
        <section className={styles.section} id={topic} style={{backgroundColor: color}}>
            {topic != "Inicio" && <div className={styles.containerSubtitle}><h4 className={styles.subtitle}>{topic == 'GestionDeGobierno' ? 'GESTIÓN DE GOBIERNO':topic.toUpperCase()}</h4></div>}

            {userDB[topic]["BannerTop"] && <Banner ruta={topic} carpeta="BannerTop" click={handlerClickEnlace}></Banner>}

            {topic != "Inicio" && <button className={styles.buttonSeeAll} onClick={setPostsElements}>Ver todo</button>}

            <div className={`${styles['gridThreeB']} ${elements == true && styles.allVisible}`}>

            {userDB && dataForDate.length > 0 && dataForDate.map((i, index) =>
                    userDB[topic]["Posts"] && userDB[topic]["Posts"][i] && <div key={index} >

                        {userDB[topic]["Posts"][i]['content'] ? '' : <span className={styles.inDevelop}>{router.pathname !== "/Admin" && ''}</span>} 
                        {router.pathname == "/Admin" && <span className={styles.datePost} onClick={() => handlerClickEnlace({ i, carpeta: 'Post' })}>{`${i.getDate()}-${months[i.getMonth()]} ${i.getHours()}:${i.getMinutes()}`}</span>}

                        <Link href={userDB[topic]["Posts"][i]['enlace']} legacyBehavior>
                            <a target={userDB[topic][i]['enlace'].includes('http') ? '_blanck' : ''}><img src={postsIMG[i]} style={{ objectPosition: `${userDB[topic]["Posts"][i]['objectFit']}` }} /></a>
                        </Link>

                        {userDB[topic]["Posts"][i]['description'] && <p className={styles.description}>{userDB[topic]["Posts"][i]['description']}</p>}
                    </div>
                )}
            </div>

            {userDB[topic]["BannerBottom"] && <Banner ruta={topic} carpeta="BannerBottom" click={handlerClickEnlace} ></Banner>}
            
            {dataEditor && <Modal topic={topic} carpeta={dataEditor.carpeta}  i={dataEditor.i} close={handlerClickEnlace} ></Modal>}

        </section>
    )
}
export default Template