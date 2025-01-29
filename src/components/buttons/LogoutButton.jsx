// import 'daisyui/dist/full.css'

const LogoutButton = ({ children, onClick }) => {
    return (
      <div>
        <button
          onClick={onClick}
          className="btn btn-outline btn-secondary w-80"
        >
          {children}
        </button>
      </div>
    );
  };
  
  export default LogoutButton;