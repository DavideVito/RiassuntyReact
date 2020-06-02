import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCI9RBTgge8Zs1QRqEmGgvxuwyCAYGhUiA",
  authDomain: "riassuntyreact.firebaseapp.com",
  databaseURL: "https://riassuntyreact.firebaseio.com",
  projectId: "riassuntyreact",
  storageBucket: "riassuntyreact.appspot.com",
  messagingSenderId: "463114148371",
  appId: "1:463114148371:web:d2e481a893cad902577de6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
export let firestore = firebase.firestore();
export let auth = firebase.auth;
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const storageRef = firebase.storage().ref();
/*
let a = `[{"IDMateria":"1","Materia":"Storia","Indirizzo":"Trasversale"},{"IDMateria":"2","Materia":"Italiano","Indirizzo":"Trasversale"},{"IDMateria":"3","Materia":"Informatica","Indirizzo":"Informatica"},{"IDMateria":"4","Materia":"Sistemi","Indirizzo":"Informatica"},{"IDMateria":"5","Materia":"TPSIT","Indirizzo":"Informatica"},{"IDMateria":"6","Materia":"Gestione","Indirizzo":"Informatica"},{"IDMateria":"7","Materia":"Analitica","Indirizzo":"Chimica e Materiali"},{"IDMateria":"8","Materia":"Organica","Indirizzo":"Biologico Sanitario"},{"IDMateria":"9","Materia":"Sistemi","Indirizzo":"Automazione"},{"IDMateria":"10","Materia":"Fisica","Indirizzo":"Biologico Ambientale"},{"IDMateria":"11","Materia":"Tecnologia","Indirizzo":"Meccanica"},{"IDMateria":"12","Materia":"Elettrotecnica","Indirizzo":"Elettronica"},{"IDMateria":"13","Materia":"Matematica","Indirizzo":"Trasversale"},{"IDMateria":"14","Materia":"Chimica","Indirizzo":"Chimica e Materiali"},{"IDMateria":"15","Materia":"Meccanica","Indirizzo":"Meccanica"},{"IDMateria":"16","Materia":"Sistemi","Indirizzo":"Meccanica"},{"IDMateria":"17","Materia":"Disegno","Indirizzo":"Meccanica"},{"IDMateria":"18","Materia":"TPSEE","Indirizzo":"Automazione"},{"IDMateria":"19","Materia":"Elettrotecnica","Indirizzo":"Automazione"},{"IDMateria":"20","Materia":"Biologia","Indirizzo":"Biologico Ambientale"},{"IDMateria":"21","Materia":"Organica","Indirizzo":"Biologico Ambientale"},{"IDMateria":"22","Materia":"Analitica","Indirizzo":"Biologico Ambientale"},{"IDMateria":"23","Materia":"Biologia","Indirizzo":"Trasversale"},{"IDMateria":"24","Materia":"Anatomia","Indirizzo":"Biologico Sanitario"},{"IDMateria":"25","Materia":"Analitica","Indirizzo":"Biologico Sanitario"},{"IDMateria":"26","Materia":"Organica","Indirizzo":"Chimica e Materiali"},{"IDMateria":"27","Materia":"Sistemi Automatici","Indirizzo":"Automazione"},{"IDMateria":"28","Materia":"TPSEE","Indirizzo":"Elettronica"},{"IDMateria":"29","Materia":"Sistemi","Indirizzo":"Elettronica"},{"IDMateria":"30","Materia":"Telecomunicazioni","Indirizzo":"Informatica"},{"IDMateria":"31","Materia":"Inglese","Indirizzo":"Trasversale"},{"IDMateria":"32","Materia":"Fisica","Indirizzo":"Trasversale"},{"IDMateria":"33","Materia":"Chimica","Indirizzo":"Trasversale"},{"IDMateria":"34","Materia":"Biologia","Indirizzo":"Biologico Sanitario"},{"IDMateria":"35","Materia":"Scienze","Indirizzo":"Trasversale"},{"IDMateria":"36","Materia":"Tecnologie Informatiche","Indirizzo":"Trasversale"},{"IDMateria":"37","Materia":"STA","Indirizzo":"Trasversale"}]`;

a = JSON.parse(a);
let anni = [];

for (let i = 0; i < 5; i++) {
  anni.push(i + 1);
}

a.forEach((materia) => {
  firestore
    .collection("Materie")
    .add({
      Anni: anni,
      Indirizzo: materia.Indirizzo,
      Materia: materia.Materia,
    });
});
*/
