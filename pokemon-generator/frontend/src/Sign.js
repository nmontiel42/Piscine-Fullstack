import React from "react";
import './index.css';
import './style.css';

const Sign = () => {

    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/github';
    };

    return (
        <body>   
            <div className="flex flex-col justify-center items-center h-screen p-6">
                {/* <div className="absolute top-[350px] lg:top-[375px] left-1/2 transform -translate-x-1/2 text-4xl">
                    📷
                </div> */}
                <div className="bg-white bg-opacity-90 shadow-xl border border-gray-300 rounded-lg p-6 lg:ml-[650px]"> 
                    <div className="bg-gray-400 bg-opacity-80 shadow-l boder rounded-xl p-3 w-64 mx-auto">
                        <h1 className="text-xl font-bold text-center">Welcome to:</h1>
                        <h2 className="text-xl text-center">𝓘𝓶𝓪𝓰𝓮 𝓒𝓻𝓮𝓪𝓽𝓸𝓻</h2>
                    </div>
                    <div className="flex flex-col justify-center items-left p-4">
                        <ol>
                            <li><b>1.</b> Write different characteristics for your image</li>
                            <li><b>2.</b> Click on 'Generate Image'</li>
                            <li><b>3.</b> Enjoy the result!</li>
                        </ol>
                    </div>
                    <button 
                        onClick={handleLogin} 
                        className="mt-4 ml-[55px] px-4 py-2 bg-black text-white rounded hover:bg-gray-500 lg:ml-[85px]"
                    >
                        Sign up with GitHub
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub logo" className="w-6 h-6 inline-block ml-2 mb-1 filter invert" /> 
                    </button>
                </div>
            </div>
        </body>
    );
}

export default Sign;