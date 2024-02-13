import React from "react";
import toast, { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <div className="bg-red-500 font-bold">Randevu</div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default App;
