import LoadingWheel from "../../loadingWheel/LoadingWheel";

const LoadingPopup = () => {
   
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-md z-50">
        <div className=" p-6 rounded-xl text-center">
            <LoadingWheel />
          <h2 className="text-xl font-semibold text-pink-500">Placing Order...</h2>
        </div>
      </div>
    );
  };
  
  export default LoadingPopup;
  