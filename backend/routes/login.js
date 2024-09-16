const express = require('express')
const app = express()
const db = require('./db')

app.use(express.json())

app.post('./login', (req, res) => {
    const {username, password} = req.body 
    const query = `SELECT * FROM t_login WHERE f_userName = ? AND f_Pwd = ?`
    db.get(query, [username, password], (err, row) => {
        if (err) return res.status(500).json({ error: err.message})
        if (row) return res.status(200).json({msg: 'Login successful', username: row.f_userName})
        return res.status(400).json({ msg: 'Invalid login details'})
    })
})

const PORT = process.env.PORT || 3000 
app.listen(PORT, () => {
    console.log('Server is running on port ${PORT}')
})