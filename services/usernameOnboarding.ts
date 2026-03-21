import {
  ClaimUsernameRpcResponse,
  ClaimUsernameRpcRequest,
  UsernameOnboardingStatusRpcRequest,
  UsernameOnboardingStatusRpcResponse,
  isClaimUsernameRpcResponse,
  isUsernameOnboardingStatusResponse,
} from "@/shared/usernameOnboarding";
import { User } from "@/src/types/user";
import { nakamaService } from "./nakama";

const RPC_GET_USERNAME_ONBOARDING_STATUS = "get_username_onboarding_status";
const RPC_CLAIM_USERNAME = "claim_username";

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

const getAuthenticatedSession = async () => {
  const session = await nakamaService.loadSession();
  if (!session) {
    throw new Error("No active Nakama session. Authenticate before managing username onboarding.");
  }

  return session;
};

export const getUsernameOnboardingStatus = async (
  user: Pick<User, "username" | "email">,
): Promise<UsernameOnboardingStatusRpcResponse> => {
  const session = await getAuthenticatedSession();
  const request: UsernameOnboardingStatusRpcRequest = {
    displayNameHint: user.username,
    emailHint: user.email,
  };

  const response = await nakamaService
    .getClient()
    .rpc(session, RPC_GET_USERNAME_ONBOARDING_STATUS, request);
  const payload = normalizeRpcPayload(response.payload);

  if (!isUsernameOnboardingStatusResponse(payload)) {
    throw new Error("Username onboarding status RPC payload is invalid.");
  }

  return payload;
};

export const claimUsername = async (username: string): Promise<ClaimUsernameRpcResponse> => {
  const session = await getAuthenticatedSession();
  const request: ClaimUsernameRpcRequest = {
    username,
  };

  const response = await nakamaService.getClient().rpc(session, RPC_CLAIM_USERNAME, request);
  const payload = normalizeRpcPayload(response.payload);

  if (!isClaimUsernameRpcResponse(payload)) {
    throw new Error("Claim username RPC payload is invalid.");
  }

  return payload;
};

export const updateAccountDisplayName = async (displayName: string): Promise<void> => {
  const session = await getAuthenticatedSession();
  await nakamaService.getClient().updateAccount(session, {
    display_name: displayName,
  });
};
