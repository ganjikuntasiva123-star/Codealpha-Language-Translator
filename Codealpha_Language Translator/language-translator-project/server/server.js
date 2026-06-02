const path = require("path");
const express = require("express");
const cors = require("cors");

const config = require("./config/env");
const translateRoutes = require("./routes/translateRoutes");

const app = express();

const frontendPath =
path.join(__dirname, "..", "frontend");

/* FIXED CORS */

app.use(cors());

app.use(
express.json({
limit:"1mb"
})
);

app.use(
express.static(frontendPath)
);

/* HEALTH CHECK */

app.get(
"/api/health",
(req,res)=>{

res.status(200).json({

success:true,

message:
"Translator API is running."

});

}
);

/* TRANSLATION ROUTES */

app.use(
"/api",
translateRoutes
);

/* 404 */

app.use(
(req,res)=>{

res.status(404).json({

success:false,

message:
"Route not found."

});

}
);

/* ERROR HANDLER */

app.use(
(error,req,res,next)=>{

console.error(
"Translation error:",
error.message
);

res.status(500).json({

success:false,

message:

error.message ||

"Translation Failed"

});

}
);

/* START SERVER */

app.listen(
config.port,
()=>{

console.log(

`Server running on port ${config.port}`

);

}
);
