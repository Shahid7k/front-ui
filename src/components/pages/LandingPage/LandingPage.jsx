import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import Quote from './Quote';
import './landingPage.css';


const LandingPage = () => {
  return (
    <div>
      <div className="BigOne">   
      <div className="site-blocks-cover overlay" id="txtt"  data-aos="fade" data-stellar-background-ratio="0.5">
        <header id="showcase">
        <div className="showcase-content" >
          <h1 className="l-heading lead glow p-0" 
          // style={stylez.body}
          >If you are a 
            <ReactTypingEffect
              text={[" Student"," Teacher"," Coder"," Aspirant"]}
              eraseDelay= {3000}
              typingDelay={2000}
            /> <br/>
            then this is the right place <br/> to 
            <ReactTypingEffect
              text={[" discover."," guide."," share."," achieve."]}
              eraseDelay= {3000}
              typingDelay={2000}
              />
          </h1>
          <hr className="p-0"/>
          <p className="font19 p-0" >
          <Quote /> 
          {/* A Quotefdskankfs fdksn fs akf f ssdk - someone    */}
          </p>    
        </div>
        </header>
      </div>  


      <div className="bg-light" id="user-blog-qa">
          

          <div className="user-blog-qa-item">
          <img className="homeIcons" style={{textAlign:"left"}} alt="users" src="https://img.pngio.com/group-icon-png-crosby-community-group-icon-png-1600_1600.png"  />
          <div className="text" >
            <strong className="heading"> 
            <span className="excerpt">100 </span> {" Users"} </strong>
          </div>
          </div>


          <div className="user-blog-qa-item">
          <img className="homeIcons" alt="blogs" src="https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/001/923/original/article.png" />
          <div className="text">
            <strong className="heading"> 
            <span className="excerpt">100 </span> {"Blogs"} </strong>
          </div>
          </div>
          <div className="user-blog-qa-item">
          <img className="homeIcons" alt="QAs" src="https://cdn0.iconfinder.com/data/icons/customer-service-and-feedback-part-2/64/Q_A-session-512.png" />
          <div className="text">
            <strong className="heading">
            <span className="excerpt">100 </span>{"Q&A"} </strong>
          </div>
          </div>
          <div className="user-blog-qa-item">
          <div className="text">
            <strong className="heading"> with endless stories<br/> to tell. </strong>
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

    <div style={{paddingTop:"40px"}}>
    <hr /> 
    {/* Remove that <hr /> tag from the above code... It was kept just to show separation between work which is done, and which is to be done. */}
    The <br />
    remaining <br />
    part <br />
    of <br />
    The <br />
    Landing Page <br />
    </div>


    </div>
  );
};

export default LandingPage;
