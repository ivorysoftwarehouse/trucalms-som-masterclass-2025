import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAvexMGe52Y1hGoYNAu8wClGjSbv3KBf8",
  authDomain: "the-som-masterclass.firebaseapp.com",
  projectId: "the-som-masterclass",
  storageBucket: "the-som-masterclass.firebasestorage.app",
  messagingSenderId: "175321732951",
  appId: "1:175321732951:web:850289ca9f23e84a195012"
};

const initialize = () => {
  const firebaseApp = initializeApp(firebaseConfig);

  window.firebaseApp = firebaseApp;
}

const register = async (data, callback) => {
  let date = new Date().toLocaleDateString('en-us', {year:"numeric", month:"numeric", day:"numeric"})
  date = date.replace(/\//g, "-");

  const db = getFirestore(window.firebaseApp);

  const document = {
    data
  }

  await setDoc(doc(db, "people", data.phoneNumber), document)

  const serviceDate = await getDoc(doc(db, "attendance", date));

  if (!serviceDate.exists()) {
    await setDoc(doc(db, "attendance", date), {})
  }

  await setDoc(doc(db, "attendance", date, "people", data.phoneNumber), { present: true })
  callback({success: true});
}

const login = (email, password, callback) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
  	const user = userCredential.user;
  	callback(user, {success: true});
	})
	.catch((error) => {
  	callback(error, {
    	success: false,
    	message: error.message.indexOf('invalid-credential') > -1 ? 'Invalid Email or Password' : 'An error occurred',
  	});
	});
}

const logout = () => {
  const auth = getAuth();
  signOut(auth);
}

const setupAuthListener = (callback) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
	if (user) {
  	callback(user, true)
	} else {
  	callback(user, false)
	}
  });
}

const verify = async (code, callback) => {
  const db = getFirestore(window.firebaseApp);

  const currentCode = await getDoc(doc(db, "verification", "current"));

  if (currentCode.data().code === code) {
    callback({success: true});
  } else {
    callback({success: false, invalidCode: true});
  }
};

const getAttendances = async () => {
  let date = new Date().toLocaleDateString('en-us', {year:"numeric", month:"numeric", day:"numeric"})
  date = date.replace(/\//g, "-");

  const db = getFirestore(window.firebaseApp);

  let attendances = await getDocs(collection(db, "attendance", date, "people"));
  attendances = attendances.docs.map((attendance) => attendance.id)

  return attendances;
}

const getPeople = async () => {
  const db = getFirestore(window.firebaseApp);

  let people = await getDocs(collection(db, "people"))
  people = people.docs.map((person) => person.data())

  const attendances = await getAttendances();

  people = people.filter((person) => attendances.indexOf(person.phoneNumber) < 0)

  return people;
}

const setPresent = async (phoneNumber, callback) => {
  let date = new Date().toLocaleDateString('en-us', {year:"numeric", month:"numeric", day:"numeric"})
  date = date.replace(/\//g, "-");

  const db = getFirestore(window.firebaseApp);

  const serviceDate = await getDoc(doc(db, "attendance", date));

  if (!serviceDate.exists()) {
    await setDoc(doc(db, "attendance", date), {})
  }

  await setDoc(doc(db, "attendance", date, "people", phoneNumber), { present: true })
  callback({success: true});
}

const uploadData = async (data, callback) => {
  const db = getFirestore(window.firebaseApp);

  for (let i = 0; i < data.length; i++) {
    console.log(`Uploading: ${[data[i].index]} ${data[i].name}`);
    delete data[i].index;
    await setDoc(doc(db, "people", data[i].phoneNumber), data[i])
  }

  callback({success: true});
}

export {
  initialize,
  register,
  login,
  logout,
  setupAuthListener,
  verify,
  getPeople,
  setPresent,
  uploadData,
}
