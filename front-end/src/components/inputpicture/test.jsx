import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './test.module.css';

function Test() {
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the file
    if (acceptedFiles.length > 0) {
      const imageFile = acceptedFiles[0];
      setUploadedImage(URL.createObjectURL(imageFile));
    } else {
      console.log('Please upload only one image.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/gif',
    maxFiles: 1,
  });

  return (
    <div className={styles.picturebox}>
      <div {...getRootProps()} className={`${styles.phothbox} ${isDragActive ? styles.active : ''}`}>
        <input {...getInputProps()} />
        {uploadedImage ? (
          <div className={styles.imgbox}>
            {/* <h2>Uploaded Image:</h2> */}
            <img src={uploadedImage} alt="Uploaded" className={styles.imagefile} />
          </div>
        ) : (
          <p>Drag drop an image here, or click to select an image</p>
        )}
      </div>
    </div>
  );
}

export default Test;
