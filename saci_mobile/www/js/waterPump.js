
//manual
var manual = document.getElementById('checkManual');
console.log('checkManual' + manual.checked);
manual.checked = true;


//automatico
var estado = "OFF";

if(estado=="ON"){
  manual.disabled = true;
  document.querySelector(".manual").style.opacity = 0.5;
}else{

}

var automatico = document.getElementById('checkAutomatico');
console.log('checkAutomatico' + automatico.checked);



//Encender/apagar bomba Manualmente
manual.addEventListener('click', function() {
    if(manual.checked) {
      console.log('El elemento está marcado');
      
      $.ajax({
        url: "http://localhost:5000/apagar_rele",
        type: "GET",
        success: function(response) {
          console.log(response);
        },
        error: function(error) {
          console.error(error);
        }
      });

    } else {

          $.ajax({
            url: "http://localhost:5000/encender_rele",
            type: "GET",
            success: function(response) {
              console.log(response);
            },
            error: function(error) {
              console.error(error);
            }
          });
  
    }
  });
