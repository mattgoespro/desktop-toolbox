import { app } from "electron";
import winston from "winston";

export class ApplicationLogger {
  private static _instance: ApplicationLogger;

  private logDirectory = app.getPath("logs");
  private _logger: winston.Logger;

  private constructor() {
    this._logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(winston.format.colorize(), winston.format.simple())
        }),
        new winston.transports.File({
          filename: "combined.log",
          dirname: this.logDirectory,
          level: "info",
          handleExceptions: true,
          handleRejections: true
        }),
        new winston.transports.File({
          filename: "application.log",
          level: "info",
          dirname: this.logDirectory
        }),
        new winston.transports.File({
          filename: "error.log",
          level: "error",
          dirname: this.logDirectory,
          handleExceptions: true,
          handleRejections: true
        })
      ]
    });
  }

  public static getInstance(): ApplicationLogger {
    if (!ApplicationLogger._instance) {
      ApplicationLogger._instance = new ApplicationLogger();
    }
    return ApplicationLogger._instance;
  }

  public info(...message: string[]): void {
    for (const msg of message) {
      this._logger.info(msg);
    }
  }

  public warn(...message: string[]): void {
    for (const msg of message) {
      this._logger.warn(msg);
    }
  }

  public error(error: string | Error, ...additionalMessages: string[]): void {
    if (error instanceof Error) {
      this._logger.error(error.message, ...additionalMessages, { stack: error.stack });
      return;
    }

    this._logger.error(error);
  }
}
