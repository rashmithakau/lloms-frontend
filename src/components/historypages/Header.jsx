import React from "react";
import closeIcon from "../../assets/orderhistory/close.png"; // Adjust path as necessary

const Header = () => {
    return (
        <header className="relative p-4">
            {/* Close Button */}
            <img
                src={closeIcon}
                alt="Close"
                className="absolute top-4 right-4 w-8 h-8 cursor-pointer" // Positioned in the top-right corner
                onClick={() => console.log("Close button clicked")} // handle click event here
            />

            <br/>

        </header>
    );
};

export default Header;
