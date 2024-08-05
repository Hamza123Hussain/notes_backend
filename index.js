// Import necessary modules
import express from 'express'
import { DB, Port } from './Config.js'
import { DBconnect } from './DataBase/DB_connect.js'
import Router from './DataBase/Crud.js'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import router from './DataBase/Search.js'

// Enable CORS for all origins
const corsOptions = {
  origin: true, // Allow all origins https://notes-app-node-next-9x72.vercel.app/
  optionsSuccessStatus: 200, // For legacy browser support
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

// Use the CRUD router for handling requests to '/api/Notes'
app.use('/api/Notes', Router)
app.use('/api/note', router)

app.listen(Port, () => {
  console.log(`PORT IS RUNNING ${Port}`)
})

console.log(DB)
DBconnect()
