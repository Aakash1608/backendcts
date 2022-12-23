const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const adminRouter = require('./routes/admin-routes/admin-view')
const dotenv = require('dotenv').config();

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin:"http://localhost:3000", credentials: true }))
app.use('/api/v1/admin-view/', adminRouter)



const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})