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
  response.render("home");
});

app.get("/games", (req, response) => {
  request("http://videogame-api.fly.dev/games", (error, body) => {
    if (error) {
      throw error;
    } else {
      const allGames = JSON.parse(body).games;
      console.log(allGames);
      response.render("games", { allGames });
    }
  });
});

app.get("/platforms", (req, response) => {
  request("http://videogame-api.fly.dev/platforms/", (error, body) => {
    if (error) {
      throw error;
    }

    const platform = JSON.parse(body);
    console.log(platform);
    response.render("platforms", { platformName: platform.platforms });
  });
});

app.get("/platforms/:id", (req, response) => {
  const idParameters = req.params.id;
  console.log(idParameters);

  request(`http://videogame-api.fly.dev/games/platforms/${idParameters}`, (error, body) => {
    if (error) {
      throw error;
    }

    const onePlatform = JSON.parse(body);
    console.log(onePlatform);

    response.render("onePlatform", { gameName: onePlatform.games, parameterValue: idParameters });
  });
});

app.get("features/:id", (req, response) => {
  const idParameters = req.params.id;

  request(`http://videogame-api.fly.dev/games/${idParameters}`, (error, body) => {
    if (error) {
      throw error;
    }

    const data = JSON.parse(body);
    console.log(data);
    response.render("oneGame", { featureGame: data.screenshots, parameterValue: idParameters });
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
