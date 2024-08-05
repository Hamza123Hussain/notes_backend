import express from 'express'
import { NoteModel } from './Model.js'

const Router = express.Router()

// Get notes by user email
Router.get('/:email', async (req, res) => {
  try {
    const { email } = req.params
    const notes = await NoteModel.find({ createdBy: email })
    if (notes.length > 0) {
      return res.status(200).json(notes)
    } else {
      return res
        .status(404)
        .json({ message: `No notes found for email: ${email}` })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error })
  }
})

// Delete a note by ID
Router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const deletedNote = await NoteModel.findByIdAndDelete(id)
    if (deletedNote) {
      return res.status(200).json({ message: 'Note deleted successfully' })
    } else {
      return res.status(404).json({ message: `No note found with ID: ${id}` })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error })
  }
})

// Update a note by ID
Router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const updatedNote = await NoteModel.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validation
    })
    if (updatedNote) {
      return res.status(200).json(updatedNote)
    } else {
      return res.status(404).json({ message: `No note found with ID: ${id}` })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error })
  }
})

// Create a new note
Router.post('/', async (req, res) => {
  try {
    const newNote = new NoteModel(req.body)
    const savedNote = await newNote.save()
    return res.status(201).json(savedNote)
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error })
  }
})

export default Router
