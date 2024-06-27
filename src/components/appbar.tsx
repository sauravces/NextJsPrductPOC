import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Appbar = () => {
  return (
    <div className="w-full h-16 bg-blue-600 text-white flex items-center justify-between fixed top-0 z-10">
      <div className="p-4">
        <h1 className="text-xl font-bold">Product</h1>
      </div>
      <div className="p-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Appbar;
