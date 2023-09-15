import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UploadComponent = () => {
  const [avatars, setAvatars] = useState({});
  const { petsister_id } = useParams();

  useEffect(() => {
    const putData = async () => {
      try {
        const data = new FormData(); // สร้าง FormData เพื่อเก็บไฟล์
        for (let avatarKey in avatars) {
          data.append("avatar", avatars[avatarKey]);
        }

        const response = await axios.put(
          `http://localhost:6543/petsitteruser/${petsister_id}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } catch (error) {
        console.error(error);
      }
    };

    // ให้ putData ทำงานเมื่อมีการเปลี่ยนแปลงใน avatars
    putData();
  }, [avatars, petsister_id]);

  const handleFileChange = (e) => {
    const uniqueId = Date.now();
    setAvatars({
      ...avatars,
      [uniqueId]: e.target.files[0],
    });

    // เรียก putData เมื่อมีการเปลี่ยนแปลงในไฟล์
    putData();
  };

  const handleRemoveImage = (avatarKey) => {
    const newAvatars = { ...avatars };
    delete newAvatars[avatarKey];
    setAvatars(newAvatars);

    // เรียก putData เมื่อมีการเปลี่ยนแปลงใน avatars
    putData();
  };

  return (
    <>
      <div className="input-container">
        <label htmlFor="upload">
          Avatar
          <input
            id="upload"
            name="avatar"
            type="file"
            onChange={handleFileChange}
          />
        </label>
        <div className="image-list-preview-container">
          {Object.keys(avatars).map((avatarKey) => {
            const file = avatars[avatarKey];
            return (
              <div key={avatarKey} className="image-preview-container">
                <img
                  className="image-preview"
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
                <button
                  className="image-remove-button"
                  onClick={() => handleRemoveImage(avatarKey)}
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UploadComponent;
