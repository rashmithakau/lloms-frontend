// import 'daisyui/dist/full.css'

const LogoutButton = ({ children, onClick }) => {
    return (
      <div>
        <button
          onClick={onClick}
          className="btn btn-outline btn-secondary w-80 h-10 hover:bg-pink-500 text-pink-800 rounded-md shadow-md hover:text-white outline-2  outline-pink-500"
        >
          {children}
        </button>
      </div>
    );
  };
  
  export default LogoutButton;