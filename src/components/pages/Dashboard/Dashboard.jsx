import React from 'react';
import BlogComponent from '../BlogComponent/BlogComponent';

const Dashboard = () => {
  // const onSubmit = (e, markup) => {
  //   console.log(e);
  //   console.log(markup);
  //   setContent(markup);
  // };

  return (
    <div>
      My Dashboard Page
      <BlogComponent />
    </div>
  );
};

export default Dashboard;
