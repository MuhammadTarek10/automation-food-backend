const config = require("config");

module.exports = {
    PORT: config.get("PORT") || process.env.PORT || 3000,
    NODE_ENV: config.get("NODE_ENV") || process.env.NODE_ENV || "development",
    DB_URL: config.get("DB_URL") || process.env.DB_URL || "mongodb://localhost:27017/",
    DB_NAME: config.get("DB_NAME") || process.env.DB_NAME || "",
    DB_USER: config.get("DB_USER") || process.env.DB_USER || "",
    DB_PASSWORD: config.get("DB_PASSWORD") || process.env.DB_PASSWORD || "",
}