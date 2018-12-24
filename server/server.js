const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');
const jwt = require('jsonwebtoken');

const secret = '7b9dd39c13979d65273bb2e0f3e91b87bbda3751';

let initialJobs = data.jobs;
let addedJobs = [];
const fakeUser = {email:'boukh@gmail.com', password:'boukh'}

const getAllJobs = () => {
  return [...addedJobs, ...initialJobs];
}

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token'",
  });

  next();
});
const auth = express.Router();
const api = express.Router();


auth.post('/login', (req, res) => {
  if(req.body) {
    const email = req.body.email.toLocaleLowerCase();
    const password = req.body.password.toLocaleLowerCase();
    if(email === fakeUser.email && password === fakeUser.password) {
      //res.json({success:true, data:req.body})
      const token = jwt.sign( {iss:'http://localhost:4444', role:'admin', email: req.body.email}, secret)
      res.json({success:true, token})
    } else {
      res.json({ success: false, message : 'indentifiants incorrects' });
      res.status(401).json({ success: false, message : 'identifiants incorrects' });
    }
  } else {
    res.json({ success: false, message: 'données manquantes'});
    res.status(500).json({ success: false, message: 'données manquantes'});
  }
})

api.get('/jobs', (req, res) => {
  res.json(getAllJobs());
});

api.post('/jobs', (req, res) => {
  const job = req.body
  addedJobs = [job, ...addedJobs];
})

api.get('/search/:term/:place?', (req, res) => {
  const term = req.params.term.toLowerCase().trim();
  let place = req.params.place;
  let jobs = getAllJobs().filter(job => (job.description.toLowerCase().includes(term) || job.title.toLowerCase().includes(term)))
  if(place) {
    place = place.toLowerCase().trim();
    jobs = getAllJobs().filter(job => (job.city.toLowerCase().includes(place)));
  }
  res.json({success: true, jobs});

})

api.get('/jobs/:id', (req, res) => {
  const id = req.params.id
  const job = getAllJobs().filter(job => job.id == id);
  if(job.length === 1){
    res.json(job[0]);
  }else {
    res.json({success : false, message : `no job with id = ${id}`})
  }

})

app.use('/api', api);
app.use('/auth', auth);

const port = 4444;
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
