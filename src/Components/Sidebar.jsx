import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Plus,
  icons,
  LogOut,
  Flag,
  ListTodo,
  Settings,
  HelpCircle,
  List,
} from "lucide-react";
import { logout } from "../Services/authService";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const Logout = async () => {
    setLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      await new Promise((resolve) =>
        setTimeout(() => {
          logout();
        }, 1000),
      );
    } catch (er) {
      console.log(er);
    } finally {
      setLoading(false);
    }
  };
  //   Navitems
  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "My Tasks", path: "/tasks", icon: ListTodo },
    { name: "Categories", path: "/statuses", icon: List },
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "Help", path: "/help", icon: HelpCircle },
  ];
  return (
    <div className="flex h-screen overflow-hidden bg-gray-700">
      {/* Sidebar */}
      <aside
        className={`flex flex-col fixed z-20 w-64 lg:w-80  h-full bg-black transition-all ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 `}
      >
        <div className="font-extrabold text-center text-white text-3xl p-4">
          Keep <span className="text-blue-600">Notes</span>{" "}
        </div>

        <p className="text-white text-center font-bold">
          {" "}
          {localStorage.getItem("user")}
        </p>
        <nav className="p-4 flex  flex-col flex-1">
          {navItems.map((item) => (
            <li className="mb-2 list-none " key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-x-4 p-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-white text-blue-500 "
                      : "text-gray-200 hover:bg-blue-400 hover:text-white"
                  }`
                }
              >
                <item.icon size={20} />
                <span className="text-md font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
          <button
            onClick={() => Logout()}
            className={`mt-auto text-md rounded-xl text-white hover:bg-blue-400 p-3 gap-x-4  flex items-center gap-x-2 ${loading ? "cursor-not-allowed" : ""}`}
          >
            {" "}
            <LogOut size={20} className="text-white" />
            {loading ? "Logging Out" : "Logout"}
          </button>
        </nav>
      </aside>

      {/* Side Content */}
      <div className="flex flex-1 flex-col bg-white">
        <header className="flex justify-between items-center p-4 bg-black shadow md:hidden">
          <div className="text-white font-extrabold text-xl">
            Keep <span className="text-blue-500">Notes</span>
          </div>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </header>

        <main className=" overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
