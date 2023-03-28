import { months } from "./sortRegisters"

export const formatter = (indate, mode = true) => {
    const begin = {
        "isDate": indate instanceof Date && !isNaN(indate.valueOf()),
        "noNull": indate ? true : false
    }
    const date = begin.isDate && begin.noNull ? indate : new Date(Date.now())
    const padtwo = num => num.toString().padStart(2, '0')
    try {
        if (mode) {
            const fullDate = date.toLocaleDateString()
            const dateReve = fullDate.split('/').reverse()
            const datePadd = dateReve.map(padtwo).join('-')
            const fullTime = date.toTimeString().split(' ')
            return `${datePadd} ${fullTime[0]}`
        } else {
            const allDates = [date.getFullYear(), date.getMonth(), date.getDate()]
            const [year, month, day] = allDates.map(d => Number(padtwo(d)))
            return { year, month, day, monthName: months[month] }
        }
    } catch (error) {
        return
    }
}

//Original func from Borislav Hadzhiev on https://bobbyhadz.com/

/*
function formatDate({}){
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join('-') +
        ' ' +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(':')
    )
}
*/