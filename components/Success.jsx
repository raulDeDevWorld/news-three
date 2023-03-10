import style from '../styles/Mode.module.css'

export default function Success (props) {
    return (
        <span className={style.success}>{props.children}</span>
    )
}