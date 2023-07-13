import React from "react";

function ErrorPage() {
  return (
    <>
      <div className="flex flex-col bg-red-400 border-red-600 border-[1rem] w-full h-full items-center justify-center">
        <i className="fa-solid fa-circle-exclamation text-4xl"></i>
        <br/>
       <div className="bold text-4xl">Error occurs during loading</div>
      </div>
    </>
  );
}

export default ErrorPage;
