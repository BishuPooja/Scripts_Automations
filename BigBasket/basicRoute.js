const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const port = "5523"
const cors = require('cors')
app.use(cors())

// function middleware(req, res, next) {
//     console.log("Hi, I am a middleware")
//     next()
// }

// function middleware2(req, res, next) {
//     console.log("Hi, I am a middleware 2")
//     next()
// }

// app.get('/', middleware2, middleware, function (req, res) {
//     res.send('Hello World!')
// })

// app.use(express.urlencoded({ extended: true }));


// app.post('/', function (req, res) {
//     const username = req.body.username;
//     const password = req.body.password;
//     console.log(username + ' ' + password)
//     res.send('Logged in successfully!');
// });

// app.listen(port, () => {
//     console.log(`App is listening to port- ${port}`)
// })



// var bodyParser = require('body-parser');
// // Create application/x-www-form-urlencoded parser  
// // var urlencodedParser = bodyParser.urlencoded({ extended: false })
// // app.use(express.static('public'));
// app.get('/index.html', function (req, res) {
//     res.sendFile(__dirname + "/" + "index.html");
// })
// app.post('/', function (req, res) {
//     // Prepare output in JSON format  
//     response = {
//         first_name: req.body.first_name,
//         last_name: req.body.last_name
//     };
//     console.log(response);
//     res.end(JSON.stringify(response));
// })
// app.listen(port, function () {
//     console.log(`app listening on ${port}`)
// })



// middleware to handle CORS requests
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    next();
});

// middleware to handle authentication
app.use(function (req, res, next) {
    const authToken = req.headers.authorization;

    // verify authentication token using an authentication provider or federated identity management system
    // if authentication is successful, generate a JWT token and send it to the client
    // the JWT token should include any relevant authorization information, such as user roles or permissions

    if (authToken) {
        const jwtToken = jwt.sign({ userId: "user123", roles: ["admin"] }, "secretkey");
        res.cookie('jwtToken', jwtToken, { httpOnly: true });
        res.status(200).send({ message: "Authentication successful" });
    } else {
        res.status(401).send({ message: "Authentication failed" });
    }
});

// middleware to handle protected resources
app.use('/protected', function (req, res, next) {
    // check the JWT token in the request cookie
    // verify the JWT token using the same secret key used to generate the token
    // if the token is valid and the user is authorized, grant access to the requested resource
    // if the token is invalid or the user is not authorized, return an error response

    const jwtToken = req.cookies.jwtToken;
    if (jwtToken) {
        jwt.verify(jwtToken, 'secretkey', function (err, decoded) {
            if (err) {
                res.status(401).send({ message: "Invalid token" });
            } else if (decoded.roles.includes("admin")) {
                res.status(200).send({ message: "Access granted" });
            } else {
                res.status(403).send({ message: "Access denied" });
            }
        });
    } else {
        res.status(401).send({ message: "Missing token" });
    }
});

// start the server
app.listen(3000, function () {
    console.log('Server started on port 3000');
});
