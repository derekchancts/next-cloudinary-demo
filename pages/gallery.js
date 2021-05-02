import { useEffect, useState } from 'react'
import styles from "../styles/Home.module.css";
// import { Image } from 'cloudinary-react';
import Image from 'next/image';


const GalleryPAge = () => {
  const [images, setImages] = useState([]);


  useEffect(() => {
    const getImages = async() => {
     try {
      // const response = await fetch('http://localhost:5000/api/upload');
      const response = await fetch('/api/upload');
      const data = await response.json();
      console.log(data);
      setImages(data);
     } catch (error) {
      console.log(error)
     }
    };
    getImages();
  },[]);


  return (
    <div className={styles.container}>
    {/* <div > */}
      <h1>Gallery</h1>
      <ul className={styles.main}>
      {
        images.data && images.data.map((image, index) => (
          // <p>{image.secure_url}</p>
          // <Image 
          //   key={index}
          //   cloudName="ds90creqb"
          //   publicId={imageId}
          //   width="300"
          //   crop="scale"
          //   // angle="10"
          // />
          <li key={image.public_id}>
            <Image

              src={image.secure_url} 
              alt={image.filename}
              width={350}
              height={500}
              // layout="responsive"
            />
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default GalleryPAge
