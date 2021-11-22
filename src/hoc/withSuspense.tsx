import React from 'react';

function WithSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  return (props: WCP) => {
    return (
      <React.Suspense fallback={<div>loading...</div>}>
        <WrappedComponent {...props} />
      </React.Suspense>
    );
  };
}

export default WithSuspense;
