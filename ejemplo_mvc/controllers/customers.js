const dbo = require("../models/dbo");

// devuelva la lista de customers
exports.index = async (req, res) => {
  try {
    const db = dbo.getDb();
    const customers = await db.collection("customers")
    .find({})
    .toArray();

    res.json(customers);

  } catch(error) {
    console.error(error);
    return res.status(503)
    .json({
      message: `Error al leer la lista de customerss: ${error.message}`,
    });
  }
};
