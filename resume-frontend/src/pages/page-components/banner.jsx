const Banner = () => {
    const consolePrompt = "PS C:\\Hemble-Michael> ";
    return (
        <div class="banner-container">
            <div className="console-path">
                {consolePrompt}
                <span className="typed-text">echo "Hello World!"</span>
            </div>
            <h1 class="hello-world">Hello World!</h1>
            <div className="console-path">
                {consolePrompt}
                <span className="typed-text">echo $about-me</span>
            </div>
            <div class="about-me">
                My name is Hemble, I’m an Australian citizen with a Bachelor’s
                degree in Information Technologies and Mathematics. I love
                problem solving, building web applications with React and
                Node.js and am deeply interested in cloud engineering. I am
                familiar with a large body of programming languages and am
                capable of adapting to any and all situations with a clear and
                calm disposition.
            </div>
            <div className="console-path">
                {consolePrompt}
                <span className="typed-text"> Lets make some cool stuff!</span>
            </div>
        </div>
    );
};

export default Banner;
