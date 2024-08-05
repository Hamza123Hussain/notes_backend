import mongoose from 'mongoose'
import { DB } from '../Config.js'
export const DBconnect = async () => {
  try {
    const Connection = await mongoose.connect(DB)
    if (Connection) {
      console.log('Database connected')
    } else {
      console.log('Database not connected')
    }
  } catch (error) {
    console.error('Database connection failed:', error)
  }
}
