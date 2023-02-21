import React from "react";

export default function LoadingSpinner() {
  return (
    <>
      <div className="background">
        <div className="loding"></div>
      </div>
      <style jsx>{`
        .background {
          z-index: 1;
          position: fixed;
          width: 100%;
          height: 100%;
        }
        .loding {
          z-index: 100;
          box-sizing: border-box;
          position: absolute;
          top: 40%;
          left: 40%;
          width: 64px;
          height: 64px;
          margin-top: -32px;
          margin-left: -32px;
          border-radius: 50%;
          border: 5px solid transparent;
          border-top-color: black;
          animation: loading 0.8s ease infinite;
        }
        @keyframes loading {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
