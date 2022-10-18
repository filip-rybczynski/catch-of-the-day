import { AvailableProviders, AuthenticateFunction } from "../../../../types";

export interface AuthButtonProps {
    buttonType: "Claim store" | "Log in";
    provider: AvailableProviders;
    authFunction: AuthenticateFunction;
}