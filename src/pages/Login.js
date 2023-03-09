import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FormInput,
  Heading,
  LoaderButton,
  PrimaryButton,
  Title,
} from "../components";
import Paragraph from "../components/Paragraph";
import { useVoter } from "../context/VoterContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, voterData } = useVoter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login({ username, password });
    setLoading(false);
  };

  useEffect(() => {
    console.log(voterData);
  }, [voterData]);

  if (voterData) {
    return <Navigate to="/" />;
  }

  return (
    <div className="relative min-h-screen flex">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
        <div
          className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1579451861283-a2239070aaa9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)",
          }}
        >
          <div className="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0" />
          <div className="w-full  max-w-lg z-10">
            <Heading>Welcome to SIVRE</Heading>
            <div className="sm:text-sm xl:text-xl text-gray-200 font-normal">
              {" "}
              Every vote matters, let your voice be heard! 😘
            </div>
          </div>
          {/*-remove custom style*/}
          <ul className="circles">
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
          </ul>
        </div>
        <div className="md:flex md:items-center md:justify-center sm:w-auto md:h-full w-full xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <Title>Welcome!</Title>
              <Paragraph className="mt-2">
                Silahkan login menggunakan kradential anda
              </Paragraph>
              {voterData.error && (
                <div className="text-red-500">{voterData.error}</div>
              )}
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="h-px w-16 bg-gray-200" />
              <span className="text-gray-300 font-normal">
                Kejujuran anda sangatlah berharga
              </span>
              <span className="h-px w-16 bg-gray-200" />
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
              action="#"
              method="POST"
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <FormInput
                type="text"
                name="username"
                placeholder="masukkan username anda"
                label="Username"
                autoFocus={true}
                value={username}
                onChange={setUsername}
              />
              <FormInput
                className="content-center mt-8"
                type="password"
                name="password"
                placeholder="masukkan password anda"
                label="Password"
                value={password}
                onChange={setPassword}
              />
              <div>
                <PrimaryButton type="submit">
                  {loading ? <LoaderButton /> : "Login"}
                </PrimaryButton>
              </div>
              <p className="flex space-x-1 flex-row items-center w-full justify-center mt-10 text-center text-md text-gray-500">
                <Paragraph>Built by Remas Elmuna with</Paragraph>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 1024 1024"
                  color="#FF0000"
                  height={15}
                  width={15}
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "rgb(255, 0, 0)" }}
                >
                  <path d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8 264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" />
                </svg>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
