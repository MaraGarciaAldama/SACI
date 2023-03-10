import { formatter } from "@/utils/dateformat"
import { connex } from "@/utils/dbconn"

const handeling = async (req, res) => {
    const { method, body } = req
    const { collection } = await connex(process.env.SDB, process.env.SREGS)
    switch (method) {
        case "GET":
            try {
                const tasks = await collection.find().sort({ createdAt: -1 }).toArray()
                return res.status(200).json(tasks)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "POST":
            try {
                if (body instanceof Array) {
                    if (body.length === 0) return res.status(400).json({ msj: "No body provided" })
                    const newtask = await collection.insertMany(body)
                    return res.status(201).json(newtask)
                }
                const createdAt = formatter()
                const updatedAt = formatter()
                const taskbody = { ...body, createdAt, updatedAt }
                const newtask = await collection.insertOne(taskbody)
                return res.status(201).json(newtask)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "DELETE":
            try {
                const deletedtask = await collection.deleteMany({})
                return res.status(204).json(deletedtask)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ msj: "No support for this method" })
    }
}

export default handeling
