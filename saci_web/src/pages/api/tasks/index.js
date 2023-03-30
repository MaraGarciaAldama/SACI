import { formatter } from "@/utils/dateformat"
import { connex } from "@/models/dbconn"

const handeling = async (req, res) => {
    const { method, body: { title, description } } = req
    const { collection } = await connex()
    switch (method) {
        case "GET":
            try {
                const tasks = await collection.find().toArray()
                return res.status(200).json(tasks)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        case "POST":
            try {
                const createdAt = formatter()
                const updatedAt = formatter()
                const taskbody = { title, description, createdAt, updatedAt }
                const newtask = await collection.insertOne(taskbody)
                return res.status(201).json(newtask)
            } catch (error) {
                return res.status(500).json({ error: error.message })
            }
        default:
            return res.status(405).json({ msj: "No support for this method" })
    }
}

export default handeling