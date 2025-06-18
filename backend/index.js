const express = require('express')
const app = express()
const PORT = 3000;

// import the board routes file
const routes = require('./routes/boardRoutes')

app.use(express.json());
// app will display pets only if localhost:3000/pets which will be the root directory
app.use('/boards', routes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
  res.send('Welcome to kudos boards!')
})

