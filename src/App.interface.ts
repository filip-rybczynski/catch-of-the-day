import { RouteComponentProps } from "react-router";

interface MatchParams {
    storeId: string;
  }
  
export interface AppProps extends RouteComponentProps<MatchParams> {}