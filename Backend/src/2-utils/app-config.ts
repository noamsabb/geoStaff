import dotenv from "dotenv"; // npm i dotenv

// Load .env file into process.env object.
dotenv.config({ quiet: true });

class AppConfig {
  public readonly isDevelopment = process.env.ENVIRONMENT === "development";
  public readonly isProduction = process.env.ENVIRONMENT === "production";
  public readonly port = 4000;
  public readonly mongodbConnectionString =
    process.env.MONGODB_CONNECTION_STRING!;
}

export const appConfig = new AppConfig();
