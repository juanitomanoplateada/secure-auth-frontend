const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 8080;

// 👇 Ruta del build
const angularDistPath = path.join(
  __dirname,
  "dist",
  "secure-auth-frontend",
  "browser"
);

app.use(express.static(angularDistPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(angularDistPath, "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Frontend corriendo en http://localhost:${port}`);
});
