const express = require('express')
const app = express()
const db = require('./db')

app.use(express.json())

app.post('/employees', (req, res) => {
    const { f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body 
    const query = `INSERT INTO t_employee(f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, f_Createdate)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
    db.run(query, [f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, new Date().toISOString()], function(err) {
        if (err) return res.status(500).json({error: err.message})
        res.status(200).json({msg: 'Employee added successfully', id: this.lastID})
    } )
})

app.get('/employees', (req, res) => {
    const query = `SELECT * FROM t_employee`
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message})
        res.status(200).json(rows)
    })
})

app.put('/employees/:id', (req, res) => {
    const {id} = req.params
    const { f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body
    const query = `UPDATE t_employee SET f_Image = ?,  f_Name = ?, f_Email = ?, f_Mobile = ?, f_Designation = ?, f_gender = ?, f_Course = ? 
    WHERE f_Id = ?`
    db.run(query, [f_Image, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course, id], function(err) {
        if (err) return res.status(500).json({ error: err.message})
        res.status(200).json({ msg: 'Employee updated successfully'})
    }) 
})

app.delete('/employees/:id', (req, res) => {
    const {id} = req.params 
    const query = `DELETE FROM t_employee WHERE f_Id = ?`
    db.run(query, id, function(err) {
        if (err) return res.status(500).json({error: err.message})
        res.status(200).json({msg: 'Employee deleted successfully'})
    })
})

const PORT = process.env.PORT || 3000 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

