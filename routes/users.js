const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
    res.send(users);
    // http://localhost:5000/user
});

// GET by specific ID request: Retrieve a single user with email ID
// http://localhost:5000/user/johnwick@gamil.com
router.get("/:email",(req,res)=>{
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    res.send(filtered_users);
});


// POST request: Create a new user
// body:
// {
//     "firstName":"Jon",
//     "lastName":"Lovato",
//     "email":"jonlovato@theworld.com",
//     "DOB":"10/10/1995"
// }
//POST http://localhost:5000/user/ 
router.post("/", (req, res) => {
    const newUser = {
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "DOB": req.body.DOB
    };

    users.push(newUser);
    res.send("The user " + newUser.firstName + " has been added!");
});

// PUT request: Update the details of a user by email ID
// To make updates in the data, you will use the PUT method. You should first look at the user with the specified email id and then modify it. The code below shows how the date of birth (DOB) of a user can be modified. Make the necessary code changes to allow changes to the other attributes of the user.
// PUT http://localhost:5000/user/johnwick@gamil.com
Body: // {
//     "firstName": "John",
//     "lastName": "wick",
//     "email": "johnwick@gamil.com",
//     "DOB": "22-03-1990"
// }
router.put("/:email", (req, res) => {
    const email = req.params.email;
    let filtered_users = users.filter((user) => user.email === email);
    if (filtered_users.length > 0) {
        let filtered_user = filtered_users[0];
        let DOB = req.body.DOB;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        //if the DOB has changed
        if(DOB) {
            filtered_user.DOB = DOB
        }
        if(firstName){
            filtered_user.firstName=firstName
        }
        if(lastName){
            filtered_user.lastName=lastName
        }
        users = users.filter((user) => user.email != email);
        users.push(filtered_user);
        res.send(`User with the email  ${email} updated.`);
    }
    else{
        res.send("Unable to find user!");
    }
  });


// DELETE request: Delete a user by email ID
// DELETE http://localhost:5000/user/joyalwhite@gamil.com
router.delete("/:email", (req, res) => {
    const email = req.params.email;
    users = users.filter((user) => user.email != email);
    res.send(`User with the email  ${email} deleted.`);
});

module.exports=router;
