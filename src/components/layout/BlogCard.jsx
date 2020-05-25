import React from 'react';

const BlogCard = props => {
  const {
    image,
    blog: { title, description, content },
  } = props;

  return (
    <div className='card' style={{ cursor: 'pointer' }}>
      <img src={image} className='card-img-top' alt='Card Image' />
      <div className='card-body'>
        <p className='card-text'>{title}</p>
        <p className='card-text'>{description}</p>
      </div>
    </div>
  );
};

BlogCard.defaultProps = {
  image:
    'https://images.unsplash.com/photo-1542435503-956c469947f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
  blog: {
    title: '',
    description: '',
    content: '',
  },
};

export default BlogCard;
