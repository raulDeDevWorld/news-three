import { useUser } from '../context/Context.js'
import styles from '../styles/Plantillas.module.css'

function Post({topic, post1, post2, post3, post4, post5, post6}) {
    const { userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG } = useUser()

    return (
        <section className={styles.section} id={topic}>
            {topic != "inicio" && <div className={styles.containerSubtitle}><h4 className={styles.subtitle}>{topic.toUpperCase()}</h4></div>}            
            {postsIMG[`${topic}-bannerTop`] && <div className={styles.banner}>
                <img src={postsIMG[`${topic}-bannerTop`]} alt="Vercel Logo" />
            </div>}
            <div className={styles.gridThree}>
                <div><img src={post1} /></div>
                <div><img src={post2} /></div>
                <div><img src={post3} /></div>
                <div><img src={post4} /></div>
                <div><img src={post5} /></div>
                <div><img src={post6} /></div>

            </div>
            {postsIMG[`${topic}-bannerBottom`] && <div className={styles.banner}>
                <img src={postsIMG[`${topic}-bannerBottom`]} alt="Vercel Logo" />
            </div>}
        </section>
    )
}
export default Post