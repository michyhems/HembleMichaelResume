const Sidebar = () => {
    let skills = [
        "C#",
        "JavaScript",
        "React",
        "Node.js",
        "HTML",
        "CSS",
        "Python",
        "SQL",
        "Blender",
        "OOP",
        "PBP",
        "Docker",
        "Problem Solving",
        "Agile",
        "Stakeholder Management",
        "Communication",
        "CI/CD Pipelines",
        "DevOps",
        "Quick Learner",
        "Analytical Thinking",
        "Problem Solving",
        "Bilingual",
        "CPR and First Aid Training",
    ];
    //Determine if the user prefers reduced motion: turn marquee off if that is the case.
    const motionPreference = !window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    //Doubles the content of the marquee to create a clean infinite scroll.
    if (!motionPreference) {
        const duplicate = skills.slice();
        skills = [...skills, ...duplicate];
    }

    //marquee component
    const skillsElement = (direction) => (
        <>
            <div
                class="wrapper"
                data-animated={true}
                data-direction={direction}
            >
                <ul class="skillElement">
                    {skills.map((skill) => (
                        <li class="skill">{skill}</li>
                    ))}
                </ul>
            </div>
        </>
    );

    return (
        <>
            <div class="sidebar-container">
                <div class="profile-picture">
                    <div class="profile-image"></div>
                    <h3>Hemble Michael</h3>
                </div>
                <div class="skills">
                    <h3>Skills</h3>
                    {skillsElement("left")}
                    {skillsElement("right")}
                </div>
                <div class="education">
                    <h3>Education</h3>
                    <p>High School (12th grade)</p>
                    <div class="institution" id="high-school"></div>
                    <p>University (Bachelor’s of IT and Mathematics)</p>
                    <div class="institution" id="university"></div>
                </div>
                <div className="contact-me">
                    <h3>My Details</h3>
                    <ul>
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#e3e3e3"
                            >
                                <path d="M536.5-503.5Q560-527 560-560t-23.5-56.5Q513-640 480-640t-56.5 23.5Q400-593 400-560t23.5 56.5Q447-480 480-480t56.5-23.5ZM480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                            </svg>
                            Sunshine Coast
                        </li>
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#e3e3e3"
                            >
                                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                            </svg>{" "}
                            michyhems@gmail.com
                        </li>
                        <li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#e3e3e3"
                            >
                                <path d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                            </svg>{" "}
                            0421 398 886
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
export default Sidebar;
