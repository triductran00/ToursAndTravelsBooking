import React from 'react'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo2.png'

const quick__links=[
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  }
]

const quick__links2=[
  {
    path: '/gallery',
    display: 'Gallery'
  },
  {
    path: '/login',
    display: 'Login'
  },
  {
    path: '/register',
    display: 'Register'
  }
]

const Footer = () => {

  const year = new Date().getFullYear
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate('/home');
  }

  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='3'>
            <div className="logo" onClick={navigateHome}>
              <img src={logo} alt="Logo" style={{ cursor: 'pointer' }} />
              <p>Explore the world with us and discover unforgettable experiences. Our team is dedicated to providing you with the best travel insights and tips to make your journey extraordinary.</p>
              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to='#'><i class="ri-youtube-line"></i></Link>
                </span>
                <span>
                  <Link to='#'><i class="ri-github-fill"></i></Link>
                </span>
                <span>
                 <Link to='#'><i class="ri-facebook-circle-line"></i></Link>
                </span>
                <span>
                  <Link to='#'><i class="ri-instagram-line"></i></Link>
                </span>
              </div>
            </div>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className='footer__quick-links'>
              {
                quick__links.map((item, index)=>(
                  <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg='3'>
          <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className='footer__quick-links2'>
              {
                quick__links2.map((item, index)=>(
                  <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg='3'>
          <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className='footer__quick-links'>
                  <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                    <h6 className='mb-0 d-flex align-items-center gap-2'>
                      <span><i class="ri-map-pin-line"></i></span>
                      Address:
                    </h6>
                    <p className='mb-0'>Ho Chi Minh City</p>
                  </ListGroupItem>

                  <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                    <h6 className='mb-0 d-flex align-items-center gap-2'>
                      <span><i class="ri-mail-line"></i></span>
                      Email:
                    </h6>
                    <p className='mb-0'>tductri3@gmail.com</p>
                  </ListGroupItem>

                  <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                    <h6 className='mb-0 d-flex align-items-center gap-2'>
                      <span><i class="ri-phone-fill"></i></span>
                      Phone:
                    </h6>
                    <p className='mb-0'>+841234567</p>
                  </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg='12' className='text-center pt-5'>
            <p className='copyright'>Copyright {year}, desgin and develop by aaa. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
      </footer>
  )
}

export default Footer