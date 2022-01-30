//require
const express = require('express');
const bodyParser = require('body-parser');
const {
  Pool
} = require('pg');
const moment = require('moment');
const res = require('express/lib/response');


//config pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "",
  database: "cursos",
  port: "5432"
})

//generarQuery
const generarQuery = (name, text, values) => {
  return {
    name,
    text,
    values
  }
}

//app-express
const app = express()

//sservidor - puerto
app.listen(3000, () => {
  console.log('El servidor esta inicializado en el puerto 3000');
})

//bodyParser config
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

//public
app.use('/', express.static(__dirname + '/'))

//ruta raíz
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

//ruta POST - curso
app.post('/curso', (req, res) => {

  const datos = []
  for (const key in req.body) {
    datos.push(req.body[key])
  }

  const name = "insertar"
  const text = "INSERT INTO cursos (nombre, nivel, fecha, duracion) values($1, $2,$3, $4)"
  const values = datos

  const result = pool.query(generarQuery(name, text, values))
    .then((value) => {
      let cursos = value.rows
      res.send(cursos)
      return cursos
    }, (reason) => {
      console.log(reason);
      return reason
    })
})

//ruta GET - cursos
app.get('/cursos', (req, res) => {
  const name = "consultar"
  const text = "SELECT * FROM cursos ORDER BY id ASC"
  const values = []

  const result = pool.query(generarQuery(name, text, values))
    .then((value) => {
      let cursos = value.rows

      cursos.forEach(element => {
        element.fecha = moment(element.fecha).format('YYYY-MM-DD')
      });
      res.send(cursos)
      return value.rows
    }, (reason) => {
      console.log(reason);
      return reason
    })
})

//ruta POST - curso
app.put('/curso', (req, res) => {

  const datos = []
  for (const key in req.body) {
    datos.push(req.body[key])
  }

  const name = "update"
  const text = "UPDATE cursos SET nombre=$1, nivel=$2, fecha=$3, duracion=$4 WHERE id=$5"
  const values = datos

  console.log(values);

  const result = pool.query(generarQuery(name, text, values))
    .then((value) => {
      let cursos = value.rows
      res.send(cursos)
      return cursos
    }, (reason) => {
      console.log(reason);
      return reason
    })
})

//Ruta DELETE /{curso}
app.delete('/curso/:id', (req, res) => {

  const {
    id
  } = req.params

  const name = "delete"
  const text = "DELETE FROM cursos WHERE id=$1"
  const values = [id]

  const result = pool.query(generarQuery(name, text, values))
    .then((value) => {
      let cursos = value.rows
      res.send(cursos)
      return cursos
    }, (reason) => {
      console.log(reason);
      return reason
    })


})