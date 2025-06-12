export default function Projects() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black">
            <h1 className="text-4xl text-white font-bold mb-6">Projects</h1>
            <p className="text-lg text-gray-100">Here are some of my projects:</p>
            <ul className="list-disc text-white mt-4">
                <li>Project A</li>
                <li>Project B</li>
                <li>Project C</li>
                <li>Project D</li>
                <li>Project E</li>
            </ul>
        </div>
    );
}