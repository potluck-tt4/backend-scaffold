const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express()
const usersRouter = require("./users/users-router")
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/users',usersRouter)
server.use('/',(req,res)=>{
    res.status(200).json({message:`api up. Hello bubblegum.`})
})

module.exports = server
