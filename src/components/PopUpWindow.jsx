import { useState } from "react";
import Item from "./Item";

function PopUpWindow(){
   
    const [isOpen, setIsOpen] = useState(false);
    const [mode, setMode] = useState("add"); // "add" or "view"

  return(
    <div className="min-h-screen flex flex-col items-center justify-start p-10 relative">
      {/* Main Content */}
      <div className={`w-full max-w-4xl p-6 ${isOpen ? "blur-sm" : ""}`}>
        
        <button
            onClick={() => {
              setIsOpen(true);
              setMode("add");
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            AddMe
          </button>

          <button
            onClick={() => {
              setIsOpen(true);
              setMode("view");
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            View
          </button>
      </div>

      {/* Add Component Popup */}
      {isOpen && (
        <div className="absolute top-20 w-full">
          
          <Item onClose={() => setIsOpen(false) } mode={mode} />
          
        </div>
      )}
    </div>
  )
}

export default PopUpWindow;