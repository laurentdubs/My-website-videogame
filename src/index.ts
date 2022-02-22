import express from "express";
import nunjucks from "nunjucks";
import fetch from "node-fetch";

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
  fetch("http://videogame-api.fly.dev/games")
    .then((response) => response.json())
    .then((allGames) => response.render("games", { allGames }));
  //   .catch((error) => {
  //     console.error(error);
  //  });
});
// const allGames = JSON.parse(body).games;
// console.log(allGames);
// response.render("games", { allGames });

app.get("/platforms", (req, response) => {
  fetch("http://videogame-api.fly.dev/platforms/")
    .then((response) => response.json())
    .then((platform) => response.render("platforms", { platformName: platform.platforms }));
  // const platform = JSON.parse(body);
  // console.log(platform);
  // response.render("platforms", { platformName: platform.platforms });
});

app.get("/platforms/:id", (req, response) => {
  const idParameters = req.params.id;
  console.log(44, idParameters);

  request(`http://videogame-api.fly.dev/games/platforms/${idParameters}`, (error, body) => {
    if (error) {
      throw error;
    }

    const onePlatform = JSON.parse(body);
    console.log(onePlatform);

    response.render("onePlatform", { gameName: onePlatform.games, parameterValue: idParameters });
  });
});

app.get("/platforms/:id/:slug", (req, response) => {
  const slugParameters = req.params.slug;
  console.log(60, slugParameters);

  request(`http://videogame-api.fly.dev/games/slug/${slugParameters}`, (error, body) => {
    if (error) {
      throw error;
    }

    const dataGame = JSON.parse(body);
    console.log(dataGame);
    response.render("oneGame", { detailsGame: dataGame.game_screenshots, parameterValue: slugParameters });
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
