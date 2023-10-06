import { useState } from "react";

export const usePasswordGenerator = () => {
  // Initialize state variables for the generated password and error message
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Function to generate a password based on user input
  const generatePassword = (checkBoxData, length) => {
    let charset = "";
    const selectedCheckBoxes = checkBoxData.filter((item) => item.state);

    // Check if at least one option is selected
    if (selectedCheckBoxes.length === 0) {
      setErrorMessage("Please select at least one option");
      setPassword(""); // Clear the password if no option is selected
    } else {
      // Loop through the selected options and build the character set
      selectedCheckBoxes.forEach((item) => {
        switch (item.title) {
          case "Include Uppercase":
            charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            break;
          case "Include Lowercase":
            charset += "abcdefghijklmnopqrstuvwxyz";
            break;
          case "Include Numbers":
            charset += "0123456789";
            break;
          case "Include Symbols":
            charset += "!@#$%^&*()_+";
            break;
          default:
            break;
        }
      });

      // Generate the password using the character set and specified length
      let generatedPassword = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
      }

      // Set the generated password and clear any previous error message
      setPassword(generatedPassword);
      setErrorMessage("");
    }
  };

  // Return the generated password, error message, and the generatePassword function
  return { password, errorMessage, generatePassword };
};
