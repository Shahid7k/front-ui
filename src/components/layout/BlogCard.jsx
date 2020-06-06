import React from 'react';
import { mode, condition } from '../../utils/theme';

const BlogCard = props => {
  const {
    image,
    blog: { title, description, content },
    name,
  } = props;

  const userName = name === null ? 'Anonymous' : name;

  return (
    <div
      className={`card border-0 p-0 ${
        condition ? 'card-dark' : 'bg-white'
      } pointer `}
      style={mode}
    >
      <img src={image} className='card-img-top' alt='Card cap' />

      <div className='card-body'>
        <p className='font11 card-text'>{title}</p>
        <p className='font09 card-text text-truncate'>{description}</p>
        {userName !== '' ? (
          <p className='card-text text-right'>~ {userName}</p>
        ) : (
          ''
        )}
      </div>
      <div className='card-text text-italic'>{content}</div>
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
