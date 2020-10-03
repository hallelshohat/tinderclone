import app from "firebase/app";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAZeqYsZ00idOF42_vlVAa9qW_kobrdv2Q",
  authDomain: "picchooser.firebaseapp.com",
  databaseURL: "https://picchooser.firebaseio.com",
  projectId: "picchooser",
  storageBucket: "picchooser.appspot.com",
  messagingSenderId: "262935192",
  appId: "1:262935192:web:8833aa7eb52cf7420a76ed",
  measurementId: "G-7DXNNJLZ05",
};

export const firePath = `/images/`;

export class Firebase {
  storage: app.storage.Storage;

  constructor() {
    app.initializeApp(config);
    this.storage = app.storage();
  }

  uploadPic(
    path: string,
    progress: (status: app.storage.UploadTaskSnapshot) => void,
    picture: File
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadTask = this.storage
        .ref(firePath + path + picture.name)
        .put(picture);
      uploadTask.on("state_changed", progress, reject, () =>
        resolve(this.getImageUrl(path, picture.name))
      );
    });
  }

  getImageUrl(path: string, fileName: string): Promise<string> {
    return this.storage
      .ref(firePath + path)
      .child(fileName)
      .getDownloadURL();
  }
}
