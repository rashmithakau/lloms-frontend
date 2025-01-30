import { useState } from "react";

const NotificationButton = () => {
  const [count, setCount] = useState(10); // Example notification count

  return (
    <button className="relative p-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none">
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V10a6 6 0 10-12 0v4c0 .386-.149.755-.405 1.052L4 17h5m6 0a3 3 0 11-6 0"
        />
      </svg>
      {count > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-pink-500 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};

export default NotificationButton;
