import { config } from "dotenv";
import {
  Logger,
  format as _format,
  transports as _transports,
  createLogger,
} from "winston";
import { dateFormat } from "../utils/utils.js";
config();

export class LoggerService {
  private route: string;
  private logger: Logger;

  constructor(route: string) {
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

  info(message: string) {
    this.logger.info(message);
  }

  error(message: unknown) {
    this.logger.error(message);
  }

  warn(message: any) {
    this.logger.warn(message);
  }

  debug(message: any) {
    this.logger.debug(message);
  }
}
