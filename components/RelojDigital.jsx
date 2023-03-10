import style from '../styles/RelojDigital.module.css'
import cargarReloj from '../utils/Reloj'
import { useEffect, useState } from 'react'

export default function Time() {

    const [time, setTime] = useState(null);

    useEffect(() => {
        setInterval(() => {
            const newTime = cargarReloj()
            setTime(newTime)
        }, 1000)
    }, [time]);

    return (
   
        <span className={style.time}>{time}</span>

      
    )
}