import express from 'express';
import passport from 'passport';

// Initialize http server
const app = express();

//fetch deals

app.get("/deals", (req, res)=>{

  res.setHeader('Content-Type', 'application/json');
  BusinessDeals.fetchAll({withRelated: ['business','deal']}).then(deals=>{
    console.log(deals)
    res.send(JSON.stringify(deals));
  }).catch(e=>{
    console.log(e)
  })

});

// Launch the server on the port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(address)
  console.log(`Listening at http://${address}:${port}`);
});
