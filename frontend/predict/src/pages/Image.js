import React, { useRef, useState } from "react";
import axios from "axios";
import classes from "./image.module.css";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import "primereact/resources/themes/lara-light-indigo/theme.css"; 
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function ImageClassification() {
  const [uploadImage, setuploadImage] = useState({ file: "" });
  const [classifiedImage, setClassifiedImage] = useState({ file: "" });
  const [classificationLabel, setclassificationLabel] = useState("");
  const fileUploadRef = useRef(null);
  
  const url = "http://127.0.0.1:8000/predict";

  const onTemplateSelect = async (event) => {
    const image_file = event.files[0];
    const image_base64 = await convertToBase64(image_file);
    setuploadImage({ file: image_base64 });
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const imageUploader = async (event) => {
    await axios
      .post(url, { data: uploadImage["file"] })
      .then(function (response) {
        setclassificationLabel(response.data["class_label"]);
        setClassifiedImage({ ...uploadImage, file: response.data["image"] });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function tryOneMoreTime() {
    setclassificationLabel("");
  }

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          width: "50rem",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div style={{ width: "75%" }}>
          <img
            alt={file.imageFile}
            role="presentation"
            src={file.objectURL}
            width={300}
          />
          <span>{file.imageFile}</span>
        </div>
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className={classes.emptyTemplate}>
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  return (
    <div className="align-items-center">
      {classificationLabel.length !== 0 ? (
        <div>
          <div className={classes.resultContainer}>
            <div className={classes.center}>
              {" "}
              <p>
                The classification class of the uploaded image is{" "}
                <b>{classificationLabel ? "Dog" : "Cat"}</b>
              </p>
              <Button className={classes.tryBtn} onClick={tryOneMoreTime}>
                <span className="px-3">Try Again</span>
              </Button>
            </div>
          </div>

          <div className="  m-5">
            <div className="flex flex-column align-items-center">
              <Image
                className={classes.imageResult}
                src={classifiedImage["file"]}
                alt="Classified Image"
                width="100%"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="grid-container mb-5">
          <h5 className="my-4">Try our trained image recognition model: </h5>
          <FileUpload
            ref={fileUploadRef}
            name="uploadImage"
            accept="image/*"
            customUpload
            onSelect={onTemplateSelect}
            headerTemplate={headerTemplate}
            itemTemplate={itemTemplate}
            emptyTemplate={emptyTemplate}
            uploadHandler={imageUploader}
            chooseOptions={chooseOptions}
            uploadOptions={uploadOptions}
            cancelOptions={cancelOptions}
          />
        </div>
      )}
    </div>
  );
}
export default ImageClassification;
