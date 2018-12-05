// window.onbeforeunload = function() {
//   //return "¿Estás seguro de que quieres cerrar esta ventana? ¡La bomba explotará y moriréis todos!";
//   return "*************************************** \n\n ¡¡¡NO TE ATREVAS A SALIR DE ESTA PÁGINA!!! \n\n ¡La bomba explotará y moriréis todos! \n\n\n ¡¡PULSA EL BOTÓN CANCELAAR AHORA MISMO!! \n\n ***************************************";
// }


window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = 'testing message';
});
