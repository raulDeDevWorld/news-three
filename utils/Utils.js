function getDayMonthYear (setUserDayMonthYear) {

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const date = new Date();
    
    return setUserDayMonthYear ? setUserDayMonthYear(`${date.getDate()}-${months[date.getMonth()]}-${date.getUTCFullYear()}`) : `${date.getDate()}-${months[date.getMonth()]}-${date.getUTCFullYear()}`
    
}


function getDate (setUserDate) {

    const date = Date();
    
    return setUserDate ? setUserDate(`${date}`) : date

}


function getMonthAndYear (setUserMonthAndYear) {

    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    const date = new Date();
    
    return setUserMonthAndYear ? setUserMonthAndYear(`${months[date.getMonth()]}-${date.getUTCFullYear()}`) : `${months[date.getMonth()]}-${date.getUTCFullYear()}`
    
}

export {getDate, getDayMonthYear, getMonthAndYear}