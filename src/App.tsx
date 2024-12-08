import { useState } from "react";
import Navbar from "./components/Navbar";
import NotesSection from "./components/NotesSection";
import { Route, Routes } from "react-router-dom";
import AddNote from "./components/AddNote";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
    <div className=" h-dvh w-full ">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex h-[calc(100vh-80px)] ">
          {/* Sidebar */}

          <div
            className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out lg:static lg:translate-x-0`}
          >
            <div className=" lg:hidden " onClick={toggleSidebar}>
              close
            </div>
            <ul>
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                Notes
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                Labels
              </li>
              {
                <>
                  <li className="px-8 py-2 hover:bg-gray-700 cursor-pointer">
                    games
                  </li>
                  <li className="px-8 py-2 hover:bg-gray-700 cursor-pointer">
                    tour
                  </li>
                  <li className="px-8 py-2 hover:bg-gray-700 cursor-pointer">
                    college
                  </li>
                  <li className="px-8 py-2 hover:bg-gray-700 cursor-pointer">
                    holiday
                  </li>
                  <li className="px-8 py-2 hover:bg-gray-700 cursor-pointer">
                    + Add label
                  </li>
                </>
              }

              <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
                Groups
              </li>
            </ul>
          </div>

          {/* Overlay for mobile when sidebar is open */}

          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-gray-100  overflow-x-scroll">
            {/* Main Content Area */}
            <div className="flex-1 p-4">
              <Routes>
                <Route path="/" element={<NotesSection />} />
                <Route path="/addnote" element={<AddNote />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
      <Signin/>
      <Signup/>   

      

    </>
  );
};

export default App;
