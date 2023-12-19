const express = require('express');
const routes = require('./routes/users.js');
const jwt = require('jsonwebtoken');
const session = require('express-session')

const app = express();
const PORT =5000;

app.use(session({secret:"fingerpint",resave: true, saveUninitialized: true}))
// This tells your express app to use the session middleware.

// secret - a random unique string key used to authenticate a session.
// resave - takes a Boolean value. It enables the session to be stored back to the session store, even if the session was never modified during the request.
// saveUninitialized - this allows any uninitialized session to be sent to the store. When a session is created but not modified, it is referred to as uninitialized.
// The default value of both resave and saveUninitialized is true, but the default is deprecated. So, set the appropriate value according to the use case.
app.use(express.json());


// Observe the implementation of the authentication middleware. All the endpoints starting with /user will go through this middleware. It will retrieve the authorization details from the session and verify it. If the token is validated, the user is authenticated and the control is passed on to the next endpoint handler. If the token is invalid, the user is not authenticated and an error message is returned.
app.use("/user", (req,res,next)=>{
// Middleware which tells that the user is authenticated or not
   
   if(req.session.authorization) {
       let token = req.session.authorization['accessToken']; // Access Token
       
       jwt.verify(token, "access",(err,user)=>{
           if(!err){
               req.user = user;
               next();
           }
           else{
               return res.status(403).json({message: "User not authenticated"})
           }
        });
    } else {
        return res.status(403).json({message: "User not logged in"})
    }
});

app.use("/user", routes);


// A user logs into the system providing a username. An access token that is valid for one hour is generated. You may observe this validty length specified by 60 * 60, which signifies the time in seconds. This access token is set into the session object to ensure that only authenticated users can access the endpoints for that length of time.


// POST http://localhost:5000/login 
// body: {
//     "user":{
//         "name":"abc",
//         "id":1
//     }
// } 
app.post("/login", (req,res) => {
    const user = req.body.user;
    if (!user) {
        return res.status(404).json({message: "Body Empty"});
    }
    let accessToken = jwt.sign({
        data: user
      }, 'access', { expiresIn: 60 * 60 });

      req.session.authorization = {
        accessToken
    }
    return res.status(200).send(`User ${user.name} successfully logged in`);
});
// GET http://localhost:5000/login 
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Error logging out" });
        }
        return res.status(200).json({ message: "User successfully logged out" });
    });
});


app.listen(PORT,()=>console.log("Server is running at port "+PORT));