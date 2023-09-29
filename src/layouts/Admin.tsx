import React from "react";
import AdminNavbar from "../components/Navbars/adminNavbar";
import Sidebar from "../components/Sidebars/Sidebar";
import HeaderStats from "../components/headers/headerStats";
import FooterAdmin from "../components/footers/footerAdmin";

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
