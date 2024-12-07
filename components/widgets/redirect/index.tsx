import React, { useEffect } from 'react';

export const IS_CLIENT = typeof window !== 'undefined';
interface Redirector {
  path: string;
}
const Redirect: React.FC<Redirector> = ({ path }) => {
  useEffect(() => {
    if (IS_CLIENT) {
      window.location.replace(path);
    }
  }, [IS_CLIENT]);
  return (
    <div className="my-5 d-flex justify-content-center">
      <h2>Redirecting...</h2>
    </div>
  );
};

export default Redirect;
