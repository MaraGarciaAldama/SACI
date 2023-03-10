export const formatter = indate => {
  const begin = {
    "isDate": indate instanceof Date && !isNaN(indate.valueOf()),
    "noNull": indate ? true : false
  }
  const date = begin.isDate && begin.noNull ? indate : new Date(Date.now())
  const padtwo = num => num.toString().padStart(2, '0')
  try {
    const fullDate = date.toLocaleDateString()
    const dateReve = fullDate.split('/').reverse()
    const datePadd = dateReve.map(padtwo).join('-')
    const fullTime = date.toTimeString().split(' ')
    return `${datePadd} ${fullTime[0]}`
  } catch (error) {
    return
  }
}
const RandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const fullyearfiller = () => {
  let count = 0
  let registers = []
  while (count < 200) {
    const mm = RandomInt(0, 11)
    const dd = RandomInt(0, 31)
    const hrss = RandomInt(0, 23)
    const mins = RandomInt(0, 59)
    const secs = RandomInt(0, 59)
    const res = formatter(new Date(new Date(Date.now()).getFullYear(), mm, dd, hrss, mins, secs))
    const register = {
      dist: RandomInt(0, 19),
      temp: RandomInt(0, 19),
      updatedAt: res,
      createdAt: res
    }
    registers.push(register)
    count++
  }
  return registers
}
const filler = () => {
  let count = 0
  let registers = []
  while (count < 200) {
    const mm = RandomInt(0, new Date(Date.now()).getMonth())
    const dd = RandomInt(0, new Date(Date.now()).getDay())
    const hrss = RandomInt(0, new Date(Date.now()).getHours())
    const mins = RandomInt(0, new Date(Date.now()).getMinutes())
    const secs = RandomInt(0, new Date(Date.now()).getSeconds())
    const res = formatter(new Date(new Date(Date.now()).getFullYear(), mm, dd, hrss, mins, secs))
    const register = {
      dist: RandomInt(0, 19),
      temp: RandomInt(0, 19),
      updatedAt: res,
      createdAt: res
    }
    registers.push(register)
    count++
  }
  return registers
}

export default async function handler(req, res) {
  const { body: { typee } } = req
  const registers = typee ? filler() : fullyearfiller()
  try {
    const ress = await fetch('http://localhost:3000/api/saci/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registers)
    })
    const jsno = await ress.json()
    return res.status(201).json({ msj: `Llenado exitoso: ${jsno}` })
  } catch (error) {
    return res.status(500).json({ msj: "Error al llenar" })
  }
}
