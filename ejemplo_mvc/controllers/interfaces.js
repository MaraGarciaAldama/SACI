const dbo = require("../models/dbo");

// devuelva la lista de interfaces
exports.index = async (req, res) => {
  try {
    const db = dbo.getDb();
    const interfaces = await db.collection("interfaces")
    .find({})
    .toArray();

    res.json(interfaces);

  } catch(error) {
    console.error(error);
    return res.status(503)
    .json({
      message: `Error al leer la lista de interfaces: ${error.message}`,
    });
  }
};
