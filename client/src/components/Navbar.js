import React from 'react'
// import { Link } from 'react-router-dom'
import './Navbar.css'
// import { Container, Nav } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavDropdown, Container} from "react-bootstrap"


class Navigation extends React.Component {
    
    // constructor(props) {
    //     super(props);
    //     this.name = " ";
    //   }

    // // useEffect(() => {
    // //     console.log("ddddddd")
    // // }, [name])

    // componentDidMount(){
    //     this.setState({name : "hhhhhhhhhhhhhh"})
    //     // if (localStorage.getItem('token') != null){
    //     //     this.setState({name : "hhhhhhhhhhhhhh"})
    //     console.log("--" + this.name + "--")
    //     // }
        
    // }

    // // componentDidUpdate(){
    // //     if (this.name != " "){
    // //         if (localStorage.getItem('token') != null){
    // //             this.setState({name : "hhhhhhhhhhhhhh"})
    // //             console.log("-sss-" + this.name + "-sss-")
    // //         }
    // //         console.log("updated")
    // //     }
        
    // // }
    

    handleClick() {
        localStorage.removeItem("token");
        window.location.reload();
      }

    
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="Home">F1 Fantasy</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="Home">Home</Nav.Link>
                <Nav.Link href="Stats">Stats</Nav.Link>
                <Nav.Link href="Fantasy">Fantasy</Nav.Link>
                {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
                
            </Navbar.Collapse>
            {this.props.loggedIn ? 
            <NavDropdown title={this.props.loggedIn} className="dropdown">
            <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/" onClick={this.handleClick}>Log Out</NavDropdown.Item>
            </NavDropdown> : 
                <Nav>
                    <Nav.Link href="SignUp">Sign Up</Nav.Link>
                    <Nav.Link href="LogIn">Log In</Nav.Link>
                </Nav>
            }
            </Container>
            </Navbar>
        )
    }
}

export default Navigation


