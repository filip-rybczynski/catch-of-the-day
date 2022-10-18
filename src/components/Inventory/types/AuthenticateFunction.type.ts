import { AvailableProviders } from "./AvailableProviders.type";

export type AuthenticateFunction = (provider: AvailableProviders, claim?: boolean) => void;