import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
  production: true,
  logging: {
    serverLoggingUrl: 'https://localhost/logs',
    level: NgxLoggerLevel.DEBUG,
    serverLogLevel: NgxLoggerLevel.ERROR
  }
};
