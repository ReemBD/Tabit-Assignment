/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

enum LogLevel {
  Debug = 'Debug',
  Information = 'Information',
  Warning = 'Warning',
  Error = 'Error',
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private readonly applicationName: string = environment.APPLICATION_NAME;
  private readonly maxCharToTakeFromDate: number = 24;

  public constructor() {}

  public log(message: unknown, ...optionalParams: unknown[]): void {
    if (!this.shouldWriteLog()) return;

    console.log(
      this.buildLogPrefix(LogLevel.Information),
      message,
      ...optionalParams
    );
  }

  public debug(message: unknown, ...optionalParams: unknown[]): void {
    if (!this.shouldWriteLog()) return;

    console.debug(
      this.buildLogPrefix(LogLevel.Debug),
      message,
      ...optionalParams
    );
  }

  public warn(message: unknown, ...optionalParams: unknown[]): void {
    if (!this.shouldWriteLog()) return;

    console.warn(
      this.buildLogPrefix(LogLevel.Warning),
      message,
      ...optionalParams
    );
  }

  public error(message: unknown, ...optionalParams: unknown[]): void {
    if (!this.shouldWriteLog()) return;

    console.error(
      this.buildLogPrefix(LogLevel.Error),
      message,
      ...optionalParams
    );
  }

  private buildLogPrefix(logLevel: LogLevel): string {
    const timestamp: string = new Date()
      .toString()
      .substring(0, this.maxCharToTakeFromDate);
    const template: string = `${logLevel}: [${timestamp}] [${this.applicationName}]`;

    return template;
  }

  private shouldWriteLog(): boolean {
    return environment.development;
  }
}
