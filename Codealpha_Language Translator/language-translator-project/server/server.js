const path = require("path");
const express = require("express");
const cors = require("cors");
const config = require("./config/env");
const translateRoutes = require("./routes/translateRoutes");

const app = express();
const frontendPath = path.join(__dirname, "..", "frontend");

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      const allowedLocalOrigins = /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/;

      if (allowedLocalOrigins.test(origin) || origin === config.clientUrl) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS."));
    },
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.static(frontendPath));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Translator API is running."
  });
});

app.use("/api", translateRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found."
  });
});

app.use((error, req, res, next) => {
  console.error("Translation error:", error.message);

  res.status(500).json({
    success: false,
    message: error.message || "Something went wrong while translating."
  });
});

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
