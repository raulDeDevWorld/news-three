import { useState } from 'react'
import style from '../styles/Mode.module.css'

export default function Error(props) {

    const [months, setMonths] = useState(['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'])
    const [days, setDays] = useState(['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'])
    const date = new Date();
    
    return (
        <span className={style.date}>{days[date.getDay()] + ', ' + date.getDate() + ' de ' + months[date.getMonth()] + ' de ' + date.getUTCFullYear()}</span>
    )
}