import style from '../styles/Button.module.css'

export default function Button (props) {
    return (
             <button 
                className={`${style.button} ${style[props.style]}`}
                onClick={props.click}>
                {props.children}
            </button>
    )
}
