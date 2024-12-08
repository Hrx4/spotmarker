import { useState } from "react";
import { HamIcon } from "../ui/icons/HamIcon";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [selected, setSelected] = useState([]);
  return (
    <div className=" sticky top-0 w-full h-20 bg-blue-500 text-white flex justify-between items-center px-6 lg:z-10">
      {selected.length !== 0 ? (
        <>
          <div className=" flex">
            <div>clear</div>
            <div>1 SELECTED</div>
          </div>
          <div className=" flex">
            <div>delete</div>
            <div>routing</div>
            <div>Add Group</div>
            <div>Add Label</div>
          </div>
        </>
      ) : (
        <>
          <div>
            <div onClick={toggleSidebar} className="cursor-pointer">
              <HamIcon/>
            </div>
            {isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black opacity-50 lg:hidden"
                onClick={toggleSidebar}
              ></div>
            )}
          </div>
          <div className=" font-bold text-2xl">SPOTMARKER</div>
          <div>PROFILE</div>
        </>
      )}
    </div>
  );
};



export default Navbar;
