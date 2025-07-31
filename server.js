import express from 'express'
import init from './index.routes.js'
import dotenv from 'dotenv'
import dbConnection from './DB/db.connection.js'
import cors from 'cors'

dotenv.config()



const app = express()
app.use(express.static('upload'))
app.use(express.json())

const Port = 3000







app.use(cors())
init(app)

dbConnection()
app.listen(process.env.PORT || Port, () => {
    console.log(`server is running on port ${process.env.PORT || Port}`);
})