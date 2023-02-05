// ! Dependencies imported
import Signup from "./user/signup/Signup";
import { Col, Container, Row } from "reactstrap";
import Login from "./user/login/Login";

const Auth = (props) => {
  //! The container thats holding the signup and log in files and displaying them. this component allows the user to register and signup by updating the local storage token in the browser's client
  return (
    <>
      <Container>
        <Row>
          <Col md="6">
            <Signup updateToken={props.updateToken} />
          </Col>
          <Col md="6">
            <Login updateToken={props.updateToken} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Auth;
