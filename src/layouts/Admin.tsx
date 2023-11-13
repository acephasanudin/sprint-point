import React from "react";
import Header from '../components/Headers/Header'
import Footer from '../components/Footers/Footer'
import BottomNavbar from "../components/Navbars/BottomNavbar";
import { Flowbite } from "flowbite-react";

type AdminProps = {
    children: React.ReactNode;
};
export default function Admin({ children }: AdminProps) {
    return (
    <Flowbite>
        <div className="flex flex-col min-h-screen">
            <Header />
                <main className="flex-1">{children}</main>
            <Footer />
            <BottomNavbar />
        </div>
    </Flowbite>
    );
}
