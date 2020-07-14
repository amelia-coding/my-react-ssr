import Counter from '@components/Counter';
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

const Index: React.FC = () => {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" name="description Index" />
        <title>Index</title>
      </Helmet>
      <div>
        Index
        <div>
          <Counter />
        </div>
      </div>
    </Fragment>
  );
};

export default Index;
