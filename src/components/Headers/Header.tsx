import { DarkThemeToggle } from 'flowbite-react';

export default function Header() {
    return (
        <>
            <header className="p-4">
                <div className="float-right">
                    <DarkThemeToggle />
                </div>
                <div className="lg:flex lg:justify-between">
                    Header
                </div>
            </header>
        </>
    )
}
