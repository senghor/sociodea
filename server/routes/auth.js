import express from 'express'
import { login } from '../controllers/auth'

const Router = express.Router()

Router.post('/login', login)