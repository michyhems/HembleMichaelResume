//const fetch = require("node-fetch");
const marked = require("marked");

async function fetchRepo(req, res, next) {
    const ghRes = await fetch(
        `https://api.github.com/repos/michyhems/${req.body.repo}/README.md`,
        {
            headers: {
                Accept: "application/vnd.github.v3.raw",
            },
        },
    );

    const markdown = await ghRes.text();

    const html = marked.parse(markdown);

    req.html = html;
    next();
}

module.exports = fetchRepo;
