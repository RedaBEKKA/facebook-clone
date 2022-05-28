import React, { useState } from "react";
import "./style.css";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/logininput";
import * as Yup from "yup";
export default function Login() {
  const loginInfos = {
    email: "",
    password: "",
  };
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  console.log(login, " login");
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const loginValidate = Yup.object({});
  return (
    <div className="login">
      <div className="login_wrapper">
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="" />
            <span>
              Facebook vous aide a vous connecter et partager avec votre
              entourage
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik
                enableReinitialize
                initialValues={{
                  email,
                  password,
                }}
                validationSchema={loginValidate}
              >
                {(formik) => (
                  <Form>
                    <LoginInput
                      placeholder="Adresse email | N° de téléphone"
                      type="text"
                      name="email"
                      onChange={handleLoginChange}
                    />
                    <LoginInput
                      placeholder="Mot de passe"
                      type="password"
                      name="password"
                      onChange={handleLoginChange}
                    />
                    <button type="submit" className="blue_btn">
                      Se connecter
                    </button>
                  </Form>
                )}
              </Formik>
              <Link to="/forget-password" className="forget_pass">
                Mot de passe oublié ?
              </Link>
              <div className="sign_splitter"></div>
              <button className="blue_btn open_signup">Créer un compte</button>
            </div>
            <Link to="/" className="sign_extra">
              <b>Créer une page</b>
              {"\r"}pour une célibrité,marque ou buisness
            </Link>
          </div>
        </div>
        <div className="register"></div>
      </div>
    </div>
  );
}
