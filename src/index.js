const express = require('express'); //external module for using express
const { Client } = require('pg') //external module for using postgres with node
const config = require('./config.js'); // internal module for connecting to our config file

const app = express();
const port = 3000;

app.use(express.json());

const client = new Client(config); //creating our database Client with our config values

//console.log("ready");

//crud routes

const getLanguages = async () => {
  await client.connect() //connecting to our database
  const result = await client.query('SELECT * FROM programming_languages');
  console.log(result.rows);
  await client.end() //ending the connection to our database
  return result.rows;
}

const getLanguage = async (id) => {
  await client.connect() //connecting to our database
  const result = await client.query(`SELECT * FROM programming_languages WHERE id = ${id}`)
  console.log(result.rows);
  await client.end() //ending the connection to our database
  return result.rows;
}

const deleteLanguage = async (id) => {
  await client.connect() //connecting to our database
  const result = await client.query(`DELETE FROM programming_languages WHERE id = ${id}`)
  console.log(result.rows);
  await client.end() //ending the connection to our database
  return result.rows;
}

const postLanguage = async (id) => {
  await client.connect() //connecting to our database
  const result = await client.query(`SELECT * FROM programming_languages WHERE id = ${id}`)
  console.log(result.rows);
  await client.end() //ending the connection to our database
  return result.rows;
}

//const createLanguage = async (language, releasedYear, githutRank, pyplRank, tiobeRank ) => {
  //await client.connect() //connecting to our database
  //const maxIdResult = await client.query (`SELECT MAX(id) AS max_id FROM programming_languages`);
  //const maxId = maxIdResult.roes[0].max_id || 0}; //handle the case when table is empty
  //console.log(nextId);
  //const result = await client.query(`INSERT INTO programming_languages (id, name, released_year, githut_rank,pypl_rank, tiobe_rank) VALUES 
  //( ${nextId}, `${languages}`, ${released_year}, ${githut_rank}, ${pypl_rank},  ${tiobe_rank})`)
  //console.log(result.rows);
  //await client.end() //ending the connection to our database
  //return result.rows;
//}

app.get('/get-languages', async (req, res) => {
  const languages = await getLanguages();
  res.send(languages);
});

app.get('/get-language/:id', async (req, res) => {
  const language = await getLanguage(req.params.id);
  res.send(language);
});

app.delete('/delete-language/:id', async (req, res) => {
  const language = await deleteLanguage(req.params.id);
  res.send("language deleted successfully");
});

//app.create('/create-language/:id', async (req, res) => {
  //const language = await createLanguage(req.params.id);
 // res.send("language successfully created");
//});

app.post('/post-language', async (req, res) => {
  const language = await postLanguage(req.body.nextId, req.body.language, req.body.releasedTear, req.body.githutRank, req.body.pyplRank, req.body.tiobeRank);
  res.send("language created successfully");
});

app.listen(port, () => {
  console.log(`Ann app listening at http://localhost:${port}`);
});

