
//import sketch from './puzzle.js';

//var Alert = new CustomAlert();
class Alert{
    constructor(){}
 CustomAlert()
  {
      //Show Modal
     console.log("this isn't supposed to happen!")
      
      let popUpBox = document.getElementById('popUpBox');
      popUpBox.style.display = "block";
       

      
      
      

      
  }
  
ok() {
  console.log("i'm here!");
  document.getElementById('popUpBox').style.display = "none";
  //document.getElementById('popUpOverlay').style.display = "none";
  
}
}
export default Alert;