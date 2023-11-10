import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class ImageStorageService {
  tweetText: string = '';
  selectedImages: string[] = [];
  maxImages: number = 1;
  tempURLs: string;

  constructor(private storage: AngularFireStorage) {
    this.tempURLs = '';
  }

  logHello() {
    console.log('hello');
  }

  async openGallery() {
    // if (this.selectedImages.length >= this.maxImages) {
    //   return;
    // }

    const image = await this.getGalleryImage();
    if (image) {
      this.selectedImages = [];
      this.selectedImages.push(image);
    }
  }

  async getGalleryImage() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });
    const base64Image = await this.convertToBase64(image.webPath);
    return base64Image;
  }

  async convertToBase64(imagePath: string | undefined): Promise<string> {
    if (!imagePath) {
      // Manejar el caso en el que imagePath es undefined
      return '';
    }

    const image = await fetch(imagePath);
    const blob = await image.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }

  // async uploadImage(): Promise<void> {
  //   // Convierte las imágenes seleccionadas a formato de URL de datos
  //   const imagesInDataURLFormat = await Promise.all(
  //     this.selectedImages.map((imagePath) => this.convertToBase64(imagePath))
  //   );

  //   // Subir imágenes a Firebase Storage
  //   for (const image of imagesInDataURLFormat) {
  //     const imageName = `${Date.now()}_${Math.floor(
  //       Math.random() * 10000
  //     )}.jpg`; // Nombre único para cada imagen
  //     const filePath = `tweets/${imageName}`;
  //     const storageRef = this.storage.ref(filePath);
  //     const uploadTask = storageRef.putString(image, 'data_url');

  //     uploadTask
  //       .snapshotChanges()
  //       .pipe(
  //         finalize(() => {
  //           storageRef.getDownloadURL().subscribe((downloadURL) => {
  //             // guardarla en una base de datos Firebase
  //             // console.log('URL de descarga:', downloadURL);
  //             this.tempURLs = downloadURL;
  //             // Luego, puedes guardar la URL de descarga y el tweet en Firebase Firestorage
  //           });
  //         })
  //       )
  //       .subscribe();
  //   }
  // }

  async uploadImage(): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      // Convierte las imágenes seleccionadas a formato de URL de datos
      const imagesInDataURLFormat = await Promise.all(
        this.selectedImages.map((imagePath) => this.convertToBase64(imagePath))
      );

      // Subir imágenes a Firebase Storage
      for (const image of imagesInDataURLFormat) {
        // console.log(image);

        const imageName = `${Date.now()}_${Math.floor(
          Math.random() * 10000
        )}.png`; // Nombre único para cada imagen
        const filePath = `tweets/${imageName}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = storageRef.putString(image, 'data_url');

        uploadTask
          .snapshotChanges()
          .pipe(
            finalize(() => {
              storageRef.getDownloadURL().subscribe(
                (downloadURL) => {
                  // guardarla en una base de datos Firebase
                  this.tempURLs = downloadURL;
                  // Luego, puedes guardar la URL de descarga y el tweet en Firebase Firestorage
                  resolve(downloadURL); // Resolve the promise with the downloadURL
                },
                (error) => {
                  reject(error); // Reject the promise if there is an error
                }
              );
            })
          )
          .subscribe();
      }
    });
  }
}
