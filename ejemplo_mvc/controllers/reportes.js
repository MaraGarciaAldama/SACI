
exports.index = (req, res) => {


  // { id, sensorId, fecha, valor }

  const log = [
    {id:'asw-345f', date:'6:50',	value:22.12 },
    {id:'asw-345f', date:'6:51',	value:22.24 },
    {id:'asw-345f', date:'6:52',	value:22.5},
    {id:'asw-345f', date:'6:53',	value:22.7},
    {id:'asw-345f', date:'6:54',	value:22.89 },
    {id:'asw-345f', date:'6:55',	value:23.09 },
    {id:'asw-345f', date:'6:56',	value:23.29 },
    {id:'asw-345f', date:'6:57',	value:23.49 },
    {id:'asw-345f', date:'6:58',	value:23.69 },
    {id:'asw-345f', date:'6:59',	value:23.89 },
    {id:'asw-345f', date:'7:00',	value:24.09 },
    {id:'asw-345f', date:'7:01',	value:26.6},
    {id:'asw-345f', date:'7:02',	value:23.8},
    {id:'asw-345f', date:'7:03',	value:23.79 },
    {id:'asw-345f', date:'7:04',	value:23.79 },
    {id:'asw-345f', date:'7:05',	value:23.78 },
  ];

  // renderizar la vista index
  // generar ejemplo de fuente de datos para el gráfico
  res.render('reportes/index', 
    {
      title: 'Temperatura Suelo',
      data: log, // datos para el gráfico
      values: log.map((item) => item.value),
      times: log.map((item) => item.date),
      serie1: {
        name: 'Temperatura X',
        data: log.map((item) => item.value),
      }
    },
  );
}