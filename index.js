require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const collectorRoutes = require("./routes/collectorRoutes");
const dropOffCenterRoutes = require("./routes/dropOffCenterRoutes");
const dropRoute = require("./routes/dropRoute");
const collectRoute = require("./routes/collectRoute");
const getOTP = require("./middleWare/getOTP");

const app = express();
const PORT = process.env.PORT || 5500;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("I AM PLASTICONN SERVER");
});

app.get("/getOTP", getOTP);

app.use("/api/collector", collectorRoutes);
app.use("/api/dropOffCenter", dropOffCenterRoutes);
app.use("/api", dropRoute);
app.use("/api", collectRoute);

app.listen(PORT, () => console.log(`Server is live on port ${PORT}`));
