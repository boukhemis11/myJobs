const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];

const getAllJobs = () => {
  return [...addedJobs, ...initialJobs];
}


app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next();
})

const api = express.Router();

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
  console.log(getAllJobs())
  if(job.length === 1){
    res.json(job[0]);
  }else {
    res.json({success : false, message : `no job with id = ${id}`})
  }

})

app.use('/api', api);

const port = 4444;
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
