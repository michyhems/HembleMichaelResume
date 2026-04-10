const express = require("express");
const router = express.Router();
const Model = require("../models/project");
const fetchRepo = require("../middleware/fetchRepo");
const getEntry = require("../middleware/getEntry");

//Get all
router.get("/", async (req, res) => {
    try {
        const entries = await Model.find();
        res.json(entries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/titles", async (req, res) => {
    try {
        const entries = await Model.find().select("id title thumbnail");
        res.json(entries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/blog/:id", getEntry, async (req, res) => {
    try {
        const { readmeHtml, thumbnail, description } = req.entry;
        res.json({ readmeHtml, thumbnail, description });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Create
router.post("/", fetchRepo, async (req, res) => {
    const body = req.body;
    const entry = new Model({
        title: body.title,
        thumbnail: body.thumbnail,
        description: body.description,
        readmeHtml: req.html,
        lastUpdated: new Date(),
    });
    try {
        const newEntry = await entry.save();
        res.status(201).json(newEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Update elements that are not Readme
router.patch("/:id", getEntry, async (req, res) => {
    const body = req.body;
    if (body.title !== null) {
        req.entry.title = body.title;
    }
    if (body.description !== null) {
        req.entry.description = body.description;
    }
    if (body.thumbnail !== null) {
        req.entry.thumbnail = body.thumbnail;
    }
    try {
        const newEntry = await req.entry.save();
        res.json(newEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Sync Readme with github
router.post("/sync", fetchRepo, async (req, res) => {
    const html = req.html;
    const repo = req.body.repo;
    try {
        const project = await Model.findOneAndUpdate(
            { title: repo },
            {
                readmeHtml: html,
                lastUpdated: new Date(),
            },
            { new: true, upsert: true },
        );

        res.json({ success: true, project });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Sync failed" });
    }
});

//Delete
router.delete("/:id", getEntry, async (req, res) => {
    try {
        await req.entry.deleteOne();
        res.json({ message: "deleted entry" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
