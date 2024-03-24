const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

const getNotes = asyncHandler(async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

const createNote = asyncHandler(async (req, res) => {
  try {
    const { title, content, category } = req.body;

    console.log(title, content, category);
    if (!title || !content || !category) {
      res.status(401);
      throw new Error("Please fill all the fields");
    } else {
      //console.log("note creation", req.user._id);
      const note = await Note.create({
        user: req.user._id,
        title,
        content,
        category,
      });

      console.log("npote created");

      res.status(201).json(note);
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note) {
      res.json(note);
    } else {
      res.status(400);
      throw new Error("Note Not found");
    }
  } catch (error) {
    console.log(`Error:${error}`);
  }
});

const updateNote = asyncHandler(async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const note = await Note.findById(req.params.id);

    if (note.user.toString() != req.user._id.toString()) {
      res.status(400);
      throw new Error("You can't perform this action");
    }

    if (note) {
      note.title = title;
      note.content = content;
      note.category = category;

      const updatedNote = await note.save();
      res.status(200).json(updatedNote);
    } else {
      res.status(400);
      throw new Error("note not found");
    }
  } catch (error) {
    console.log(`Error; ${error}`);
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (note.user.toString() != req.user._id.toString()) {
      res.status(400);
      throw new Error("You can't perform this action");
    }

    if (note) {
      await Note.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Note removed" });
    } else {
      res.status(200);
      throw new Error("Note not found");
    }
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
