import React, { useState } from "react";

interface ButtonPropType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  textCol?: String;
}

function Button({ children, textCol, ...props }: ButtonPropType) {

  if (!textCol) {
    textCol = "text-black";
  }
  const editedClassName = `border font-bold font-mono bg-white flex items-center justify-center min-h-[4rem] min-w-[20rem] border-black ${textCol}`;
  return (
    <button {...props} className={editedClassName} >
      {children}
    </button>
  );
}

export default Button;
