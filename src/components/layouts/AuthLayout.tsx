import React, { useState } from "react";
// import loginImage from "../../assets/svgs/cathybanner.svg";
import { Outlet } from "react-router";
import ImageComponent from "../ImageComponent";

function AuthLayout() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-2 h-screen bg-primary">
      <div className="bg-blue-primary items-center justify-center hidden md:flex max-h-screen">
        <ImageComponent
          src={"https://gold-sky-media.s3.eu-north-1.amazonaws.com/uploads/1b66949c-a2b9-4880-89dd-20c729ad1f94.png"}
          alt="login"
          imgClassName="object-cover rounded-none"
          className="p-0 rounded-none"
        />
      </div>
      <div className="bg-primary p-10 my-auto max-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
