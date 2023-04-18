const path = require('path');

// punto de entrada de la app
const express = require('express');

require('dotenv').config(); // cargar variables de entorno

//importar motor de vistas
const ejs = require('ejs');

// importar el router
const router = require('./routes');
const dbo = require('./models/dbo');

// crear instancia de express
const app = express();
app.use(express.json()); // body parser: convertir el body del request a objeto JS

// indicar a la instancia APP, el motor de vistas
// y la ruta donde se encuentran las vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views')); // /views


// todas las peticiones deben ser atendidas por el router
app.use('/', router());

// permitir acceso a carpeta estática
app.use('/public', express.static('public'));

// verificar conexión a MongoDB, si ocurre, levantar el servidor web
dbo.connectToServer((error) => {
  if (error) {
    console.error(error);

    // si no hay conexión a la BD, finalizar la ejecución
    process.exit();
  }

  // habilitar el servidor en el puerto de escucha
  app.listen(process.env.PORT, () => {
    console.log(`La aplicación está corriendo en el puerto: ${process.env.PORT}`);
  });
});

/*
// habilitar el servidor en el puerto de escucha
app.listen(process.env.PORT, () => {
  console.log(`La aplicación está corriendo en el puerto: ${process.env.PORT}`);
});
*/