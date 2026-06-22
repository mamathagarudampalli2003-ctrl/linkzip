import { useState } from "react";

import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({
  children,
  activeTab,
  setActiveTab,
}) {

  const [openSidebar, setOpenSidebar] =
    useState(false);

  return (

    <div
      className="
        flex
        min-h-screen
        bg-[#030712]
        text-white
        transition-all
        duration-300
      "
    >

      {/* DESKTOP SIDEBAR */}

      <div className="hidden md:block">

        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

      </div>

      {/* MOBILE SIDEBAR */}

      <MobileSidebar
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* MAIN CONTENT */}

      <div
        className="
          flex-1
          flex
          flex-col
          overflow-hidden
        "
      >

        {/* TOPBAR */}

        <Topbar
          setOpenSidebar={setOpenSidebar}
        />

        {/* PAGE CONTENT */}

        <main
          className="
            flex-1
            overflow-y-auto
            w-full
            px-4
            md:px-8
            py-6
          "
        >

          {/* FULL WIDTH CONTENT */}

          <div
            className="
              w-full
            "
          >

            {children}

          </div>

        </main>

      </div>

    </div>

  );
}