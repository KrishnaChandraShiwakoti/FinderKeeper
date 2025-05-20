import React from "react";
import { useRouteError, Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  if (error.status === 404) {
    return (
      <main>
        <div>
          <p>404</p>
          <h1>Page not found</h1>
          <p>Sorry, we couldn’t find the page you’re looking for.</p>
          <div>
            <Link to="/">Go back home</Link>
          </div>
        </div>
      </main>
    );
  }

  console.log(error);

  return (
    <main>
      <h4>there was an error... </h4>
    </main>
  );
};

export default Error;
