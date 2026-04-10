const Internships = () => {
    return (
        <>
            <h2 className="section-title">INTERNSHIPS</h2>
            <p className="internship-blurb">
                Capstone is a type of course that QUT students are obligated to
                complete in order to graduate. The university pairs teams of
                students with real life clients to develop solutions for them
                with the skills they developed over the course of their studies.
            </p>
            <div className="internships-container">
                <div className="internship-card">
                    <div className="internship-title">
                        <h3>QUT: IT Capstone</h3>
                        <div className="internship-time-location">
                            <p>Feb 2023 - Nov 2023</p>
                            <p>Brisbane, QLD</p>
                        </div>
                    </div>
                    <ul>
                        <li>
                            Worked in a team to develop a 3D animation of a
                            dental surgery for real-world clients (doctors from
                            the Royal Women’s Brisbane Hospital).
                        </li>
                        <li>
                            Established regular client meetings to refine
                            requirements, manage client expectations, present
                            progress and seek feedback on deliverables.
                        </li>
                        <li>
                            Contributed to modeling and animation of dental
                            structures using 3D Slicer, BlueSky.io and Blender.
                        </li>
                        <li>Awarded High Distinction for the course.</li>
                    </ul>
                </div>
                <div className="internship-card">
                    <div className="internship-title">
                        <h3>QUT: Math Capstone </h3>
                        <div className="internship-time-location">
                            <p>Feb 2024 - Nov 2024</p>
                            <p>Brisbane, QLD</p>
                        </div>
                    </div>
                    <ul>
                        <li>
                            My team was tasked with providing a meaningful
                            visualisation of environmental data within a given
                            context and from that data generate projections into
                            the future.
                        </li>
                        <li>
                            The project required technical IT knowledge to find,
                            format and create visualisations of large amounts of
                            data, generate data models that 'predict the future'
                            all the while presenting this information in such a
                            way as to be readable and meaningful for a
                            non-technical audience.
                        </li>
                        <li>
                            I was responsible for creating the model that
                            predicted the future conditions of the context and
                            for creating other preliminary data models.
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};
export default Internships;
