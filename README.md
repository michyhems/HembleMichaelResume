# Full Stack Resume Web Application

This web app was a way for me to display my details and my projects in a single sleek build while also displaying my skills with backend development and deployment.
<br>
**Note:** The backend was created using the Bash Console App project found [here](https://github.com/michyhems/BashConsoleApp).
<br>
[Live demo](https://hemblemichaelresume-demo.onrender.com/)
<br>

## Requirements

### Frontend

- Aesthetically pleasing, prefferably dark mode.
- Responsive UI
- Informaiton is clear and accessible
- Blog post displaying readme for each project

### Backend

- Low latency in project display
- Data security
- Production grade build and deployment
- Automatic updation if/when readme is ammended

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
- Automatic updation if/when readme is ammended

### Tech Stack

#### Frontend

- React (Framework)
- react-router-dom (client-side naviagtion)
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
- Google Cloud Run (serverless hosting)

### Project Structure

```text
root/
├──resume-frontend/
|  ├──src/
|  |  └──App.jsx                    # Contains routes for home view and blog view
|  |  ├──api/
|  |  |  └──axios.js                # Contains axios connection to backend
|  |  ├──pages/
|  |  |  └──home.jsx                # Provides the layout of the home view by collating the various components from page-components/
|  |  |  └──styling.css             # Styling and responsive layout for entire application
|  |  |  ├──page-components/
|  |  |  |  └──banner.jsx           # Banner component (The console where the typing animation takes place)
|  |  |  |  └──blog.jsx             # Blog component which displays the text from the READEME.md of each project
|  |  |  |  └──internships.jsx      # Internships component which displays the information about the internships as cards at the bottom of the page
|  |  |  |  └──projects.jsx         # Projects component, queries the backend through axios and displays the titles and thumbnails of projects stored in the database
|  |  |  |  └──sidebar.jsx          # Sidebar component, displays the contact and education details in a fixed sidebar
|
├──resume-backend/
|  ├──config/
|  |  └──cors.js                    # Contains the CORS whitelist
|  ├──middleware/
|  |  └──authenticate.js            # Endpoint protection middleware (requires secret key to access)
|  |  └──fetchRepo.js               # Fetches the README.md content from each project repository (used in creation and update endpoints)
|  |  └──getEntry.js                # Fetches a project from the database by id
|  ├──models/
|  |  └──project.js                 # Mongoose schema
|  ├──routes/
|  |  └──api.js                     # API endpoints
|  └──.gitignore
|  └──compose.yaml                  # Docker compose file which manages the node.js application image
|  └──dockerfile                    # Generates the node.js application image
|  └──server.js                     # Runs node.js application by recieving requests and connecting to database
|  └──test.rest                     # Tests API endpoints through VSCode extension (REST.Client)
```

### Security

#### Access

The frontend is accessible to anyone with the link, however the backend requires a private key to be in the header of any request:

```javascript
//root/resume-frontend/src/pages/page-components/projects.jsx

const getProjects = async () => {
    try {
        const response = await axios.get(`/titles`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_SECRET}`,
            },
            signal: controller.signal,
        });
        setProjectList(response.data);
    } catch (err) {
        console.error(err);
    }
};
```

That private key is then checked by middleware:

```javascript
//root/resume-backend/middleware/authenticate.js

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
            return res.status(401).json({ message: "Unauthorised entry." });
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }

    next();
}

module.exports = authenticate;
```

#### Secrets

Secrets such as the API_SECRET and the database acess link are stored in .env files in development. Below are the list of secrets necessary to run the application:
<br>
Backend:

- SERVER_HOST_PORT
- SERVER_CONTAINER_PORT
- DATABASE_URL
- API_SECRET
  The server ports are used in the compose.yaml and the server.js file in "root/resume-backend/" and defines what ports the server listens to.
  <br>
  Frontend:
- VITE_APP_SERVER_URL
- VITE_API_SECRET
  Note: The API_SECRET in the backend and the VITE_API_SECRET in the frontend must contain the same value.

### API Endpoints

| Method | Endpoint  | Description                                                                                                               |
| :----- | :-------- | :------------------------------------------------------------------------------------------------------------------------ |
| GET    | /         | Retrieves all entries in the database.                                                                                    |
| GET    | /titles   | Retrieves the id, titles and thumbnails of all entries in the database (used in the main view of the frontend).           |
| GET    | /blog/:id | Retrieves the markdown content of a project, selected by the user, stored in the database.                                |
| POST   | /         | Creates an entry in the database.                                                                                         |
| POST   | /sync     | Updates the readme content stored in the database (requested by GitHub Actions upon updating the READEME.md in the repo). |
| PATCH  | /:id      | Updates a particular entry in the database.                                                                               |
| DELETE | /:id      | Deletes a particular entry of the database.                                                                               |

### Routing

A feature of the frontend which switches between the main view (details about me and a list of projects) and a blog post about the projects (pulled from the readme files of the project repos). The routing is implemented through react-router-dom:

```html
<!--main/hemble-michael-resume/src/App.jsx-->

<BrowserRouter>
    <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/blog/:repo" element={<Blog></Blog>} />
    </Routes>
</BrowserRouter>
```

The user selects a project from the main view and the id of the project is passed as a parameter onto the blog view. It is then used in a GET request as seen in the table above (/blog/:id):

```javascript
const getBlog = async () => {
    try {
        const response = await axios.get(`/blog/${repo}`, {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_SECRET}`,
            },
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

Testing was undertaken through th

### Deployment

####Frontend
Render.com's free tier is sufficient to host static sites with low latency. In the background they use

The three main components of the application, frontend, backend and database are all being hosted on seperate platforms. The frontend is being hosted on Render.com. while the
backend server is running on Google Cloud Run. Google Cloud Run is Google's serverless hosting instance and is a practical and cost effective way of running the application. Additionally, MongoDB Atlas stores the data for the site.
