import { gql, useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import { checkFileValidation } from "../../src/commons/libraries/utils";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../src/commons/types/generated/types";

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

export default function ImageValidationPage() {
  const [image, setImage] = useState("");
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(file);

    const isValid = checkFileValidation(file);
    if (!isValid) {
      setImage(" ");
      return;
    }

    try {
      const result = await uploadFile({
        variables: {
          file,
        },
      });
      console.log(result?.data?.uploadFile?.url);
      setImage(result?.data?.uploadFile?.url || "");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <input type="file" onChange={onChangeFile} />
      <img src={`https://storage.googleapis.com/${image}`} />
    </div>
  );
}
