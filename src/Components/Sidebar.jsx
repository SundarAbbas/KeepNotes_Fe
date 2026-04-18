import React, { useState } from "react";
import { Menu, X, Home, Plus, icons, LogOut , Info , Flag ,  Star } from "lucide-react";
import { logout } from "../Services/authService";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  //   Navitems
  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Add Tasks", path: "/addTasks", icon: Plus },
    { name: "All Statuses", path: "/statuses", icon: Info },
    { name: "Add Status", path: "/addStatus", icon: Plus },
    { name: "All Priorites", path: "/priorities", icon: Star },
    { name: "Add Priority", path: "/addPriority", icon: Plus },
  ];
  return (
    <div className="flex h-screen overflow-hidden bg-gray-700">
      {/* Sidebar */}
      <aside
        className={`flex flex-col fixed z-20 w-64 h-full bg-black transition-all ${isOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 `}
      >
        <div className="font-extrabold text-white text-3xl p-4">
          Keep <span className="text-blue-500">Notes</span>{" "}
              </div>
              
        <nav className="p-4 flex flex-col flex-1">
            
          {navItems.map((item) => (
            <li  className="mb-4 bg-blue-200/50 px-2 rounded-sm hover:scale-95 transition-all py-2" key={item.name}>
              <a
                href={item.path}
                className="flex items-center gap-x-4 text-gray-200 hover:text-white transition-all"
              >
                <item.icon className="text-sky-400" size={20} />
                {item.name}
              </a>
            </li>
          ))}

          <button onClick={logout} className="mt-auto text-white flex items-center gap-x-2">
            {" "}
            <LogOut className="text-sky-400" /> Logout
          </button>
        </nav>
      </aside>

      {/* Side Content */}
      <div className="flex flex-1 flex-col bg-white">
        <header className="flex justify-between items-center p-4 bg-black shadow md:hidden">
            <div className="text-white font-extrabold text-xl">Keep <span className="text-blue-500">Notes</span></div>
          <button className="text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </header>

        <main className="p-6  overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
