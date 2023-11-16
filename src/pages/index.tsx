import BtnSignIn from "../components/Buttons/BtnSignIn";

export default function Home() {
    return (
        <main >
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Effortlessly Plan Your Agile Sprints</h1>
                        <p className="py-6">Welcome to the Sprint Point Calculator, the ultimate tool for Agile teams and project managers. Say goodbye to the guesswork and complexities of sprint planning. With our intuitive and powerful calculator, you can streamline your agile process, save time, and ensure every sprint is a success.</p>
                        <BtnSignIn />
                    </div>
                </div>
            </div>
        </main>
    );
}
