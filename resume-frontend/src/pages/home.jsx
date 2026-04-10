import "./styling.css";
import Sidebar from "./page-components/sidebar";
import Projects from "./page-components/projects";
import Banner from "./page-components/banner";
import Internships from "./page-components/internships";
const Home = () => {
    return (
        <>
            <div class="content-box">
                <div class="education-sidebar">
                    <Sidebar></Sidebar>
                </div>
                <div class="main-content" id="main-content">
                    <Banner></Banner>
                    <div class="option">
                        <Sidebar></Sidebar>
                    </div>
                    <Projects></Projects>
                    <Internships></Internships>
                </div>
            </div>
        </>
    );
};
export default Home;
