const http = require("http");
const app = require("./index");
const db=require('./db/db.js')
const userRouter=require('./routes/user.routes.js')

db.connectDB();

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
 console.log(`server is running on port ${port}`);
});
