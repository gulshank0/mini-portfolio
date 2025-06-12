export default function Contact() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            <h1 className="text-4xl font-bold mb-6">Contact</h1>
            <p className="text-lg text-gray-100">Feel free to reach out to me:</p>
            <ul className="list-disc mt-4">
                <li>Email: <a href="mailto:your-email@example.com">your-email@example.com</a></li>
                …   
                <li>LinkedIn: <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">your-profile</a></li>
                <li>GitHub: <a href="https://github.com/your-profile" target="_blank" rel="noopener noreferrer">your-profile</a></li>
            </ul>
        </div>
    );
}
                    