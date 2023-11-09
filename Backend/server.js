const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const EmployeeRoutes = require("./routes/EmployeeRoutes");
const ConnectDB = require("./.config/DbConnection");
const cors = require("cors");
const ApprovalRoutes = require("./routes/ApprovalRoutes");
const AdminRoutes = require("./routes/AdminRoutes");
ConnectDB();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
const port = process.env.PORT;

app.use("/api/employee", EmployeeRoutes);
app.use("/api/approvalstatus", ApprovalRoutes);
app.use("/api/admin", AdminRoutes);

app.listen(port, () => [console.log(`app listening on ${port}`)]);
