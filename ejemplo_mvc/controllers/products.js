const { ObjectId } = require("mongodb");
const dbo = require("../models/dbo");

exports.indexView = async (req, res) => {
  const db = dbo.getDb();
  const products = await db.collection("products")
  .find({})
  .toArray();

  // retornar la vista para listar productos
  res.render('products/index', 
    {
      products
    }
  );
}

// devuelva la lista de products
exports.index = async (req, res) => {
  try {
    const db = dbo.getDb();
    const products = await db.collection("products")
    .find({})
    .toArray();

    res.json(products);

  } catch(error) {
    return res.status(503)
    .json({
      message: `Error al leer la lista de productss: ${error.message}`,
    });
  }
};

exports.addForm = async (req, res) => {
  // retornar la vista para agregar producto
  res.render('products/add', 
    {
    }
  );
}

exports.add = async (req, res) => {
  try {
    const db = dbo.getDb();
    const productsCollection = await db.collection("products");
    // extraer los datos del producto
    const { name, description, price } = req.body;
    console.log(req.body);
    
    const product = await productsCollection.insertOne({
      name,
      description,
      price
    });

    res.json({
      message: 'El producto fue creado correctamente.',
      product,
    });
  } catch(error) {
    return res.status(503)
    .json({
      message: `Error al registrar producto: ${error.message}`,
    });
  }
};

exports.show = async (req, res) => {
  try {
    const db = dbo.getDb();
    const product = await db.collection("products")
    .findOne({
      _id: new ObjectId(req.params.id)
    });

    res.json(product);
  } catch(error) {
    return res.status(503)
    .json({
      message: `Error al leer el producto: ${error.message}`,
    });
  }
};

exports.update = async (req, res) => {
  try {
    // validar id
    if (!req.params.id || req.params.id.length !== 24) {
      return res.status(400).json({
        message: 'ID inválido',
      });
    }

    const db = dbo.getDb();
    const productsCollection = await db.collection("products");
    // extraer los datos del producto
    const { name, description, price } = req.body;

    // query de condición
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: { name, description, price }
    };

    const result = await productsCollection.updateOne(query, updates);
    res.json({
      message: 'El producto fue actualizado correctamente.'
    });
  } catch(error) {
    return res.status(503)
    .json({
      message: `Error al actualizar producto: ${error.message}`,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    // validar id
    if (!req.params.id || req.params.id.length !== 24) {
      return res.status(400).json({
        message: 'ID inválido',
      });
    }

    const db = dbo.getDb();
    const productsCollection = await db.collection("products");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await productsCollection.deleteOne(query);
    res.json({
      message: 'El producto fue eliminado correctamente.'
    });
  } catch(error) {
    console.error(error);
    return res.status(503)
    .json({
      message: `Error al eliminar producto: ${error.message}`,
    });
  }
};
