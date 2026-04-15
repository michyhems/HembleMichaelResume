# Full Stack Resume Web Application

The following is the documentation for my full stack resume website.

## Motivation

I needed a way to present my projects and their documentation as well as present my ability to design, construct and manage backend operations. I found that my constrained budget was a limiting factor and yet that forced me to learn much about cloud engineering and DevOps to find the most expedient and cost effective solution.

## Overview

This is a full stack web application composed of a frontend, a backend server, a database and a GitHub Actions workflow. Through this I will have demonstrated skills in user-oriented design, backend development, containerisation, CI/CD pipelines via GitHub Actions and cloud deployment.

[Live demo](https://hemblemichaelresume.onrender.com) | [GitHub Repository](https://github.com/michyhems/HembleMichaelResume)

**Note:** The backend server was created using my own Bash Console App project found [here](https://github.com/michyhems/BashConsoleApp).

### Architecture

Architecture diagram:

![Architecture Diagram](https://www.dropbox.com/scl/fi/jhpo3sr4i7sy4skz1wr5x/Screenshot-2026-04-11-143434.png?rlkey=8mhzuipt7korzgunwab5gy2kc&st=sp1fmmod&raw=1)

This diagram details a client-to-server design pattern with two distinct starting points:

- As the frontend loads it sends a request to the server to provide information concerning projects.
- The server passes the request on to the database and returns the output.

This is quite standard for most resume sites. However, because the content of the blog posts (including this one) comes from the README.md file stored in the associated project's repository:

- When a developer commits changes to the README.md of any project, it triggers GitHub Actions to send a request to the backend.
- The backend will then query the database and update the content.

## Implementation

### Features

#### Frontend

- Dark mode
- Responsive UI
- Animated 'about me' section that draws the eye
- Stylised blogpost

#### Backend

- Protected API endpoints
- MongoDB storage
- 24/7 uptime
- Low latency
- Automatic integration if/when README.md in any project is amended

### Tech Stack

#### Frontend

- React (Framework)
- react-router-dom (client-side navigation)
- Axios (backend connectivity)
- CSS (incl. Grid, Flex) (styling and responsive layout)
- Render.com (deployment)

#### Backend

- Node.js (backend runtime environment)
- Express (backend framework)
- MongoDB Atlas (database/database hosting)
- Docker (containerisation)
- Docker compose (manage container)
- GitHub Actions (CI/CD)
- Fly.io (deployment)

### Security

#### Access

The frontend is accessible to anyone with the link. However, creating, updating and deleting entries from the database requires a unique authentication token:

```javascript
`root/resume-backend/middleware/authenticate.js`;

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader) {
            return res.status(400).json({ message: "No token provided." });
        }
        const token = authHeader.split(" ");
        if (token.length === 1) {
            return res.status(400).json({ message: "Invalid request." });
        }
        if (token[1] !== process.env.API_SECRET) {
            return res.status(403).json({ message: "Unauthorised entry." });
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }

    next();
}

module.exports = authenticate;
```

**Note**: The small scale and low sensitivity of the data prompted me to go with a simpler authentication method. However, in true production contexts JWT's and role-based authentication is to be preferred.

### API Endpoints

Public Endpoints:
| Method | Endpoint | Description |
| :----- | :-------- | :---------------------------------------------------------------------------------------------------------------------- |
| GET | / | Retrieves all entries in the database. |
| GET | /titles | Retrieves the id, titles and thumbnails of all entries in the database (used in the main view of the frontend). |
| GET | /blog/:id | Retrieves the markdown content of a project, selected by the user, stored in the database. |

Protected Endpoints:
| Method | Endpoint | Description |
| :----- | :-------- | :---------------------------------------------------------------------------------------------------------------------- |
| POST | / | Creates an entry in the database. |
| POST | /sync | Updates the README.md content stored in the database (triggers GitHub Actions upon updating the README.md in the repo). |
| PATCH | /:id | Updates a particular entry in the database. |
| DELETE | /:id | Deletes a particular entry of the database. |

### Syncing README.md

A CI/CD pipeline that connects each project repository and the backend. A GitHub Actions workflow was initialised in each project, that upon commits to the README.md file, would send a /sync request to the backend and update the content in the database.

Additionally, both Render and Fly.io are set up to redeploy upon commits to GitHub.

### Routing

A feature of the frontend which switches between the main view (details about me and a list of projects) and a blog post about the projects (pulled from the README.md files of the project repos). The routing is implemented through react-router-dom.

The user selects a project from the main view and the id of the project is passed as a parameter onto the blog view. It is then used in a GET request as seen in the table above (/blog/:id):

```javascript
`root/resume-frontend/src/pages/page-components/blog.jsx`;

const getBlog = async () => {
    try {
        const response = await axios.get(`/blog/${repo}`, {
            signal: controller.signal,
        });
        setThumbnail(response.data.thumbnail);
        setDescription(response.data.description);
        setContent(response.data.readmeHtml);
    } catch (err) {
        console.error(err);
    }
};
```

### Testing

During development the API endpoints were tested using the REST.Client VSCode extension. Then more rigorous testing was employed using jest and supertest. Those tests can be found in the tests directory in the backend:

```text
root/
├──resume-backend/
|  ├──tests/
|  |  ├──api.test.js
|  |  └──test.rest
```

The UI went through several rounds of user feedback to pinpoint bugs and errors. There was a mock deployment that allowed me to display the frontend to various technical and non-technical users.

### Deployment

#### Frontend

Render.com's free tier is sufficient to host static sites with low latency. In the background they use AWS to host their client's content and Cloudflare to provide security. Content is served using their own global CDN that enables quick delivery of content. All of this is available on their free tier. However, the web-hosting capabilities on the free tier experiences cold-starts and can take up to a minute to load.

#### Backend

Initially, I hosted the backend on Render.com's free tier but the loading time was intolerable. At first I looked to mitigate it by setting up cron jobs to query the backend. However, that went against Render's terms of service.

I set up a temporary stop gap by serving the database's content using a json file to keep the service available while I looked for a long term solution. This was a viable short-term solution as there was not a large amount of data.

After cycling through several plans from hosting the service on my own machine to biting the bullet and paying for a higher quality service I decided to go for a middle ground.

Fly.io is a third party hosting service that can run containerised images. It has flexible payment plans and is both reliable and affordable.

## Future Improvements

I would like to reach a point (and a budget) that would allow me to take responsibility of more of the infrastructure that my projects run on. Hosting my projects on my own PC, managing security and scalability is a long term goal that I am always striving toward.

## Installation Guide

Clone the repository:

```bash
git clone https://github.com/michyhems/HembleMichaelResume.git
```

### Project Structure

The repository will have this structure:

```text
root/
├──resume-frontend/
|  ├──src/
|  |  ├──App.jsx                    # Contains routes for home view and blog view
|  |  ├──api/
|  |  |  └──axios.js                # Contains axios connection to backend
|  |  ├──pages/
|  |  |  ├──home.jsx                # Layout of the home view by collating the components from page-components/
|  |  |  ├──styling.css             # Styling and responsive layout for entire application
|  |  |  ├──page-components/
|  |  |  |  ├──banner.jsx           # Banner component (The console where the typing animation takes place)
|  |  |  |  ├──blog.jsx             # Blog component which displays the README.md of each project stored in the DB
|  |  |  |  ├──internships.jsx      # Displays the information about the internships as cards at the bottom of the page
|  |  |  |  ├──projects.jsx         # Queries the backend through axios and displays the titles and thumbnails of projects
|  |  |  |  └──sidebar.jsx          # Sidebar component, displays the contact and education details in a fixed sidebar
|
├──resume-backend/
|  ├──config/
|  |  └──cors.js                    # Contains the CORS whitelist
|  ├──middleware/
|  |  ├──authenticate.js            # Endpoint protection middleware (requires secret key to access)
|  |  ├──fetchRepo.js               # Fetches the README.md content from each project repository
|  |  └──getEntry.js                # Fetches a project from the database by id
|  ├──models/
|  |  └──project.js                 # Mongoose schema
|  ├──routes/
|  |  └──api.js                     # API endpoints
|  ├──tests/
|  |  ├──api.test.js                # Tests API endpoints through jest and supertest
|  |  └──test.rest                  # Tests API endpoints through VSCode extension (REST.Client)
|  ├──.gitignore
|  ├──compose.yaml                  # Docker compose file which manages the node.js application image
|  ├──dockerfile                    # Generates the node.js application image
|  └──server.js                     # Runs node.js application by receiving requests and connecting to database
|
├──.github/
|  ├──workflows/
|  |  └──sync-readme.yml            # Initialises GitHub Actions to send /sync request to backend upon README.md
```

### Set up the backend

Install packages

```bash
cd resume-backend
npm install
```

Initialise the environment variables in a .env file (make sure it is listed in .gitignore):

```text
SERVER_HOST_PORT=#Delete if not containerising
SERVER_CONTAINER_PORT=#Define port for server to listen on
DATABASE_URL=#Database connection string
API_SECRET=#API secret (authenticates requests for protected endpoints)
```

While in the backend directory run:

```bash
npm run dev
```

It should output:

```bash
Server listening on $PORT
Connected to database
```

If containerising:

```bash
docker compose up
```

### Set up the frontend

Install packages

```bash
cd resume-frontend
npm install
```

Initialise the environment variables in a .env file:

```text
VITE_APP_SERVER_URL=#backend link
```
