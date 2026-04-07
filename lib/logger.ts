type Metadata = Record<string, unknown> | undefined;

export function logInfo(message: string, metadata?: Metadata) {
  console.info(`[TechCash] ${message}`, metadata || "");
}

export function logWarn(message: string, metadata?: Metadata) {
  console.warn(`[TechCash] ${message}`, metadata || "");
}

export function logError(message: string, metadata?: Metadata) {
  console.error(`[TechCash] ${message}`, metadata || "");
}
