const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development);
const server = express();
server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.send('Api Workin')
});

//End Point Requests for COHORTS
server.get('/api/cohorts', (req, res) => {
    db('cohorts').then(cohorts => {
      res.status(200).json(cohorts);
    }).catch(err => {res.status(500).json(err)});
  })

//Get Cohort by ID
server.get('/api/cohorts/:id', (req, res) =>{
  const cohortID = req.params.id;
  db('cohorts')
    .where({ id: cohortID })
    .first()
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})

//Post a new cohort
server.post('/api/cohorts', (req, res) => {
  db('cohorts')
    .insert(req.body)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => res.status(500).json(err));
});

//Delete an old cohort
server.delete('/api/cohorts/:id', (req, res) => {
  db('cohorts')
    .where({ id: req.params.id })
    .delete()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err =>  res.status(500).json(err))
})

//Update a cohort
server.put('/api/cohorts/:id', (req, res) => {
  const changes = req.body;
  db('cohorts')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
})

//get students by cohort

server.get('/api/cohorts/:id/students', async (req, res) => {
  const id = req.params.id;
try {
    const students = await db
    .select('*')
    .from('cohorts')
    .where({'cohorts.id': id})
    .join('students', {'cohorts.id': 'students.cohort_id'})
    res.status(200).json(students);
} catch (error) {
    res.status(500).json(error);
}
});

//STUDENT ENDPOINTS BEGIN

server.get('/api/students', (req, res) => {
  db('students').then(students => {
    res.status(200).json(students);
  }).catch(err => {res.status(500).json(err)});
})


//Get Student by ID
server.get('/api/students/:id', (req, res) =>{
  const studentID = req.params.id;
  db('students')
    .where({ id: studentID })
    .first()
    .then(student => {
      res.status(200).json(student);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});