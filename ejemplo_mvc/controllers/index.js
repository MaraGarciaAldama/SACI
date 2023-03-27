
// generar acciones que deben ser exportadas

// acción para la página principal
exports.index = (req, res) => {
  //res.send("<h1>Hola, esta es la vista inicial....</h1>");

  // renderizar la vista index
  // enviándole datos como: name
  res.render('main/index', 
    {
      name: 'Pablo',
    }
  );
}

// La acción saludar, debe devolver los datos de una persona
// nombre, apellidos, email, edad, sexo
// y mostrar la información en la vista
exports.saludar = (req, res) => {
  res.render('main/saludar', {
    person: {
      name: 'Pablo',
      lastName: 'Montes',
      email: 'pablo78@utim.edu.mx',
      age: 22,
      gender: 'M',
    },
  });
}

exports.acercade = (req, res) => {
  res.send("<p>Hola, esta es la ruta de acerca de...</p>");
}

