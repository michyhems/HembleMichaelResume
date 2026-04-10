const Model = require("../models/project");
async function getEntry(req, res, next) {
    let entry;
    try {
        entry = await Model.findById(req.params.id);
        if (entry === null) {
            return res.status(404).json({ message: "Cannot find entry" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    req.entry = entry;
    next();
}

module.exports = getEntry;
