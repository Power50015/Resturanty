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
  const auth = useAuthStore();
  if (user) {
    const q = query(
      collection(db, "restaurants"),
      where("email", "==", user.email)
    );

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      const q = query(
        collection(db, "admin"),
        where("email", "==", user.email)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        auth.restaurantId = doc.id;
        auth.isLogin = true;
        auth.restaurantName = doc.data().name;
        auth.restaurantEmail = doc.data().email;
        auth.restaurantAdrres = doc.data().adrres;
        auth.restaurantArea = doc.data().area;
        auth.restaurantDes = doc.data().des;
        auth.restaurantImg = doc.data().img;
        auth.restaurantPhone = doc.data().phone;
        auth.restaurantType = doc.data().type;
        auth.restaurantStartTime = doc.data().startTime;
        auth.restaurantEndTime = doc.data().endTime;
        auth.restaurantMap = doc.data().map;
        auth.userType = "admin";
        auth.isloaded = true;
      });
    } else {
      querySnapshot.forEach((doc) => {
        auth.restaurantId = doc.id;
        auth.isLogin = true;
        auth.restaurantName = doc.data().name;
        auth.restaurantEmail = doc.data().email;
        auth.restaurantAdrres = doc.data().adrres;
        auth.restaurantArea = doc.data().area;
        auth.restaurantDes = doc.data().des;
        auth.restaurantImg = doc.data().img;
        auth.restaurantPhone = doc.data().phone;
        auth.restaurantType = doc.data().type;
        auth.restaurantStartTime = doc.data().startTime;
        auth.restaurantEndTime = doc.data().endTime;
        auth.restaurantMap = doc.data().map;
        auth.userType = "restaurants";
        auth.isloaded = true;
      });
    }
  } else {
    auth.isloaded = true;
  }

  unsub();
});

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isloaded: false,
    isLogin: false,
    restaurantId: "",
    restaurantName: "",
    restaurantEmail: "",
    restaurantDes: "",
    restaurantArea: "",
    restaurantAdrres: "",
    restaurantImg: "",
    restaurantPhone: "",
    restaurantType: "",
    restaurantStartTime: "",
    restaurantEndTime: "",
    restaurantMap: "",
    fileUpload: 0,
    userType: ""
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
      img: string,
      type: string,
      startTime: string,
      endTime: string,
      map: string
    ): any {
      this.isloaded = false;
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
            type: type,
            startTime: startTime,
            endTime: endTime,
            map: map
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
            this.restaurantType = type;
            this.restaurantStartTime = startTime;
            this.restaurantEndTime = endTime;
            this.restaurantMap = map;
            this.isloaded = true;
            this.userType = "restaurants";
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.isloaded = true;
        });
      return this.isLogin;
    },
    login(email: string, password: string) {
      this.isloaded = false;
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const q = query(
            collection(db, "restaurants"),
            where("email", "==", email)
          );

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            this.restaurantId = doc.id;
            this.isLogin = true;
            this.restaurantName = doc.data().name;
            this.restaurantEmail = doc.data().email;
            this.restaurantAdrres = doc.data().adrres;
            this.restaurantArea = doc.data().area;
            this.restaurantDes = doc.data().des;
            this.restaurantImg = doc.data().img;
            this.restaurantPhone = doc.data().phone;
            this.restaurantType = doc.data().type;
            this.restaurantStartTime = doc.data().startTime;
            this.restaurantEndTime = doc.data().endTime;
            this.restaurantMap = doc.data().map;
            this.isloaded = true;
            this.userType = "restaurants";
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.isloaded = true;
        });
    },
    adminLogin(email: string, password: string) {
      this.isloaded = false;
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const q = query(
            collection(db, "admin"),
            where("email", "==", email)
          );

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            this.isLogin = true;
            this.restaurantName = doc.data().name;
            this.restaurantEmail = doc.data().email;
            this.isloaded = true;
            this.userType = "admin";
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.isloaded = true;
        });
    },
    logout() {
      signOut(auth).then(() => {
        this.isLogin = false;
        this.restaurantId = "";
        this.restaurantName = "";
        this.restaurantEmail = "";
        this.restaurantAdrres = "";
        this.restaurantArea = "";
        this.restaurantDes = "";
        this.restaurantImg = "";
        this.restaurantPhone = "";
        this.restaurantType = "";
        this.restaurantStartTime = "";
        this.restaurantEndTime = "";
        this.restaurantMap = "";
        this.userType = "";
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
    addMeal(
      mealTitle: string,
      mealImg: string,
      mealPrice: string,
      mealDes: string
    ): any {
      this.isloaded = false;
      addDoc(collection(db, "meals"), {
        mealTitle: mealTitle,
        mealImg: mealImg,
        mealPrice: mealPrice,
        mealDes: mealDes,
        mealrestaurant: this.restaurantEmail
      })
        .then((user) => {
          this.isloaded = true;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          this.isloaded = true;
        });
    },
  },
});
