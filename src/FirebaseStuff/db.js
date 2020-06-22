import firebase, { firestore } from "./config";

export function writeUserData({ immagineProfilo, nome, id }) {
  return firestore
    .collection("utenti")
    .doc(`${id}`)
    .set({ immagineProfilo, nome, id })
    .then(console.log);
}

export async function getUser(id) {
  if (id === "" || typeof id === "undefined") return [];
  let a = await firestore.collection("utenti").limit(10).get();
  console.log("fetch");
  return a.docs.filter((d) => {
    let e = d.data();

    return e.id !== id;
  });
}

function getData() {
  let a = firebase.firestore.Timestamp.now().toDate();

  return a;
}

export async function getIndirizziAndMaterie() {
  let indirizzi = await firestore.collection(`Indirizzi`).get();
  let a = [];

  indirizzi.docs.forEach((indirizzo, indice) => {
    let c = [];
    let materie = indirizzo.data().Materie;

    materie.forEach((materia) => {
      c.push({ nome: materia });
    });

    let b = { nome: indirizzo.id, dati: c, id: indice };
    a.push(b);
  });
  console.log(a);

  return a;
}

export async function getAnniMaterieAndRiassunti(nomeMateria, indirizzo) {
  let anni = await firestore
    .collection(`Materie`)
    .where("Materia", "==", `${nomeMateria}`)
    .where("Indirizzo", "==", `${indirizzo}`)
    .get();

  try {
    anni = anni.docs[0].data();
  } catch (error) {
    window.location.href = "/";
  }

  let a = [];

  let indice = 0;

  console.log("Argomenti", arguments);

  for (let anno of anni.Anni) {
    let dati = [];
    //debugger;
    let riassunti = await firestore
      .collection("Riassunti")
      .where("anno", "==", anno + "")
      .where("materia", "==", `${nomeMateria}`)
      .where("indirizzo", "==", `${indirizzo}`)
      .get();

    riassunti = riassunti.docs;
    console.log(riassunti);
    //debugger;
    riassunti.forEach((riassunto) => {
      //debugger;
      dati.push({ nome: riassunto.data().nome, id: Math.random() * 100 });
    });

    let b = { nome: anno, dati, id: indice };
    //debugger;
    a.push(b);
    indice++;
  }

  console.log(a);
  return a;
}

export async function riassuntiCaricatiDa(idUtente) {
  let a = await firestore
    .collection("Riassunti")
    .where("idUtente", "==", idUtente)
    .get();

  let b = a.docs.map((v) => v.data());

  return b;
}

export async function togliRiassunto(idRiassunto) {
  firestore.collection("Riassunti").doc(idRiassunto).delete();
}

export async function inserisciNelDB(nome, materia, anno, indirizzo, idUtente) {
  firestore
    .collection("Riassunti")
    .doc(`${nome}`)
    .set({ anno, materia, nome, indirizzo, idUtente })
    .then(() => {
      console.log("ok");
    })
    .catch((e) => {
      console.log(e);
    });
}

export async function cercaRiassunto(nome) {
  const text = nome;
  const end = text.replace(/.$/, (c) =>
    String.fromCharCode(c.charCodeAt(0) + 1)
  );

  let riass = await firestore
    .collection("Riassunti")
    .where("nome", ">=", text)
    .where("nome", "<", end)
    .get();

  riass = riass.docs;

  let b = riass.map((ri) => {
    return ri.data();
  });

  return b;
}

export async function getIndirizzi() {
  let a = await firestore.collection("Indirizzi").get();
  a = a.docs;

  let b = a.map((i, ind) => {
    return { indirizzo: a[ind].id, materie: i.data().Materie };
  });

  return b;
}
