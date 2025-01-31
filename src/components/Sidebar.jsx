import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import LogoutButton from "./buttons/LogoutButton";
import SliderNavButton from "./buttons/SliderNavButton";
import ProfilePhoto from "./ProfilePhoto";

const Sidebar = (
  { isOpen, toggleSidebar },
  sliderExpandWidth,
  sliderNotExpandWidth
) => {
  const navItems = [
    {
      nameBtn: "POS",
      fun: () => {
        console.log("POS clicked!");
      },
      iconUrl: "src/assets/icons/cashier.png",
    },
    {
      nameBtn: "ORDER",
      fun: () => {
        console.log("Order clicked!");
      },
      iconUrl: "src/assets/icons/cashier.png",
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-linear-65 from-purple-50 to-pink-100 text-black shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? `w-${sliderExpandWidth}` : `w-${sliderNotExpandWidth}`
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-pink-300">
        {isOpen && <h2 className="text-2xl font-bold text-pink-800">Little Lanka Pvt Ltd</h2>}
        <button
          onClick={toggleSidebar}
          aria-expanded={isOpen}
          aria-label="Toggle sidebar"
          className="p-2 rounded-full bg-pink-200 hover:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-md"
        >
          {isOpen ? (
            <ChevronLeftIcon className="h-6 w-6 text-pink-600" />
          ) : (
            <ChevronRightIcon className="h-6 w-6 text-pink-600" />
          )}
        </button>
      </div>

      {/* Profile Section */}
      {isOpen && (
        <div className="flex flex-col items-center justify-center p-10 bg-pink-50 rounded-lg shadow-md m-5">
          <ProfilePhoto
            src="src/assets/profileImages/mathara.jpg"
            alt="User Profile"
            size={10} // Adjust size in rem
            border={true}
          />
          <h2 className="mt-4 text-lg font-semibold text-pink-700">Matara Outlet</h2>
        </div>
      )}

      {/* Navigation */}
      <nav className={`mt-6 ${isOpen ? "px-4" : "px-2"}`}>
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.nameBtn} className="flex items-center">
              {!isOpen && (
                <div className="w-8 h-8 flex justify-center items-center hover:bg-pink-400 bg-pink-200 rounded-md shadow-md">
                  <img
                    src={item.iconUrl}
                    alt={`${item.nameBtn} icon`}
                    className="w-6 h-6"
                  />
                </div>
              )}
              {isOpen && (
                <SliderNavButton
                  onClick={item.fun}
                  icon={item.iconUrl}
                  className="hover:bg-pink-300 text-pink-800"
                >
                  {item.nameBtn}
                </SliderNavButton>
              )}
            </li>
          ))}
          {isOpen && (
            <li>
              <LogoutButton
                onClick={() => console.log("Logout clicked!")}
                className="hover:bg-pink-300 text-pink-800"
              >
                Logout
              </LogoutButton>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
