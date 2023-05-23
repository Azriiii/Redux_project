import * as React from "react";
import Typography from "@mui/material/Typography";

export default function PopoverPopupState() {
  const [showImage, setShowImage] = React.useState(false);
  const [showFullImage, setShowFullImage] = React.useState(false);
  const CustomContent = () => (
    <div style={{ backgroundColor: "lightblue", padding: "20px" }}>
      <Typography variant="body1">Custom Component Content</Typography>
      {/* Add your desired content and styling here */}
    </div>
  );
  const handleMouseEnter = () => {
    setShowImage(true);
  };

  const handleMouseLeave = () => {
    setShowImage(false);
  };

  const handleClick = () => {
    setShowFullImage(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "relative",
        }}
      >
        <button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#f0f0f0",
            border: "none",
            cursor: "pointer",
          }}
        >
          Hover over me
        </button>
        {showImage && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translate(-50%, 0)",
              width: "300px",
              height: "200px",
              marginTop: "10px",
              overflow: "hidden",
            }}
          >
                        <CustomContent showFullContent={showFullImage} />

          </div>
        )}
      </div>
    </div>
  );
}
