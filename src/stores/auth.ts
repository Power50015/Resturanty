import { defineStore } from "pinia";
import app from "../firebase";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

// wait until auth is ready
const unsub = await onAuthStateChanged(auth, async (user) => {
  if (user) {
    const q = query(
      collection(db, "restaurants"),
      where("email", "==", user.email)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const auth = useAuthStore();
      auth.restaurantId = doc.id;
      auth.isLogin = true;
      auth.restaurantName = doc.data().name;
      auth.restaurantEmail = doc.data().email;
      auth.restaurantAdrres = doc.data().adrres;
      auth.restaurantArea = doc.data().area;
      auth.restaurantDes = doc.data().des;
      auth.restaurantImg = doc.data().img;
      auth.restaurantPhone = doc.data().phone;
    });
  }
  unsub();
});

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isLogin: false,
    restaurantId: "",
    restaurantName: "",
    restaurantEmail: "",
    restaurantDes: "",
    restaurantArea: "",
    restaurantAdrres: "",
    restaurantImg: "",
    restaurantPhone: "",
    fileUpload: 0,
  }),
  actions: {
    addUser(
      name: string,
      email: string,
      password: string,
      des: string,
      area: string,
      adrres: string,
      phone: string,
      img: string
    ): any {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Add a new document in collection "hospitals"
          addDoc(collection(db, "restaurants"), {
            name: name,
            email: email,
            adrres: adrres,
            area: area,
            des: des,
            img: img,
            phone: phone,
          }).then((user) => {
            this.restaurantId = user.id;
            this.isLogin = true;
            this.restaurantName = name;
            this.restaurantEmail = email;
            this.restaurantAdrres = adrres;
            this.restaurantArea = area;
            this.restaurantDes = des;
            this.restaurantImg = img;
            this.restaurantPhone = phone;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
      return this.isLogin;
    },
    login(email: string, password: string) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const q = query(
            collection(db, "hospitals"),
            where("email", "==", email)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            this.isLogin = true;
            this.name = doc.data().name;
            this.email = doc.data().email;
            this.userId = doc.id;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    logout() {
      signOut(auth).then(() => {
        this.isLogin = false;
        this.name = "";
        this.email = "";
      });
    },
    async editUser(
      name: string,
      des: string,
      area: string,
      adrres: string,
      phone: string,
      img: string
    ) {
      console.log(this.restaurantId);

      await setDoc(doc(db, "restaurants", this.restaurantId), {
        name: name,
        email: this.restaurantEmail,
        adrres: adrres,
        area: area,
        des: des,
        img: img,
        phone: phone,
      }).then((user) => {
        this.restaurantName = name;
        this.restaurantAdrres = adrres;
        this.restaurantArea = area;
        this.restaurantDes = des;
        this.restaurantImg = img;
        this.restaurantPhone = phone;
      });
    },
    async uploadFile(file: any) {
      console.log(file);
      const fileData = file[0];

      const storageRef = ref(storage, `${fileData.name}`);
      const uploadTask = uploadBytesResumable(storageRef, fileData);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          this.fileUpload = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
            return URL;
          });
        }
      );
    },
  },
});