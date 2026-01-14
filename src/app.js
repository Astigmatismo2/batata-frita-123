express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}
));

let alunos = [];

app.post('/alunos', (req, res) => {
  const aluno = req.body;
  alunos.push(aluno);
  res.status(201).send(aluno);
});

app.get('/alunos', (req, res) => {
  res.send(alunos);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});