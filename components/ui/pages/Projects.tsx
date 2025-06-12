export default function Projects() {
    return (
        <div className="flex flex-col gap-8 pt-30 pb-20 py-8 bg-black text-white">
            <h2 className="text-3xl font-bold text-center mb-6">My Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* First Project Card */}
                <div className="bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                        <img 
                            src="/project1.jpg" 
                            alt="Project 1" 
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-purple-900/50 text-white px-3 py-1 rounded-full text-sm">
                            Live
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-semibold mb-2">E-Commerce Platform</h3>
                        <p className="text-gray-300 mb-4">
                            A full-stack e-commerce platform built with React, Node.js, and MongoDB.
                            Features include user authentication, product filtering, cart functionality,
                            and payment processing.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">React</span>
                            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">Node.js</span>
                            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">MongoDB</span>
                            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">Stripe</span>
                        </div>
                        <div className="flex space-x-4">
                            <a href="https://myproject1.com" target="_blank" rel="noopener noreferrer" 
                               className="bg-purple-900/50 hover:bg-purple-700/50 text-white px-4 py-2 rounded-md transition-colors">
                                View Live
                            </a>
                            <a href="https://github.com/myusername/project1" target="_blank" rel="noopener noreferrer"
                               className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md transition-colors">
                                Source Code
                            </a>
                        </div>
                    </div>
                </div>

                {/* Second Project Card */}
                <div className="bg-gray-950 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative">
                        <img 
                            src="/project2.jpg" 
                            alt="Project 2" 
                            className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-purple-900/50 text-white px-3 py-1 rounded-full text-sm">
                            Live
                        </div>
                    </div>
                    <div className="p-6">
                        <h3 className="text-2xl font-semibold mb-2">AI Content Generator</h3>
                        <p className="text-gray-300 mb-4">
                            An AI-powered content generation tool that creates blog posts, product descriptions,
                            and social media content. Built with Next.js and integrated with OpenAI API.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">Next.js</span>
                            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">TypeScript</span>
                            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
                            <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">OpenAI API</span>
                        </div>
                        <div className="flex space-x-4">
                            <a href="https://myproject2.com" target="_blank" rel="noopener noreferrer"
                               className="bg-purple-900/50 hover:bg-purple-700/50 text-white px-4 py-2 rounded-md transition-colors">
                                View Live
                            </a>
                            <a href="https://github.com/myusername/project2" target="_blank" rel="noopener noreferrer"
                               className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-md transition-colors">
                                Source Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}