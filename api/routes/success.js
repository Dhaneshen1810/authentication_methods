/*export default function success(){
    return(
        <div>
            <h1>SUCCESS!!!</h1>
        </div>
    )
}*/
var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
    res.send("API is workg properly");
});

module.exports = router;