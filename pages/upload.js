import { useState } from "react";
import { useRouter } from 'next/router';
import styles from "../styles/Home.module.css";
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
  Container,
  InputGroup,
} from "react-bootstrap";


const UploadPage = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState();

  const router = useRouter();


  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);

  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);  // converts the image to a string;
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    // console.log(base64EncodedImage)
    try {
      // await fetch('http://localhost:5000/api/upload', {
      await fetch('/api/upload', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: {'Content-Type': 'application/json'}
      });
      // router.push('/gallery');
      window.location.replace('/gallery')

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className="mb-5">Upload</h1>
      <form onSubmit={handleSubmit}>
      <FormGroup>
        <FormControl className="mb-3"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
        />
        {/* <button type="submit">Submit</button>  */}
        {/* <Button variant="primary" type="button">Submit</Button> */}
        <Button block="block" type="submit">Submit</Button>
      </FormGroup>
      </form>
      {
        previewSource && (
          <img src={previewSource} alt="choosen"  style={{ height: '300px' }}
          />
        )
      }

    </div>
  );
};

export default UploadPage;
