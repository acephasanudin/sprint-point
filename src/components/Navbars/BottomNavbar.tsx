import Link from 'next/link'

export default function BottomNavbar() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex justify-around items-center text-white">
            <Link href="/admin/dashboard">
                Dashboard
            </Link>
            <Link href="/admin/point">
                Point
            </Link>
            <Link href="/admin/profiles">
                Profiles
            </Link>
        </nav>
    )
}
