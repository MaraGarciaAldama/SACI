var manual = document.getElementById('aspersores');
console.log('aspersores' + manual.checked);
manual.checked = true;


manual.addEventListener('click', function () {
  if (manual.checked) {
    console.log('El riego se detuvo');

    $.ajax({
      url: "http://192.168.1.195:5000/apagar_aspersores",
      type: "GET",
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.error(error);
      }
    });

  } else {
    console.log('Inicio de riego');
    $.ajax({
      url: "http://192.168.1.195:5000/encender_aspersores",
      type: "GET",
      success: function (response) {
        console.log(response);
      },
      error: function (error) {
        console.error(error);
      }
    });

  }
});
