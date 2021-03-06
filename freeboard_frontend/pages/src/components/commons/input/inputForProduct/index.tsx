import styled from "@emotion/styled";

const ForProduct = styled.input`
  width: auto;
  border: none;
  border-bottom: 1px solid gray;

  padding: 5px;
`;

export default function InputForProduct(props) {
  return (
    <ForProduct
      type={props.type}
      {...props.register}
      defaultValue={props.defaultValue}
    />
  );
}
