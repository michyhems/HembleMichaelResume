const Internships = () => {
    return (
      <>
        <h2 className="section-title">Experience</h2>

        <div className="internships-container">
          <div className="internship-card">
            <div className="internship-title">
              <h3>Admin Officer at PTSS (Patient Travel Subsidy Scheme)</h3>
              <div className="internship-time-location">
                <p>July 2026 - Current</p>
                <p>Sunshine Coast, QLD</p>
              </div>
            </div>
            <ul>
              <li>
                Main responsibilities involving data entry, form verification,
                and account payments.
              </li>
              <li>
                Perform high-volume data entry while maintaining confidentiality
                and attention to detail.
              </li>
              <li>
                Liaise with patients, medical practices, specialists,
                accommodation providers, and internal teams to resolve
                application issues.
              </li>
              <li>Handling sensitive personal and medical information.</li>
            </ul>
          </div>
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
                Worked in a team to develop a 3D animation of a dental surgery
                for real-world clients (doctors from the Royal Women’s Brisbane
                Hospital) as part of a University course.
              </li>
              <li>
                Established regular client meetings to refine requirements,
                manage client expectations, present progress and seek feedback
                on deliverables.
              </li>
              <li>
                Contributed to modeling and animation of dental structures using
                3D Slicer, BlueSky.io and Blender.
              </li>
              <li>Awarded High Distinction for the course.</li>
            </ul>
          </div>
        </div>
      </>
    );
};
export default Internships;
