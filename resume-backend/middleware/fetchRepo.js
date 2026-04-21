//const fetch = require("node-fetch");
const marked = require("marked");

async function fetchRepo(req, res, next) {
    let html;
    try {
        const ghRes = await fetch(
            `https://api.github.com/repos/michyhems/${req.body.repo}/readme`,
            {
                headers: {
                    Accept: "application/vnd.github.v3.raw",
                },
            },
        );
        if (!ghRes.ok) {
            return res.status(404).json({ message: "Failed to fetch repo" });
        }

        const markdown = await ghRes.text();
        html = marked.parse(markdown);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    req.html = html;
    next();
}

module.exports = fetchRepo;
