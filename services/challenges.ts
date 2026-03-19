import {
  ChallengeDefinitionsRpcResponse,
  UserChallengeProgressRpcResponse,
} from "../shared/challenges";
import { isProgressionSnapshot, ProgressionRpcResponse } from "../shared/progression";
import { nakamaService } from "./nakama";

const RPC_GET_CHALLENGE_DEFINITIONS = "get_challenge_definitions";
const RPC_GET_USER_CHALLENGE_PROGRESS = "get_user_challenge_progress";
const RPC_GET_USER_XP_PROGRESS = "get_user_xp_progress";

const normalizeRpcPayload = (payload: unknown): unknown => {
  if (typeof payload !== "string") {
    return payload;
  }

  try {
    return JSON.parse(payload);
  } catch {
    return payload;
  }
};

const isChallengeDefinitionsResponse = (value: unknown): value is ChallengeDefinitionsRpcResponse => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const response = value as ChallengeDefinitionsRpcResponse;
  return Array.isArray(response.challenges);
};

const isUserChallengeProgressResponse = (value: unknown): value is UserChallengeProgressRpcResponse => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const response = value as UserChallengeProgressRpcResponse;
  return (
    typeof response.totalCompleted === "number" &&
    typeof response.totalRewardedXp === "number" &&
    typeof response.updatedAt === "string" &&
    typeof response.challenges === "object" &&
    response.challenges !== null
  );
};

const runRpc = async (rpcId: string): Promise<unknown> => {
  const session = await nakamaService.loadSession();
  if (!session) {
    throw new Error("No active Nakama session. Authenticate before requesting challenge data.");
  }

  const response = await nakamaService.getClient().rpc(session, rpcId, {});
  return normalizeRpcPayload(response.payload);
};

export const getChallengeDefinitions = async (): Promise<ChallengeDefinitionsRpcResponse> => {
  const payload = await runRpc(RPC_GET_CHALLENGE_DEFINITIONS);
  if (!isChallengeDefinitionsResponse(payload)) {
    throw new Error("Challenge definitions RPC payload is invalid.");
  }

  return payload;
};

export const getUserChallengeProgress = async (): Promise<UserChallengeProgressRpcResponse> => {
  const payload = await runRpc(RPC_GET_USER_CHALLENGE_PROGRESS);
  if (!isUserChallengeProgressResponse(payload)) {
    throw new Error("Challenge progress RPC payload is invalid.");
  }

  return payload;
};

export const getUserXpProgress = async (): Promise<ProgressionRpcResponse> => {
  const payload = await runRpc(RPC_GET_USER_XP_PROGRESS);
  if (!isProgressionSnapshot(payload)) {
    throw new Error("XP progress RPC payload is invalid.");
  }

  return payload;
};
