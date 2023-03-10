// ! Dependencies imported
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

// ! Styling imported from reactstrap
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import FullWidthButton from "../../../Buttons/FullWidthButton";

//! Declaration of Variables
const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    //!Url our page is hosted on
    let url = `http://localhost:4000/user/login`;

    let bodyObject = JSON.stringify({ email, password });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };
    //! function that runs when the user hits the login button to bring to new page
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.message === "Success") {
        //when user succesfully logs in the navigate statement brings them to the chat room endpoint
        props.updateToken(data.token);
        navigate("/room");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //! below is the form fields for the log in information where the user will put in their email and password which is checked to see if it matches in our database before they are able to log in 
  return (
    <>
      <h2>Login</h2>
      <div style={{ backgroundColor: "lightgoldenrodyellow" }}>
        <Form onSubmit={handleSubmit}>
          <FormGroup floating>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email"
              type="email"
              innerRef={emailRef}
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>{" "}
          
          <FormGroup floating>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password"
              type="password"
              innerRef={passwordRef}
            />
            <Label for="examplePassword">Password</Label>
          </FormGroup>{" "}
          </div>
          <FullWidthButton>
            <Button type="submit" color="warning">
              Log In
            </Button>
          </FullWidthButton>
        </Form>
      </div>
  </>
  )
};

export default Login;
