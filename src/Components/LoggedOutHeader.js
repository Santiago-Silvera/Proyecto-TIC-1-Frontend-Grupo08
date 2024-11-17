import { Link } from "react-router-dom";
import Button from "./Button";

const LoggedOutHeader = () => {
  return (
    <>
      {/*Buttons to log in and sing up*/}
      <div className="App-buttons">
        <Link to="/LogIn" className="link-style">
          <Button>Log In</Button>
        </Link>
        <Link to="/SignUp" className="link-style">
          <Button>Sign Up</Button>
        </Link>
      </div>
    </>
  );
};

export default LoggedOutHeader;
