import { useRouteError } from "react-router-dom"

interface MyRouteError { 
  statusText: string;
  message: string;
}
const ErrorPage = () => {
  const error: MyRouteError = useRouteError() as MyRouteError;
  console.error(error);
  return (
    <div>
      <h1>Oops!</h1>
      <p>Error occurred</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage