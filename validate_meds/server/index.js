const express = require("express")
const app = express()
const port = process.env.port || 8080

app.get('/')

app.listen(port, () => console.log(`validateMeds is listening on ${port}`))
