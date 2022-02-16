import express from "express";
import nunjucks from "nunjucks";
import request from "@fewlines-education/request";

const app = express();
app.use(express.static("public"));

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

app.get("/", (req, response) => {
  request("http://videogame-api.fly.dev/platforms", (error, body) => {
    if (error) {
      throw error;
    }

    const platform = JSON.parse(body);
    console.log(platform);
    response.render("home", { platformName: platform.platforms });
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
