module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: "PRS",
      script: "index.js",
      cwd: process.cwd(),
      env: {
        COMMON_VARIABLE: "true"
      },
      env_production: {
          "PORT": process.env.PRS_PRODUCTION_PORT,
          NODE_ENV: "production",
          HOST: process.env.PRS_MYSQL_URL_HOST,
          USER: process.env.PRS_MYSQL_USERNAME_USER,
          PASSWORD: process.env.PRS_MYSQL_PASSWORD,
          DATABASE: process.env.PRS_MYSQL_DATABASE
      },
      env_staging: {
          "PORT": process.env.PRS_PRODUCTION_PORT,
          NODE_ENV: "production",
          HOST: process.env.PRS_MYSQL_URL_HOST,
          USER: process.env.PRS_MYSQL_USERNAME_USER,
          PASSWORD: process.env.PRS_MYSQL_PASSWORD,
          DATABASE: process.env.PRS_MYSQL_DATABASE
      }
    }
  ]
};

