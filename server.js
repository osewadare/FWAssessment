const express = require("express");
const expressValidator = require("express-validator");
const bodyParser = require('body-parser');


const app = express();

const port = "8081";

//import routes
const routes = require("./routes");


routes(app);

app.listen(port, () => {
    console.log("Express Server started")
})


app.use((err, req, res, next) => {

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        var response = {
                message: "Invalid JSON payload passed.",
                status: "error",
                data: null
        };      
        return res.status(400).jsonp(response);
    }
    next();
});



