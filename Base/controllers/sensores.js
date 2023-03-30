const { ObjectId } = require("mongodb");
const dbo = require("../models/connection");

exports.index = async (req, res) => {
    try{
        const db = dbo.getDb();
        const interfaces = await db.collection("sensors")
        .find()
        .toArray();

        res.json(interfaces);
    }    catch(error){
        console.error(error);
        return res.status(503)
        .json({
            message: `Error al leer la lista de interfacez: ${error.message}`
        })
    }
}

exports.add = async (req, res) => {
    try{
        const db = dbo.getDb();
        const interfaces = await db.collection("sensors");
       
        const {name, description, interface, area, module, min, max, type_measurement, manipulated, status} = req.body;
        const dato = await interfaces.insertOne({
            name, description, interface, area, module, min, max, type_measurement, manipulated, status
        });

        res.json({
            message: 'El producto fue creado correctamente.',
            dato
        });


    }    catch(error){
        console.error(error);
        return res.status(503)
        .json({
            message: `Error al leer la lista de interfacez: ${error.message}`,
        });
    }
}

exports.show = async (req, res) => {
    const db = dbo.getDb();
    let collection = await db.collection("sensors");
    let query = {_id: ObjectId(req.params.id)};
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
}

exports.update = async (req, res) => {
    try {
        const db = dbo.getDb();
        const update = {$set:{name: req.body.name, description: req.body.description, interface: req.body.interface, area: req.body.area, module: req.body.module, min: req.body.min, max: req.body.max, type_measurement: req.body.type_measurement, manipulated: req.body.manipulated, status: req.body.status}};
        const modules = await db.collection("sensors")
        .updateOne({
            _id: new ObjectId(req.params.id)
        },update)

        res.json({
            mesage: "El modulo fue actualizado",
            modules
        }
        );
    } catch(error) {
        console.error(error);
        return res.status(503)
        .json({
            mesage: `Error al actualizar el modulo ${error.message}`
        });
    }
  };