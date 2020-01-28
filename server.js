require("dotenv").config();
const app = require('./routes/middlewear')
const router = require('./routes/routes')

const { PORT } = process.env;


app.use("/api", router);

app.listen(PORT, () =>
  console.log(`LISTENING ON PORT ${PORT}`)
);