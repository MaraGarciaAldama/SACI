const express = require('express');
const router = express.Router();

// importar los controladores
const indexController = require('../controllers/index');
const productsController = require('../controllers/products');
const interfacesController = require('../controllers/interfaces');
const customersController = require('../controllers/customers');
const reportesController = require('../controllers/reportes');
const sensorsController = require('../controllers/sensorsController');

// este router tendrá dadas de alta
// las rutas de nuestra aplicación
// y asociadas a la acción del controlador que 
// debe despacharlas
module.exports = () => {

  router.get("/", indexController.index);
  router.get("/acercade", indexController.acercade);
  router.get("/saludar", indexController.saludar);

  // rutas para products
  router.get("/products", productsController.indexView);
  router.post("/api/products", productsController.add); // registrar producto
  router.get("/api/products", productsController.index);
  router.get("/products/new", productsController.addForm); // formulario
  router.get("/products/:id", productsController.show);
  router.put("/products/:id", productsController.update); // actualizar producto
  router.delete("/products/:id", productsController.delete);

  // leer interfaces
  router.get('/interfaces', interfacesController.index);

  // rutas para customers
  router.get("/customers", customersController.index);

  // ruta para gráficos / reportes
  router.get('/reportes', reportesController.index);

  router.get('/sensores/new', sensorsController.addForm); // vista
  router.post('/api/sensores', sensorsController.add); // guardar sensor
  
  // retornar el router
  return router;
};
