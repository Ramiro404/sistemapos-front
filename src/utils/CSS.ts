import bgImage from "../assets/blob-scene-haikei.svg";

export const backgroundStyle = {
    backgroundImage: `url("${bgImage}")`, // Add path to your SVG file
    backgroundSize: 'cover', // Ensure the image covers the entire screen
    backgroundPosition: 'center', // Center the background
    backgroundAttachment: 'fixed', // Optional: keeps the background fixed while scrolling
    height: '100vh', // Ensure the container takes the full viewport height
    width: '100vw', // Ensure the container takes the full viewport width
    margin: 0, // Remove margin
    padding: 0, // Remove padding
  };