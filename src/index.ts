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
  request("http://videogame-api.fly.dev/games", (error, body) => {
    if (error) {
      throw error;
    }

    const game = JSON.parse(body);
    console.log(game);
    response.render("home", { gameName: game.games });
  });
});

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
