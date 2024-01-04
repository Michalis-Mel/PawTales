import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../helpers/firebase";

const uploadStoryToFirestore = async (storyData) => {
  try {
    // Format the date as "DD-MM-YYYY"
    const formattedDate = storyData.dateCreated
      ? storyData.dateCreated.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })
      : null;

    // Include the formatted date in the story data
    const dataWithFormattedDate = {
      ...storyData,
      dateCreated: formattedDate,
    };

    await setDoc(
      doc(firestore, "stories", storyData.id),
      dataWithFormattedDate
    );
    return true;
  } catch (error) {
    console.error("Error uploading story:", error);
    return false;
  }
};

const UploadStory = () => {
  // State for form fields
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audio, setAudio] = useState("");
  const [dateCreated, setDateCreated] = useState(new Date());
  const [id, setId] = useState(uuidv4());
  const [image, setImage] = useState("");
  const [secondImage, setSecondImage] = useState("");
  const [thirdImage, setThirdImage] = useState("");
  const [smallDescription, setSmallDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const success = await uploadStoryToFirestore({
      title,
      content,
      audio,
      dateCreated,
      id,
      image,
      secondImage,
      thirdImage,
      smallDescription,
      visits: 0,
    });

    if (success) {
      // Clear form fields after successful upload
      setTitle("");
      setContent("");
      setAudio("");
      setDateCreated(new Date());
      setId(uuidv4());
      setImage("");
      setSecondImage("");
      setThirdImage("");
      setSmallDescription("");
      setErrorMessage("");

      alert("Story uploaded successfully!");
    } else {
      setErrorMessage("Failed to upload story. Please try again.");
    }
  };

  return (
    <div className="upload-story-container">
      {errorMessage && (
        <div className="error-message">
          <h3>{errorMessage}</h3>
        </div>
      )}
      <div className="upload-story-form">
        <h1>Ανέβασμα Ιστορίας</h1>
        <form onSubmit={handleUpload}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
            />
          </label>
          <label>
            Content:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="form-input"
            />
          </label>
          <label>
            Audio URL:
            <input
              type="text"
              value={audio}
              onChange={(e) => setAudio(e.target.value)}
              className="form-input"
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              className="form-input"
            />
          </label>
          <label>
            Second Image URL:
            <input
              type="text"
              value={secondImage}
              onChange={(e) => setSecondImage(e.target.value)}
              required
              className="form-input"
            />
          </label>
          <label>
            Third Image URL:
            <input
              type="text"
              value={thirdImage}
              onChange={(e) => setThirdImage(e.target.value)}
              required
              className="form-input"
            />
          </label>
          <label>
            Small Description:
            <textarea
              value={smallDescription}
              onChange={(e) => setSmallDescription(e.target.value)}
              required
              className="form-input"
            />
          </label>
          <button type="submit" className="form-button">
            Upload Story
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadStory;
