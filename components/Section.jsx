import { useUser } from '../context/Context'
import TemplateOne from './TemplateOne'
import TemplateThreeA from './TemplateThreeA'
import TemplateThreeB from './TemplateThreeB'
import TemplateFour from './TemplateFour'
import TemplateFive from './TemplateFive'
import TemplateSix from './TemplateSix'
import TemplateSeven from './TemplateSeven'
import TemplateEight from './TemplateEight'
import PostTwo from './PostTwo'
import PostThree from './PostThree'
import Form from './Form'
import { getDate, getDayMonthYear } from "../utils/Utils";


export default function Section({ topic, publicView, color }) {

    const { user, userDB, setUserData, setUserSuccess, success, postsIMG, setUserPostsIMG, date, monthAndYear, dayMonthYear } = useUser()

    //console.log(postsIMG)
    return (
        <>
            {userDB[topic] !== null && publicView == false && <Form topic={topic} value={userDB[`${topic}-${date}`]} color={color}></Form>}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateOne" &&
                <TemplateOne topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateThreeA" &&
                <TemplateThreeA topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateThreeB" &&
                <TemplateThreeB topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == null &&
                <TemplateThreeB topic={topic} color={color} />}   
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateFour" &&
                <TemplateFour topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateFive" &&
                <TemplateFive topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateSix"
                &&
                <TemplateSix topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateSeven"
                &&
                <TemplateSeven topic={topic} color={color} />}
            {userDB
                && userDB[topic]
                && userDB[topic]['Templates']
                && userDB[topic]['Templates'][userDB[topic]['Templates'][dayMonthYear] ? dayMonthYear : getDayMonthYear()] == "TemplateEight"
                &&
                <TemplateEight topic={topic} color={color} />}
        </>
    )
}
