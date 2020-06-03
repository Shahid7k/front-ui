import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='bg-dark text-light footer'>
      <div className='p-2 container d-flex'>
        <div className='text-left flex-fill px-1font-weight-light'>
          &nbsp;
          <span className='megrim font-weight-bold'> DeVlog </span>
          &nbsp;
          <code className='font-weight-bold'>version 1.0</code>
          &nbsp;
        </div>
        <div className='text-center flex-fill '>
          <div className='text-right  d-inline-block mx-1  text-capitalize'>
            Contact Us :
          </div>
          <a
            href='mailto:someone@example.com'
            className='text-center d-inline-block mx-1 '
          >
            <i
              className='fa fa-envelope'
              aria-hidden='false'
              data-toggle='tooltip'
              data-placement='top'
              title='OurMailID will show up here!'
            />
            {/* Mail     */}
          </a>
          <a
            href='#OurFaceBookPage'
            className='text-center p-0 d-inline-block mx-1 '
          >
            <i className='fa fa-facebook' aria-hidden='true' />
            {/* Facebook */}
          </a>
          <a href='#OurInstaPage' className='text-center d-inline-block mx-1 '>
            <i className='fa fa-instagram' aria-hidden='true' />
            {/* Instagram  */}
          </a>
        </div>
        {/* <div className="text-center p-0  flex-fill ">
                {"_ _ _"}
            </div> */}
      </div>
      <div>
        <button
          className='btn btn-link text-light shadow-none'
          type='button'
          data-toggle='collapse'
          data-target='#collapseExample'
          aria-expanded='false'
          aria-controls='collapseExample'
        >
          <i class='fas fa-users mr-2' />
          Who We Are
        </button>
        <div className='d-flex-wrap collapse' id='collapseExample'>
          <div className='card card-body bg-dark text-light'>
            We work together to design and produce a service to the ones who
            intend to seek as well as share knowledge.
            <br />
            We believe that connections happen through great stories to tell,
            irrespective of who they are.
          </div>
        </div>
        <div style={{ background: 'rgba(255, 255, 255, 0.1)' }}>
          <code style={{ color: 'white' }}>
            Copyrights &copy; 2020 @ projects.DeVlog. All Rights Reserved.
          </code>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
