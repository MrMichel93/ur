import Constants from "expo-constants";

export type NakamaConfig = {
  host: string;
  port: string;
  useSSL: boolean;
  serverKey: string;
  timeoutMs: number;
};

export type TransportMode = "offline" | "nakama";

type ExtraConfig = Record<string, string | number | boolean | undefined>;

const extra = (Constants.expoConfig?.extra ?? {}) as ExtraConfig;

const DEFAULT_NAKAMA_HOST = "207.154.229.39";
const DEFAULT_NAKAMA_PORT = 7350;
const DEFAULT_NAKAMA_USE_SSL = false;

const serverKeyEnvKeys = [
  "EXPO_PUBLIC_NAKAMA_SOCKET_SERVER_KEY",
  "EXPO_PUBLIC_NAKAMA_SERVER_KEY",
  "NAKAMA_SOCKET_SERVER_KEY",
] as const;

const getEnvValue = (key: string): string | number | boolean | undefined => {
  return process.env[key] ?? extra[key];
};

const parseBoolean = (value: string | number | boolean | undefined): boolean => {
  if (value === true || value === "true" || value === 1 || value === "1") {
    return true;
  }
  if (value === false || value === "false" || value === 0 || value === "0") {
    return false;
  }
  return false;
};

const parseNumber = (value: string | number | boolean | undefined, fallback: number): number => {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }
  return fallback;
};

const getServerKey = (): string | null => {
  for (const key of serverKeyEnvKeys) {
    const value = getEnvValue(key);
    if (value !== undefined && value !== null && value !== "") {
      return String(value);
    }
  }
  return null;
};

const hasRequiredNakamaKeys = (): boolean => getServerKey() !== null;

export const hasNakamaConfig = (): boolean => hasRequiredNakamaKeys();

const parseTransportMode = (value: string | number | boolean | undefined): TransportMode | null => {
  if (value === "nakama") return "nakama";
  if (value === "offline") return "offline";
  return null;
};

export const getTransportMode = (): TransportMode => {
  const configured = parseTransportMode(getEnvValue("EXPO_PUBLIC_GAME_TRANSPORT"));
  if (configured) {
    return configured;
  }

  return hasRequiredNakamaKeys() ? "nakama" : "offline";
};

export const isNakamaEnabled = (): boolean => getTransportMode() === "nakama";

export const getNakamaConfig = (): NakamaConfig => {
  if (!isNakamaEnabled()) {
    throw new Error("Nakama transport is disabled. Set EXPO_PUBLIC_GAME_TRANSPORT=nakama to enable.");
  }

  if (!hasRequiredNakamaKeys()) {
    throw new Error(
      "Missing required Nakama config value(s): EXPO_PUBLIC_NAKAMA_SOCKET_SERVER_KEY or EXPO_PUBLIC_NAKAMA_SERVER_KEY"
    );
  }

  const configuredPort = parseNumber(getEnvValue("EXPO_PUBLIC_NAKAMA_PORT"), DEFAULT_NAKAMA_PORT);
  const configuredServerKey = getServerKey();
  if (!configuredServerKey) {
    throw new Error(
      "Missing required Nakama config value(s): EXPO_PUBLIC_NAKAMA_SOCKET_SERVER_KEY or EXPO_PUBLIC_NAKAMA_SERVER_KEY"
    );
  }

  return {
    host: String(getEnvValue("EXPO_PUBLIC_NAKAMA_HOST") ?? DEFAULT_NAKAMA_HOST),
    port: String(configuredPort),
    useSSL: parseBoolean(getEnvValue("EXPO_PUBLIC_NAKAMA_USE_SSL") ?? DEFAULT_NAKAMA_USE_SSL),
    serverKey: configuredServerKey,
    timeoutMs: parseNumber(getEnvValue("EXPO_PUBLIC_NAKAMA_TIMEOUT_MS"), 7000),
  };
};
