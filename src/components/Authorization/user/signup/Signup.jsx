// ! Dependencies imported
// ! Styling imported from reactstrap
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useState } from "react";
import FullWidthButton from "../../../Buttons/FullWidthButton";
import { useNavigate } from "react-router-dom";

//! Declaration of Vairables
const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    //!Url our page is hosed on
    let url = `http://localhost:4000/user/create`;
    let bodyObject = JSON.stringify({ firstName, lastName, email, password });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      headers: myHeaders,
      body: bodyObject,
      method: "POST",
    };
    //! function that runs when the user hits the signup button, that then allows them to log in and redirects them to the chatroom endpoint
    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log(data);
      if (data.message === "Success") {
        //We are free to navigate to another page
        props.updateToken(data.token);
        navigate("/room");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  //! Input field where user enters their name, email and password to be able to sign up which is then stored in our database
  return (
    <>
      <h2>Signup</h2>
      <div style={{ backgroundColor: "lightcyan" }}>
        <Form onSubmit={handleSubmit}>
          <FormGroup floating>
            <Input
              id="firstName"
              name="firstName"
              placeholder="First Name:"
              type="name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Label for="firstName">First Name:</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Last Name:"
              type="name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Label for="lastName">Last Name:</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="exampleEmail"
              name="email"
              placeholder="Email:"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>{" "}
          <FormGroup floating>
            <Input
              id="examplePassword"
              name="password"
              placeholder="Password:"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Label for="examplePassword">Password</Label>
          </FormGroup>{" "}
          <FullWidthButton>
            <Button type="submit" color="primary">
              Sign Up
            </Button>
          </FullWidthButton>
        </Form>
      </div>
    </>
  );
};

export default Signup;
