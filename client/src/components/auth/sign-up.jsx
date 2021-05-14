import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { get, post } from "axios";

const SignUp = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await get(`/sign-up`);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);
  console.log(user);

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (!user.user) return;

    const postUser = async () => {
      try {
        await post("/sign-up", user);
      } catch (error) {
        console.log(error);
      }
    };

    postUser();
    window.location.reload(false);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>Sign Up Page</h1>
      <div>
        <p>Create a Question:</p>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <input
              placeholder="Add your username"
              name="username"
              type="text"
              value={user.username}
              onChange={handleChange}
            />
            <input
              placeholder="Add your password"
              name="password"
              type="text"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <input type="submit" value="Add User" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
