// import chalk from "chalk";
// import Bugsnag from "@bugsnag/js";
// import BugsnagPluginExpress from "@bugsnag/plugin-express";

// import ExceptionUtils from "./exception";

// export default class LoggerUtils {
//   constructor() {
//     try {
//       if (process.env.NODE_ENV === "production") {
//         global.bugsnag = Bugsnag.start({
//           appVersion: process.env.npm_package_version,
//           autoTrackSessions: false,
//           apiKey: process.env.BUGSNAG_KEY,
//           plugins: [BugsnagPluginExpress],
//           releaseStage: process.env.NODE_ENV,
//         });
//       }
//     } catch (error) {
//       LoggerUtils.error("Bugsnag not loaded!");
//       console.log(error);
//     }
//   }

//   static getRequestInfo(req) {
//     const connection = req.connection;
//     const address = connection && connection.address && connection.address();
//     const portNumber = address && address.port;
//     const port =
//       !portNumber || portNumber === 80 || portNumber === 443
//         ? ""
//         : `:${portNumber}`;
//     const protocol =
//       typeof req.protocol !== "undefined"
//         ? req.protocol
//         : req.connection.encrypted
//         ? "https"
//         : "http";
//     const hostname = (
//       req.hostname ||
//       req.host ||
//       req.headers.host ||
//       ""
//     ).replace(/:\d+$/, "");
//     const url = `${protocol}://${hostname}${port}${req.originalUrl}`;

//     return {
//       url: url,
//       path: req.originalUrl || req.path || req.url,
//       httpMethod: req.method,
//       headers: req.headers,
//       httpVersion: req.httpVersion,
//       body: req.body,
//       params: req.params,
//       query: req.query,
//       clientIp: req.ip || (connection ? connection.remoteAddress : undefined),
//       referer: req.headers.referer || req.headers.referrer,
//     };
//   }

//   static log(req, error) {
//     if (error instanceof ExceptionUtils) {
//       return;
//     }

//     const event = global.bugsnag.Event.create(
//       error,
//       false,
//       {
//         severity: "error",
//         unhandled: false,
//         severityReason: {
//           type: "handledError",
//           attributes: { framework: "Logger" },
//         },
//       },
//       "api logger",
//       1
//     );

//     event.addMetadata("request", this.getRequestInfo(req));

//     global.bugsnag
//       ? global.bugsnag._notify(event)
//       : console.info(chalk.red(error.stack || error));
//   }

//   static error() {
//     console.info(chalk.red(...arguments));
//   }

//   static success() {
//     console.info(chalk.green(...arguments));
//   }
// }
