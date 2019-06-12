const express = require('express');
const path = require('path');
const controllers = require('./controllers/events');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, '../client/public')));

/************************* MiddleWare *******************************/

/********************************************************************/

/*************************   Routes   *******************************/

app.get('/api/events', controllers.logEvents);

/********************************************************************/

app.listen(PORT, () => {
  console.log(`Listening on Port:${PORT}`);
});
