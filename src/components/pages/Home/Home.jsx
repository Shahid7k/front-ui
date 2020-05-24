import React from 'react';
import BlogCard from '../../layout/BlogCard';
import BlogEditor from '../BlogComponent/BlogEditor/BlogEditor';

const blogs = [
  {
    title: 'test1',
    description: 'hfdjhfdhjaf',
    content: '',
  },
  {
    title: 'test2',
    description: 'hfdjhfdhjaf',
    content: '',
  },
  {
    title: 'test3',
    description: 'hfdjhfdhjaf',
    content: '',
  },
  {
    title: 'test4',
    description: 'hfdjhfdhjaf',
    content: '',
  },
  {
    title: 'test',
    description: 'hfdjhfdhjaf',
    content: '',
  },
];

const Home = () => {
  const [targetIndex, setTargetIndex] = React.useState(0);

  return (
    <div>
      <button
        onClick={() => setTargetIndex(0)}
        className='btn btn-danger ml-auto d-block my-2 mr-3'
      >
        Close
      </button>
      {targetIndex ? (
        <BlogEditor
          readOnly={true}
          toolbarHidden={true}
          initialBlogState={blogs[targetIndex - 1]}
        />
      ) : (
        <div className='row container'>
          {blogs.map((blog, index) => (
            <div
              onClick={() => setTargetIndex(index + 1)}
              key={`blog-${index}`}
              className='col-md-4 col-md-offset-3'
            >
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
