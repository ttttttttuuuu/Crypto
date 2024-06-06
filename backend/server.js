const express = require("express");
const path = require("path");
const fs = require("fs");
const https = require("https");
var validator = require("validator");
var cors = require("cors");
const axios = require("axios");
const Codes = require("./Codes");
const { getDVOL, get_Date, FR, getPrice, ARB } = require("./data");
const { MongoClient, ServerApiVersion } = require("mongodb");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const dov = require("dotenv").config();
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log(process.env["DB_NAME"]);
const url =
  "mongodb+srv://" +
  process.env["DB_NAME"] +
  ":" +
  process.env["DB_PASS"] +
  "@optioncrypto.ruavcwk.mongodb.net/?retryWrites=true&w=majority";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("build"));
app.get("*", function (req, res, next) {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

const verifyJWT = (req, res, next) => {
  const token = req.body.headers["x-access-token"];

  console.log("token", token);

  if (!token) {
    res.send("Failed");
    console.log("Failed");
  } else {
    if (token !== "N") {
      try {
        const decoded = jwt.verify(token, "jwtSecret");
        req.decoded = decoded;
        console.log("Success");
        next();
      } catch (error) {
        console.log(error);
        res.json({
          auth: false,
          message: " failed to authenticate",
        });
      }
    } else {
      const plan = "N";
      const token = jwt.sign({ plan }, "jwtSecret", {});
      const decoded = jwt.verify(token, "jwtSecret");
      req.decoded = decoded;
      console.log("2", req.decoded.plan);
      next();
    }
  }
};

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: "webmail.3xm.asia",
    secureConnection: false,
    tls: {
      rejectUnauthorized: false,
    },
    port: 587,
    auth: {
      user: process.env.EMAIL_SEND_SESSION,
      pass: process.env.EMAIL_SEND_PASSWORD,
    },
  })
);

var codes = new Codes();

app.post("/sendSMS", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const username = req.body.username;
  // const code = Math.random().toString(36).slice(-6).toUpperCase();
  // codes[username] = code;
  const code = codes.newCode(email);
  var mailOptions = {
    from: process.env.EMAIL_SEND_SESSION,
    to: email,
    subject: "CON.3.0",
    html:
      "<div style=' font-family: Arial, sans-serif;'><h2>Dear " +
      username +
      ",</h2><p>Your email verification code is:<h3 style='color:#F7BA33'>" +
      code +
      "</h3></p ></br> <p>For the security of your account, please do not share this verification code with others.</p></br><p>If you need further assistance, please feel free to send an email to " +
      process.env.EMAIL_SEND_SESSION +
      ".</p></br>CON.3.0<br></div>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

app.post("/get_register", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;

  const username = req.body.username;
  const password = req.body.password;
  const code = req.body.code;
  const level = req.body.checked;

  if (!validator.isEmail(email)) {
    return res.json({
      message: "Please input correct email format!",
    });
  }
  if (!password.length > 8) {
    return res.json({
      message:
        "Please input Use 8 or more characters with a mix of (min 1 lowercase letters) and numbers",
    });
  }

  if (codes.verify(email, code)) {
    const client = await MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("crypto");

      const doc = {
        email: email.trim(),
        username: username.trim(),
        password: password.trim(),
        level: level,
        plan: "F",
        create_time: Date.now(),
      };
      var query = { email };
      dbo
        .collection("user")
        .find(query)
        .toArray(function (err, result) {
          if (err) {
            res.send({ err: err });
          }
          if (result.length === 0) {
            console.log(result.length);
            const ans = dbo
              .collection("user")
              .insertOne(doc, function (err, response) {
                if (err) throw err;
                db.close();

                const token = jwt.sign({ username, plan: "F" }, "jwtSecret", {
                  // expiresIn: 300,
                });
                res.json({
                  auth: "Success",
                  token: token,
                  username: username,
                });
              });
          } else {
            res.send({
              message: "That email is taken,Try another",
            });
          }
        });
    });
  } else {
    res.send({
      message: "Verification code is wrong or expiry, Please Try again",
    });
  }
});

app.get("/clear", function (req, res) {
  res.clearCookie("userId", { httpOnly: true });

  res.status(200).send();
  console.log("CLEAR");
});

app.post("/loginState", verifyJWT, (req, res) => {
  const username = req.decoded.username;

  res.send({ username });
});

app.post("/get_login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("crypto");
    var query = { email };
    dbo
      .collection("user")
      .find(query)
      .toArray(function (err, result) {
        if (err) {
          res.json({
            auth: false,
            message: "Wrong username/password combination!",
          });
        }
        if (result.length > 0) {
          if (password.trim() === result[0].password) {
            const username = result[0].username;
            const plan = result[0].plan;
            console.log(plan);
            const token = jwt.sign({ username, plan }, "jwtSecret", {
              // expiresIn: 300,
            });
            res.json({
              auth: true,
              token: token,
              username: username.trim(),
              plan: plan,
            });
          } else {
            res.json({
              auth: false,
              message: "Wrong username/password combination!",
            });
          }
        } else {
          res.json({ auth: false, message: "User doesn't exist" });
        }
        db.close();
      });
  });
});

app.post("/get_forgetPassword", async (req, res) => {
  const email = req.body.email;
  const code = req.body.code;
  const password = req.body.password;
  if (codes.verify(email, code)) {
    const client = await MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("crypto");

      var myquery = { email };
      var newvalues = { $set: { email, password } };
      dbo.collection("user").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");

        db.close();
      });
      res.json({
        auth: true,
      });
    });
  } else {
    res.send({
      message: "Verification code is wrong or expiry, Please Try again",
    });
  }
});

app.post("/get_dates", verifyJWT, async function (request, response) {
  console.log("1", request.body.data);
  try {
    const data = request.body.data;
    const plan = request.decoded.plan;
    const dates = await get_Date(data.symbol, plan);

    response.json({ dates });
  } catch (err) {
    response.send({ message: "err" });
  }
});

app.post("/get_FR", verifyJWT, async function (request, response) {
  console.log("1", request.body.data);
  try {
    const data = request.body.data;
    const plan = request.decoded.plan;
    const dates = await get_Date(data.symbol, plan);
    const FairPrice = await FR(data.symbol, data.date);
    response.json({ dates, FairPrice });
  } catch (err) {
    response.send({ message: "err" });
  }
  // const result = axios(
  //   // "https://markettingapi.herokuapp.com/system1_taboola_detail/2022-04-10/2022-04-10"
  //   `https://conoptionsapi.herokuapp.com/FR/${data.symbol}/${data.date}/${plan}`,

  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // )
  //   .then((res) => {
  //     const data = res.data;
  //     // console.log(data);
  //     response.send(data);
  //   })
  //   .catch((error) => {
  //     // console.log(error);
  //     response.send(error);
  //   });
});

app.post("/get_ARB", verifyJWT, async function (request, response) {
  console.log("2", request.body.data);

  try {
    const data = request.body.data;
    const plan = request.decoded.plan;
    const dates = await get_Date(data.symbol, plan);
    const arb = await ARB(data.symbol, data.date);
    response.json({ dates, arb });
  } catch (err) {
    response.send({ message: "err" });
  }

  // const plan = request.decoded.plan;
  // console.log(plan);
  // const result = axios(
  //   // "https://markettingapi.herokuapp.com/system1_taboola_detail/2022-04-10/2022-04-10"
  //   `https://conoptionsapi.herokuapp.com/ARB/${data.symbol}/${data.date}/${data.exchange}/${plan}`,

  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // )
  //   .then((res) => {
  //     const data = res.data;
  //     // console.log(data);
  //     response.send(data);
  //   })
  //   .catch((error) => {
  //     // console.log(error);
  //     response.send(error);
  //   });
});

app.post("/get_BASIC", function (request, response) {
  console.log("1", request.body.data);
  const data = request.body.data;
  const result = axios(
    // "https://markettingapi.herokuapp.com/system1_taboola_detail/2022-04-10/2022-04-10"
    // `https://conoptionsapi.herokuapp.com/BASIC/${data.symbol}/${data.exchange}/${data.interval}`,

    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      const data = res.data;
      // console.log(data);
      response.send(data);
    })
    .catch((error) => {
      // console.log(error);
      const data = ["err", "err"];
      response.send(data);
    });
});

app.post("/get_index", async function (req, res) {
  const coinId = req.body.symbol;
  const close = await getPrice(coinId);
  res.json({ result: close });
});

app.post("/getDVOL", async function (req, res) {
  const coinId = req.body.symbol;
  const dvol = await getDVOL(coinId);

  res.json({ result: dvol });
});

app.listen(process.env.PORT || 5001, (err) => {
  if (!err) {
    console.log("服务器启动成功");
    // console.log("请求github真实数据请访问：http://localhost:5001");
  } else console.log(err);
});

const httpsServer = https.createServer(
  {
    key: fs.readFileSync("croxpow.key"),
    cert: fs.readFileSync("croxpow.crt"),
  },
  app
);

httpsServer.listen(8443, (err) => {
  if (!err) {
    console.log("https server running !!");
  } else console.log(err);
});
