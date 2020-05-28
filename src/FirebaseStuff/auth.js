import { auth, googleProvider } from "./config";
import { writeUserData } from "./db";

export function accediGoogle() {
  auth()
    .signInWithPopup(googleProvider)
    .then(({ user }) => {
      localStorage.setItem("utente", JSON.stringify(user));
      let id = user.uid;
      let nome = user.displayName;
      let immagineProfilo = user.photoURL;
      writeUserData({ immagineProfilo, nome, id }).then(
        () => (window.location.href = "/Login")
      );
    });
}

export function esci() {
  localStorage.removeItem("utente");
  window.location.href = "/";
  auth().signOut();
}
