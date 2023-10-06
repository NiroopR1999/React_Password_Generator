import "./style.css";
import { useState } from "react";
import { usePasswordGenerator } from "./usePasswordGenerator";

export default function App() {
  const [checkBoxData, setCheckBoxData] = useState([
    { title: "Include Uppercase", state: false },
    { title: "Include Lowercase", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);
  const [copy, setCopy] = useState(false);
  const [length, setLength] = useState(8); // Default password length

  // Function to handle checkbox clicks
  const handleCheckBox = (index) => {
    const updatedCheckBoxData = [...checkBoxData];
    updatedCheckBoxData[index].state = !updatedCheckBoxData[index].state;
    setCheckBoxData(updatedCheckBoxData);
  };

  // Custom hook to generate passwords
  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  // Function to handle copying the password to the clipboard
  const handleCopy = () => {
    if (password) {
      console.log("Before copying to clipboard");
      navigator.clipboard
        .writeText(password)
        .then(() => {
          console.log("Password copied successfully");
        })
        .catch((error) => {
          console.error("Error copying password:", error);
        });
      console.log("After copying to clipboard");

      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 1000); // Reset the "copy" state after 1 second
    }
  };

  return (
    <>
      <div className="container">
        {/* Password text and copy button */}
        {password && (
          <div className="header">
            <div className="title">{password}</div>
            <button className="copyBtn" onClick={handleCopy}>
              {copy ? "Copied" : "Copy"}
            </button>
          </div>
        )}

        {/* Password length input */}
        <div className="charLength">
          <span>
            <label>Password Length</label>
            <label>{length}</label>
          </span>
          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            style={{ color: "red" }}
          />
        </div>

        {/* Checkboxes */}
        <div className="checkboxes">
          {checkBoxData.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={item.state}
                onChange={() => handleCheckBox(index)}
              />
              <label>{item.title}</label>
            </div>
          ))}
        </div>

        {/* Error handling */}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}

        {/* Generate button */}
        <button
          className="generateBtn"
          onClick={() => generatePassword(checkBoxData, length)}
        >
          GENERATE PASSWORD
        </button>
      </div>
    </>
  );
}
