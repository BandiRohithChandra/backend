const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const loginRoutes = require('./routes/login')
const employeeRoutes = require('./routes/employee')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/api/login', loginRoutes)
app.use('/api/employees', employeeRoutes)
app.listen(5000, () => {
    console.log('Server is running on port 5000')
})