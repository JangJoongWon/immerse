import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import styles from './InputImg.module.css'

function InputPicture({ onChange }) {
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const imageFile = acceptedFiles[0];
      setUploadedImage(URL.createObjectURL(imageFile));
      if (onChange) {
        onChange(URL.createObjectURL(imageFile));
      }
    } else {
      console.log('Please upload only one image.');
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/gif',
    maxFiles: 1,
  });

  return (
    <div>
      <div {...getRootProps()} className={isDragActive ? 'active' : ''}>
        <input {...getInputProps()} />
        {uploadedImage ? (
          <div>
            <img src={uploadedImage} alt="Uploaded" />
          </div>
        ) : (
          <div style={{height:"300px",width:"100%",color:"white",display:"flex",justifyContent:"center",alignItems:"center"}}>
            <p>Drag drop an image here, or click to select an image</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputPicture;
