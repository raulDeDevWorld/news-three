import { useRouter } from 'next/router'
import style from '../styles/Mantenimiento.module.css'

export default function Mantenimiento(props) {

    const router = useRouter()

    function whatsappClickHandler () {
        router.push("https://api.whatsapp.com/send?phone=+59160589090&text=Buenas%20Hoy...")
    }
    return (
        <div className={style.container}>
            <video
                muted
                autoPlay={"autoplay"}
                preload="auto"
                loop
                className={style.video}>
                <source src="/video.mp4" type="video/mp4" />
            </video>
            <img className={style.img} src="/mantenimiento.png" alt="Mantenimiento" />
            <img className={style.whatsapp} src="/SocialMedia/whatsapp.svg" onClick={whatsappClickHandler} alt="Whatsapp Logo" />
        </div>
    )
}