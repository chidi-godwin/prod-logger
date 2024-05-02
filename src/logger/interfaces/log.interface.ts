import { LogLevel } from '../enums/level.enum';

export interface Log {
  timestamp: number; // Unix timestamp
  level: LogLevel; // Log level
  message: string; // Log message
  data: LogData; // Log data
}

export interface LogData {
  organization?: string; // Organization or project name
  context?: string; // Bounded Context name
  app?: string; // Application or Microservice name
  sourceClass?: string; // Classname of the source
  correlationId?: string; // Correlation ID
  error?: Error; // Error object
  data?: NodeJS.Dict<any>; // Additional custom properties
}
