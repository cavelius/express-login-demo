import express, { response } from "express";
import path, { dirname } from "path";
import { URL } from "url";

// Wir erstellen eine neue Express-App/Instanz mit express()
// Wir weisen ihn an, auf dem Port 3000 des Computers auf Anfragen zu warten.
// Jede Ausgabe wird an dem Terminal protokolliert, an dem wir die App gestartet haben!

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded());

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// 1. GET /
// Dieser Code definiert eine Route ("/") in einer Node.js-Anwendung,
// die eine HTTP GET-Anfrage auf diese Route behandelt, eine Nachricht
// in der Konsole ausgibt?? und dann die Datei "index.html" als Antwort
// auf die Anfrage zurücksendet.

const directoryName = path.dirname(new URL(import.meta.url).pathname);
app.get("/", function (request, response) {
  console.log("serving index.html welcome page...");
  response.sendFile(path.join(directoryName, "/index.html"));
});

// 2. GET /echo/:message
app.get("/echo/:message", (request, response) => {
  console.log("request", request.params);
  const message = request.params.message;

  if (message === "hello") {
    response.send("hello");
  } else {
    response.send("the secret is... 42!");
  }
});

app.get("/login", (request, response) => {
  response.sendFile(path.join(directoryName, "/login.html"));
});
app.get("/my-account", (request, response) => {
  response.sendFile(path.join(directoryName, "/my-account.html"));
});
app.get("/error", (request, response) => {
  response.sendFile(path.join(directoryName, "/error.html"));
});

app.post("/login/", (request, response) => {
  console.log("form input", request.body);

  const inputEmail = request.body["input-email"];
  const inputPW = request.body["input-password"];

  if (inputEmail === "" && inputPW === "") {
    response.redirect("/error");
  } else if (inputEmail === "user@email.com" && inputPW === "very-secret") {
    response.redirect("/my-account");
  } else {
    response.redirect("/error");
  }
});

// response.send(path.join(directoryName, "/error.html"))
// console.log("serving error.html")

// starting server, after all route definitions:
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
