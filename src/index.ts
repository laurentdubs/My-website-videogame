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

app.get("/platforms", (req, response) => {
  request("http://videogame-api.fly.dev/platforms", (error, body) => {
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

  request(`http://videogame-api.fly.dev/games/platforms/${idParameters}`, (error, body) => {
    if (error) {
      throw error;
    }

    const onePlatform = JSON.parse(body);
    console.log(onePlatform);

    response.render("onePlatform", { gameName: onePlatform.games, parameterValue: idParameters });
  });
});

// app.get("/games/:slug", (req, response) => {
//   const slug = req.params.slug;
//   request(`http://videogame-api.fly.dev/games/slug/${slug}`, (error, body) => {
//     if (error) {
//       throw error;
//     }

//     const game = JSON.parse(body);
//     console.log(game);
//     response.render("game", { game, gameGenres: game.games.genres });
//   });
// });

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
