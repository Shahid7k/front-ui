import React, { useState, useEffect } from 'react';
import ReactTypingEffect from 'react-typing-effect';
import qaScreenshot from '../../../images/qaScreenshot.jpg';
import BlogsScreenshot from '../../../images/BlogsScreenshot.jpg';
import Quote from './Quote';
import axios from 'axios';
import './landingPage.css';
import { mode } from '../../../utils/theme';

const initialCount = {
  blogCount: 0,
  userCount: 0,
  qaCount: 0,
};

const LandingPage = () => {
  const [counts, setCounts] = useState({ ...initialCount });

  useEffect(() => {
    (async function () {
      const a = await axios.get('http://localhost:8080/countPosts');
      const b = await axios.get('http://localhost:8080/usersCount');
      const c = await axios.get('http://localhost:8080/countqa');
      setCounts({
        blogCount: a.data.length,
        userCount: b.data.length,
        qaCount: c.data.length,
      });
    })();
  }, []);

  const { userCount, blogCount, qaCount } = counts;

  console.log('Counts: ', counts);

  return (
    <div className=' secondHalfOfHomePage'>
      <div style={mode}>
        <div className='BigOne'>
          <div
            className='site-blocks-cover overlay'
            id='txtt'
            data-aos='fade'
            data-stellar-background-ratio='0.5'
          >
            <header id='showcase'>
              <div className='showcase-content'>
                <h1
                  className='l-heading lead glow p-0'
                  // style={stylez.body}
                >
                  If you are a
                  <ReactTypingEffect
                    text={[' Student', ' Teacher', ' Coder', ' Aspirant']}
                    speed={100}
                    eraseDelay={2000}
                    typingDelay={1000}
                  />{' '}
                  <br />
                  then this is the right place <br /> to
                  <ReactTypingEffect
                    text={[' discover.', ' guide.', ' share.', ' achieve.']}
                    speed={100}
                    eraseDelay={1800}
                    typingDelay={1000}
                  />
                </h1>
                <hr className='p-0' />
                <p className='font19 p-0'>
                  <Quote />
                  {/* A Quotefdskankfs fdksn fs akf f ssdk - someone    */}
                </p>
              </div>
            </header>
          </div>

          <div className='bg-light' id='user-blog-qa'>
            <div className='user-blog-qa-item'>
              <img
                className='homeIcons'
                style={{ textAlign: 'left' }}
                src='https://img.pngio.com/group-icon-png-crosby-community-group-icon-png-1600_1600.png'
                alt='Users'
              />
              <div className='text'>
                <strong className='heading'>
                  <span className='excerpt'>{userCount} </span> {' Users'}{' '}
                </strong>
              </div>
            </div>

            <div className='user-blog-qa-item'>
              <img
                className='homeIcons'
                src='https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/001/923/original/article.png'
                alt='Blogs'
              />
              <div className='text'>
                <strong className='heading'>
                  <span className='excerpt'>{blogCount} </span> {' Blogs'}{' '}
                </strong>
              </div>
            </div>
            <div className='user-blog-qa-item'>
              <img
                className='homeIcons'
                src='https://cdn0.iconfinder.com/data/icons/customer-service-and-feedback-part-2/64/Q_A-session-512.png'
                alt='Q&A'
              />
              <div className='text'>
                <strong className='heading'>
                  <span className='excerpt'>{qaCount} </span>
                  {' Q&A'}{' '}
                </strong>
              </div>
            </div>
            <div className='user-blog-qa-item'>
              <div className='text'>
                <strong className='heading'>
                  {' '}
                  with endless stories
                  <br /> to tell.{' '}
                </strong>
              </div>
            </div>
          </div>

          {/* <div className="block-quick-info-2" >
          <div className="container" >
            <div className="block-quick-info-2-inner bg-light"  >
              <div className="row font13"  >
                <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0" >
                  <div className="d-flex quick-info-2">
                  <img className="homeIcons" src="https://img.pngio.com/group-icon-png-crosby-community-group-icon-png-1600_1600.png"  />
                    <div className="text">
                      <strong className="d-block heading"> 
                      <span className="excerpt">100 </span> {" Users"} </strong>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0">
                  <div className="d-flex quick-info-2">
                    <img className="homeIcons" src="https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/001/923/original/article.png" />
                    <div className="text">
                      <strong className="d-block heading"> 
                      <span className="excerpt">100 </span> {"Blogs"} </strong>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0" >
                  <div className="d-flex quick-info-2">
                    <img className="homeIcons" src="https://cdn0.iconfinder.com/data/icons/customer-service-and-feedback-part-2/64/Q_A-session-512.png" />
                    <div className="text">
                      <strong className="d-block heading">
                      <span className="excerpt">100 </span> <br/>{"Q&A"} </strong>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-3 mb-3 mb-lg-0" >
                  <div className="d-flex quick-info-2">
                    <div className="text">
                      <strong className="d-block heading" id="cursive" >with endless stories to tell</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          </div> */}
        </div>

        <div
          className='screenshotsHome font14 bg-red'
          style={{ padding: '55px 20px' }}
        >
          <img
            className='px-3 img-fluid rounded'
            src={BlogsScreenshot}
            alt='BlogsScreenshot'
          />

          <span className='px-3 my-auto'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            molestiae minus necessitatibus voluptas consequatur illo harum
            maiores aspernatur fugit dolorum? Eligendi voluptatum magni earum
            quos officia ducimus itaque! Itaque, facilis? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Quo, ipsum tenetur eaque eius rem
            ullam dolore accusamus dicta corporis debitis laboriosam voluptatem,
            molestias placeat perspiciatis, cupiditate id vitae tempore quod?
          </span>
        </div>

        <div
          className='screenshotsHome bg-blue font14 text-white'
          style={{ padding: '55px 20px' }}
        >
          <span className='px-3 my-auto'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui
            molestiae minus necessitatibus voluptas consequatur illo harum
            maiores aspernatur fugit dolorum? Eligendi voluptatum magni earum
            quos officia ducimus itaque! Itaque, facilis?
          </span>

          <img
            className='px-3 img-fluid rounded '
            src={qaScreenshot}
            alt='QAsScreenshot'
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
