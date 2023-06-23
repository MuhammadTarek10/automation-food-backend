import {
  createLogger,
  format as _format,
  transports as _transports,
} from "winston";
import { config } from "dotenv";
import { dateFormat } from "../utils/utils.js";
config();

export class LoggerService {
  constructor(route) {
    this.route = route;
    this.logger = createLogger({
      level: "info",
      format: _format.printf(
        (info) => `${dateFormat()} ${info.level}: ${info.message}`
      ),
      transports: [
        new _transports.Console(),
        new _transports.File({
          filename: `${process.env.LOG_FILE_PATH}/${route}.log`,
        }),
      ],
    });
  }

  info(message) {
    this.logger.info(message);
  }

  error(message) {
    this.logger.error(message);
  }

  warn(message) {
    this.logger.warn(message);
  }

  debug(message) {
    this.logger.debug(message);
  }
}
