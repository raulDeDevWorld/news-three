import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import style from '../styles/Content.module.css'


export default function View ({textEditor}) {

    const {user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date } = useUser()


    return (
        <div className={`${style.qlEditor} ql-editor`}  >
                {parse(`${textEditor}`)}
             
        </div>
    )
}



