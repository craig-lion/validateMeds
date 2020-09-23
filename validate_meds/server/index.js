const axios = require('axios')
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const pino = require('express-pino-logger')();
const port = process.env.port || 8080


app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);


app.get('/api/getId', (req, res) => {
  axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui?name=${req.query.name}`)
  .then(medication => res.send(medication.data.idGroup.rxnormId))
})

app.listen(port, () => console.log(`validateMeds is listening on ${port}`))
