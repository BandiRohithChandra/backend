const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err){
        console.error(err.message)
    }else{
        console.log("Connected to the sqlite database.")
    }
})

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS t_login (
        f_sno INTEGER PRIMARY KEY AUTOINCREMENT,
        f_userName TEXT NOT NULL UNIQUE,
        f_Pwd TEXT NOT NULL
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS t_employee (
        f_Id INTEGER PRIMARY KEY AUTOINCREMENT,
        f_Image TEXT, 
        f_Name TEXT NOT NULL, 
        f_Email TEXT NOT NULL UNIQUE,
        f_Mobile TEXT NOT NULL UNIQUE,
        f_Designation TEXT NOT NULL,
        f_gender TEXT,
        f_Course TEXT,
        f_Createdate TEXT
    )`)
})

module.exports = db