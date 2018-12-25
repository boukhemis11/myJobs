const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');
const jwt = require('jsonwebtoken');

const secret = '7b9dd39c13979d65273bb2e0f3e91b87bbda3751';

let initialJobs = data.jobs;
let addedJobs = [];
let users = [{id: 1, nickname: 'koko', email:'boukh@gmail.com', password:'boukh'}];

const getAllJobs = () => {
  return [...addedJobs, ...initialJobs];
}

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const checkUserToken = (req, res, next) => {
  // check that the user sent a token in the request header
  if(!req.header('authorization')) {
    // no header, no need to go further
    return res.status(401).json({ success: false, message: "Header d'authentification manquant"});
  }

  const authorizationHeaderParts = req.header('authorization').split(' ');
  // parts are 'Bearer theToken'
  let token = authorizationHeaderParts[1];
  jwt.verify(token, secret, (err, decodedToken) => {
    if(err) {
      return res.status(401).json({ success: false, message: "Token non valide"});
    } else {
      console.log('decodedToken ', decodedToken);
      next();
    }
  });
};

const auth = express.Router();
const api = express.Router();

auth.post('/login', (req, res) => {
  if(req.body) {
    const email = req.body.email.toLocaleLowerCase();
    const password = req.body.password.toLocaleLowerCase();
    const index = users.findIndex(user => user.email = email );
    console.log('index ', index);
    if (index > -1 && users[index].password === password) {
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

auth.post('/register', (req, res) => {
  console.log(req.body)
  if (req.body) {
    const email = req.body.email.toLocaleLowerCase().trim();
    const nickname = req.body.nickname.trim();
    const password = req.body.password
    users = [{id: Date.now, nickname:nickname, email: email, password: password}, ...users]
    res.json({success: true, users: users})
  }else {
    res.json({success:false, message: 'la création a échoué'})
  }
})

api.get('/jobs', (req, res) => {
  res.json(getAllJobs());
});

api.post('/jobs',checkUserToken, (req, res) => {
  const job = req.body
  addedJobs = [job, ...addedJobs];
  res.json(job);
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
