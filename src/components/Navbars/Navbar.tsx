import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link";

export function Navbar() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    return (
        <>
            <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link href="/"
                            className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                        >
                            Sprint Point Calculator
                        </Link>
                        <button
                            className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <i className="text-white fas fa-bars"></i>
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
                            (navbarOpen ? " block rounded shadow-lg" : " hidden")
                        }
                        id="example-navbar-warning"
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            <li className="flex items-center">
                                <a
                                    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                                    href="https://github.com/acephasanudin/sprint-point"
                                    target="_blank"
                                >
                                    <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-github text-lg leading-lg " />
                                    <span className="lg:hidden inline-block ml-2">Star</span>
                                </a>
                            </li>
                            <li key="google" className="flex items-center">
                                <button
                                    className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                                    onClick={() => signIn('google', { callbackUrl: '/admin/point' })}>
                                    <img alt="..." className="w-5 mr-1 float-left" src="/img/google.svg" /> Login
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};
