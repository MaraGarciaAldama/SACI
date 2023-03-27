exports.addForm = async (req, res) => {
  // retornar la vista para agregar sensor
  res.render('sensors/add', 
    {
    }
  );
}

// función que registrar el sensor
exports.add = async (req, res) => {
  res.json(
    {
      message: 'Dato recibido en el backend',
    }
  );
}