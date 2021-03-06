import React from "react";
import { useState, useEffect } from "react";
import { FormRow, Logo } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};
const Register = () => {
  const [values, setValues] = useState(initialState);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    // console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    //console.log(`${name} and ${value}`)
    setValues({ ...values, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target);
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("please fill out all the fields..");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };
  const toggleMember = () => {
    console.log(values);
    setValues({ ...values, isMember: !values.isMember });
  };
  //navigate to home screen

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/"); //navigating to home page
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "register"}</h3>
        {/*name*/}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/*email*/}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/*password*/}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
         <button
              type='button'
              className='btn btn-block btn-hipster'
              disabled={isLoading}
              onClick={() => {
                dispatch(loginUser({ email: 'testUser@test.com', password: 'secret' }));
              }}
            >
              {isLoading ? 'loading...' : 'demo'}
            </button>
        <p>
          {values.isMember ? "not a member yet" : "already a member?"}
          <button className="member-btn" type="button" onClick={toggleMember}>
            {values.isMember ? "register" : "login"}
          </button>
         
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
