const fs = require("fs");
var express = require("express");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const server = express();
var multer = require("multer");
var upload = multer();
const router = jsonServer.router("./mock_server/db.json");
const userdb = JSON.parse(fs.readFileSync("./mock_server/users.json", "UTF-8"));
const db = JSON.parse(fs.readFileSync("./mock_server/db.json", "UTF-8"));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(jsonServer.defaults());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(upload.array());
server.use(express.static("public"));

const SECRET_KEY = "123456789";

const expiresIn = "1h";
// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

// Register New User
server.post("/register", (req, res) => {
  console.log("register endpoint called; request body:");
  console.log(req.body);
  const { email, password } = req.body;

  if (isAuthenticated({ email, password }) === true) {
    const status = 401;
    const message = "Email and Password already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = data.users[data.users.length - 1].id;

    //Add new user
    data.users.push({ id: last_item_id + 1, ...req.body }); //add some data
    var writeData = fs.writeFile(
      "./users.json",
      JSON.stringify(data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });

  // Create token for new user
  const access_token = createToken({ email, password });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

// Login to one of the users from ./users.json
server.post("/api/login", (req, res) => {
  //   console.log("login endpoint called; request body:");
  //   console.log(req.body);
  // console.log(req.body,'jjjjjjj')
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  if (isAuthenticated({ email, password }) === false) {
    const status = "ERROR";
    const http_code = 401;
    const data =
      userdb.users.findIndex(
        (user) => user.email === email && user.password !== password
      ) !== -1
        ? "Incorrect Password"
        : "User not found";
    res.status(http_code).json({ status, http_code, data });
    return;
  }
  let userindex = userdb.users.findIndex(
    (user) => user.email === email && user.password === password
  );
  let user_info = (({ password, ...o }) => o)(req.body);

  const status = "OK";
  const message = "logged in successfully";
  const responseCode = 200;

  user_info_keys = [
    "email",
    "first_name",
    "last_name",
    "phone",
    "promo_group_id",
    "region_id",
    "language_Code",
    "password_changed_date",
    "last_login_date",
    "is_active",
    "is_deleted",
    "created_at",
    "modified_at",
    "created_by",
    "user_role_id",
    "username",
    "uuid",
  ];

  if (userindex !== -1) {
    for (let i = 0; i < user_info_keys.length; i++) {
      user_info[user_info_keys[i]] = userdb.users[userindex][user_info_keys[i]];
    }
    // user_info=(({ password, featureFlag,...o }) => o)(userdb.users[userindex])
  }
  const access_token = createToken({ email, password, statuscode: 3000 });
  const refresh = access_token;
  console.log("Access Token:" + access_token);
  res
    .status(200)
    .json({ refresh, access_token, user_info, status, message, responseCode });
});

server.use(/^(?!\/).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Error in authorization format";
    res.status(status).json({ status, message });
    return;
  }
  try {
    let verifyTokenResult;
    verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

    if (verifyTokenResult instanceof Error) {
      const status = 401;
      const message = "Access token not provided";
      res.status(status).json({ status, message });
      return;
    }
    next();
  } catch (err) {
    const status = 401;
    const message = "Error access_token is revoked";
    res.status(status).json({ status, message });
  }
});
server.get("/api/language/list", (req, res) => {
  res.status(200).json(db.language_list);
});
server.post("/api/resetpasswordtoken/", (req, res) => {
  const { email } = req.body;
  if (userdb.users.findIndex((user) => user.email === email) === -1) {
    const data = {
      error: "No active email Id",
    };
    res.status(400).json(data);
    return;
  }
  res.status(200).json(db.resetpasswordtoken);
});

server.post("/api/featureFlag", (req, res) => {
  const { uuid } = req.body;
  const userindex = userdb.users.findIndex((user) => user.uuid === uuid);
  if (userindex !== -1) {
    res.status(200).json(userdb.users[userindex].featureFlag);
  }
});

server.get("/api/api/support_email", (req, res) => {
  res.status(200).json(db.support_email);
});
function pagination(arrayData, page, page_size) {
  let result = [];
  // page= parseInt(page);
  // page_size= parseInt(page_size);
  for (
    let i = (page - 1) * page_size;
    i < parseInt((page - 1) * page_size) + parseInt(page_size);
    i++
  ) {
    result.push(arrayData[i]);
  }
  return result.filter((e) => {
    return e !== undefined;
  });
}
server.get("/api/scenario_planner/offers", (req, res) => {
  console.log(req.query);
  const { page, page_size } = req.query;
  const { create_from_date, create_to_date, start_date, package_name } =
    req.query;

  // const data = db.senario_planner_offer_configuration;
  const pagesOfData = Math.round(
    db.senario_planner_offer_configuration.data.length / page_size
  );
  // const result = db.senario_planner_offer_configuration.data.map(e => {

  //  })
  let payloadresult = [];
  payloadresult = pagination(
    db.senario_planner_offer_configuration.data,
    page,
    page_size
  );
  if (start_date != "" || package_name != "") {
    payloadresult = payloadresult.filter((e) => {
      return (
        e.start_date === start_date || e.offer_package_name === package_name
      );
    });
  }
  const data = { data: payloadresult, count: 10 };
  const status = "OK";
  const http_code = 200;
  res.status(200).json({ data, status, http_code });
});
server.get("/api/offer_configuration/config_master", (req, res) => {
  res.status(200).json(db.config_master);
});
server.get("/api/scenario_planner/selection", (req, res) => {
  // console.log(req.query)
  const {
    create_from_date,
    create_to_date,
    start_date,
    scenario_name,
    page,
    page_size,
  } = req.query;
  const pagesOfData = Math.round(
    db.promo_comparison_selection.data.data.length / page_size
  );
  let payloadresult = [];
  payloadresult = pagination(
    db.promo_comparison_selection.data.data,
    page,
    page_size
  );

  if (start_date != "" || scenario_name != "") {
    payloadresult = payloadresult.filter((e) => {
      return (
        e.scenario.start_date === start_date ||
        e.scenario.scenario_name === scenario_name
      );
    });
  }
  const data = {
    data: payloadresult,
    count: db.promo_comparison_selection.data.data.length,
  };
  const status = "OK";
  const http_code = 200;
  res.status(200).json({ data, status, http_code });
});

server.get("/api/offer_configuration/brands", (req, res) => {
  res.status(200).json(db.brands);
});
server.get("/api/offer_configuration/discounts", (req, res) => {
  res.status(200).json(db.discounts);
});
server.get("/api/offer_configuration/all/segments", (req, res) => {
  res.status(200).json(db.segments);
});
server.get("/api/scenario_planner/promomechanics", (req, res) => {
  res.status(200).json(db.promomechanics);
});

server.get("/api/scenario_planner/promotypes", (req, res) => {
  res.status(200).json(db.promotypes);
});
server.get("/api/scenario_planner/items", (req, res) => {
  res.status(200).json(db.items);
});

server.get("/api/scenario_planner/item/prices", (req, res) => {
  res.status(200).json(db.prices);
});

server.get("/api/scenario_planner/minprice", (req, res) => {
  res.status(200).json(db.minprice);
});
server.get("/api/scenario_planner/save/2", (req, res) => {
  res.status(200).json(db.save);
});
server.get("/api/scenario_comparision/kpi", (req, res) => {
  if (req.query.category == "segments") {
    res.status(200).json(db.scenario_comparision_kpi);
  } else if (req.query.category == "products") {
    res.status(200).json(db.scenario_comparision_kpi);
  }
});
server.post("/api/scenario_planner/save/2", (req, res) => {
  res.status(200).json(db.save);
});
server.get("/api/scenario_planner/impact", (req, res) => {
  res.status(200).json(db.impact);
});

server.get("/api/scenario_planner/scenario_results/**", (req, res) => {
  res.status(200).json(db.scenario_planner_scenario_results);
});
server.get("/api/offer_configuration/scenario_metrics/report", (req, res) => {
  res.status(200).json(db.report);
});
server.post("/api/offer_configuration/scenario_metrics", (req, res) => {
  res.status(200).json(db.scenario_metrics);
});

server.get("/api/scenario_comparision/metrics", (req, res) => {
  if (req.query.category == "products") {
    res.status(200).json(db.scenario_comparision_products);
  } else if (req.query.category == "segments") {
    res.status(200).json(db.scenario_comparision_segments);
  } else if (req.query.category == "overall") {
    res.status(200).json(db.scenario_comparision_overall);
  }
});

server.get("/api/scenario_comparision/reports", (req, res) => {
  if (req.query.category == "products") {
    res.status(200).json(db.scenario_comparision_products_report);
  } else if (req.query.category == "segments") {
    res.status(200).json(db.scenario_comparision_segments_report);
  } else if (req.query.category == "overall") {
    res.status(200).json(db.scenario_comparision_overall_report);
  }
});
server.get("/api/scenario_planner/edit", (req, res) => {
  res.status(200).json(db.edit);
});

server.get("/api/offer_configuration/edit/**", (req, res) => {
  res.status(200).json(db.offer_configuration_edit_id);
});

server.get("/api/offer_configuration/scenario_offers/**", (req, res) => {
  res.status(200).json(db.offer_configuration_edit_OfferConfigid);
});
server.get("/api/offer_configuration/list**", (req, res) => {
  res.status(200).json(db.offer_configuration_list);
});
server.get("/api/offer_configuration/product-category", (req, res) => {
  res.status(200).json(db.offer_pdt_cat);
});
server.get("/api/offer_configuration/segment/list", (req, res) => {
  res.status(200).json(db.segment_list);
});
server.get("/api/offer_configuration/promoobjective/list", (req, res) => {
  res.status(200).json(db.offer_promoobj);
});
server.get("/api/offer_configuration/promomechanic/", (req, res) => {
  res.status(200).json(db.offer_promomech);
});
server.get("/api/offer_configuration/getitem", (req, res) => {
  res.status(200).json(db.offer_getitem);
});

server.post("/api/offer_configuration/save", (req, res) => {
  res.status(200).json(db.offer_config_save);
});

server.get("/api/offer_configuration/promochannel/", (req, res) => {
  res.status(200).json(db.promochannel);
});
server.get("/api/offer_configuration/status/list", (req, res) => {
  res.status(200).json(db.status_list);
});

server.get("/api/offer_configuration/offer_duration/", (req, res) => {
  res.status(200).json(db.offer_configuration_offer_duration);
});
server.post("/api/offer_configuration/save/1", (req, res) => {
  res.status(200).json(db.save_1);
});
server.get("/api/scenario_planner/scenario_groups**", (req, res) => {
  res.status(200).json(db.promo_comparison);
});
// server.get("/api/scenario_planner/selection**", (req, res) => {
//   res.status(200).json(db.promo_comparison_selection);
// });
server.use(router);

server.listen(8080, () => {
  console.log("Run Auth API Server");
});
