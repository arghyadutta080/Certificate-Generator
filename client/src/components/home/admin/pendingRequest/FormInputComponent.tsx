import { Input } from "@chakra-ui/react";
import React from "react";

interface Props {
  place: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInputComponent = ({
  place,
  name,
  value,
  onChange,
}: Props) => {
  return (
    <Input
      placeholder={place}
      size="md"
      borderColor={"blue"}
      bgColor={"white"}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormInputComponent;
