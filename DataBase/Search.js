import express from 'express'
import { NoteModel } from './Model.js'
const router = express.Router()

// Route to search for notes by title
router.get('/search', async (req, res) => {
  try {
    const { title } = req.query // Get the title from query parameters
    const notes = await NoteModel.find({ title: new RegExp(title, 'i') }) // Case-insensitive search

    if (notes.length > 0) {
      res.status(200).json(notes) // sending array of founded notes
    } else {
      res.status(404).json({ message: 'No notes found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
})

export default router
