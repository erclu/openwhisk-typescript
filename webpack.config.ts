import * as path from "path";
import * as webpack from "webpack";

const dist = "bundles";

// TODO migrate to webpack v5: https://webpack.js.org/migrate/5/
const config: webpack.Configuration = {
  // TODO detect this automatically somehow
  entry: {
    // XXX add the actions entrypoints to this list
    hello: `./src/hello.ts`,
  },
  output: {
    path: path.resolve(__dirname, dist),
    filename: "[name].bundled.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            // XXX speeds up build significantly. Rely on tsc compiler & vscode to detect type errors
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [
      ".js", //
      ".ts",
      ".tsx",
      ".json",
    ],
  },
  mode: "production",
  target: "node",
  node: {
    __dirname: true,
  },
  // TODO add fork-ts-checker-webpack-plugin to speedup builds
  plugins: [],
  externals: {},
};

const installedModules = [
  // XXX these should be the installed modules in openwhisk/action-nodejs-v12 (top level only)
  "body-parser",
  "express",
  "openwhisk",
  "redis",
  "serialize-error",
  "uuid",
  // -------------------------------------------------------------------------------------------------------------------
  // XXX these were the installed modules in IBM cloud functions
  // "amqplib",
  // "apn",
  // "async",
  // "bent",
  // "body-parser",
  // "btoa",
  // "cassandra-driver",
  // "cloudant",
  // "@cloudant/cloudant",
  // "commander",
  // "composeaddresstranslator",
  // "consul",
  // "cookie-parser",
  // "cradle",
  // "elasticsearch",
  // "errorhandler",
  // "etcd3",
  // "express",
  // "express-session",
  // "formidable",
  // "glob",
  // "gm",
  // "ibm-cos-sdk",
  // "ibm_db",
  // "ibmiotf",
  // "iconv-lite",
  // "jsdom",
  // "jsonwebtoken",
  // "lodash",
  // "log4js",
  // "marked",
  // "merge",
  // "moment",
  // "mongodb",
  // "mysql",
  // "mustache",
  // "nano",
  // "nodemailer",
  // "oauth2-server",
  // "openwhisk",
  // "path-to-regex",
  // "pg",
  // "process",
  // "pug",
  // "redis",
  // "request",
  // "request-promise",
  // "rimraf",
  // "semver",
  // "@sendgrid/mail@6.3.1",
  // "serve-favicon",
  // "superagent",
  // "twilio",
  // "underscore",
  // "url-pattern",
  // "uuid",
  // "validator",
  // "watson-developer-cloud",
  // "when",
  // "winston",
  // "ws",
  // "xml2js",
  // "xmlhttprequest",
  // "yauzl",
  // -------------------------------------------------------------------------------------------------------------------
];

config.externals = installedModules.reduce(
  (previousExternals: webpack.ExternalsObjectElement, nodeModule: string) => {
    previousExternals[nodeModule] = `commonjs ${nodeModule}`;
    return previousExternals;
  },
  {},
);

export default config;
