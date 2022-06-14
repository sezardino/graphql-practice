import { ApolloError } from "@apollo/client";
import { Spinner } from "./Spinner";

interface Props {
  loading: boolean;
  error: ApolloError | undefined;
  hasData: boolean;
  children: React.ReactNode;
}

export const ViewComponent: React.FC<Props> = (props) => {
  const { loading, error, hasData, children } = props;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!hasData) {
    return <p>There are no data</p>;
  }

  return <>{children}</>;
};
