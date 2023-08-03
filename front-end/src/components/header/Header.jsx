import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/userSlice';

import { HiOutlineSearch } from "react-icons/hi";

function Header() {
  const [expand, setExpand] = useState(null);
  const user = useSelector((state) => state.user.token)
  const dispatch = useDispatch()

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newExpand = null;
      if (width < 576) newExpand = 'sm';
      else if (width < 768) newExpand = 'md';
      else if (width < 992) newExpand = 'lg';
      else if (width < 1200) newExpand = 'xl';
      else newExpand = 'xxl';
      setExpand(newExpand);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Navbar style={{ background: "#31363B", color: "white"}} expand={expand}>
        <Container fluid>
          <Navbar.Brand href="/" style={{ color: "white", fontWeight: "bold", fontSize: "2rem" }}>
            Immerse
          </Navbar.Brand>
          <Navbar.Toggle style={{ color: "white", background:"white"}} aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            style={{ color: "white"}}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton style={{ color: "#31363B", background:"#31363B"}}>
              <Offcanvas.Title style={{ color: "white", fontWeight: "bold", fontSize: "2rem" }} id="offcanvasNavbarLabel">Immerse</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={{ background: "#31363B"}}>
              
              <Nav className="justify-content-end flex-grow-1 pe-3" style={{ whiteSpace: "nowrap" }}>
                
              <Form className="d-flex m-2">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-light">
                    <HiOutlineSearch />
                </Button>
              </Form>

              {user ? (
                <>
                  <Nav.Link
                    className='m-2'
                    style={{ color: 'white', cursor: 'pointer' }}
                    onClick={() => {dispatch(logOut());}}
                  >
                    LogOut
                  </Nav.Link>
                  <Nav.Link href="/mypage" className='m-2' style={{ color: "white" }}>
                    Profile
                  </Nav.Link>

                  
                </>
              ) : (
                <>
                  <Nav.Link href="/login" className='m-2' style={{ color: "white" }}>
                    LogIn
                  </Nav.Link>
                  <Nav.Link href="/signup" className='m-2' style={{ color: "white" }}>
                    SignUp
                  </Nav.Link>

                </>
              )}

              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
