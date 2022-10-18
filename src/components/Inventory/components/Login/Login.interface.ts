import { AuthenticateFunction, AvailableProviders } from "../../types";

export interface LoginProps {
    authFunction: AuthenticateFunction,
    claim: boolean,
    providers: AvailableProviders[],
}