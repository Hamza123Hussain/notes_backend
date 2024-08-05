import mongoose from 'mongoose'
import { type } from 'os'

// Define the schema
const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    createdBy: { type: String },
    BG: { type: String }, // for background color
  },
  { timestamps: true } // Enable timestamps to automatically add createdAt and updatedAt fields
)

// Create the model from the schema
export const NoteModel = mongoose.model('Note', noteSchema)
