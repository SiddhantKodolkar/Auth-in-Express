const express = require('express');
const routes = require('./routes/users.js');

const app = express();
const PORT =5000;

app.use(express.json());
// Observe that the express app uses the middleware express.json() to handle the request as a json object.

app.use("/user", routes);
// Observe that the express app uses routes to handle the endpoints which start with /user. This means that for all the endpoints starting with /user, the server will go and look for an endpoint handler in users.js.

app.listen(PORT,()=>console.log("Server is running at port "+PORT));
// This package will help us to maintain the authentication for the session.
// You have an Express server that has been configured to run at port 5000. When you access the server with /user you can access the endpoints defined in routes/users.js.
