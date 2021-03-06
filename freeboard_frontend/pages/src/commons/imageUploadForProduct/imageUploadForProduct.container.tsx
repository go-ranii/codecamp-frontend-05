import { UPLOAD_FILE } from "./imageUploadForProduct.queries";
import { checkFileValidation } from "../libraries/utils";
import { ChangeEvent, useRef } from "react";
import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationUploadFileArgs,
} from "../../../../src/commons/types/generated/types";
import { BsJournalCheck } from "react-icons/bs";

export default function ImagesUploadForProduct(props) {
  console.log(props.images);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const onClickImage = () => {
    fileRef.current?.click();
  };
  //실제 이미지 업로드 함수
  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const test = checkFileValidation(file);
    if (!test) return;

    try {
      const result = await uploadFile({ variables: { file } });
      props.onChangeFileUrls(result.data?.uploadFile?.url, props.index);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {props.images ? (
        <img
          src={`https://storage.googleapis.com/${props.images}`}
          onClick={onClickImage}
        />
      ) : (
        <button type="button" onClick={onClickImage}>
          <>+</>
        </button>
      )}
      <input
        style={{ display: "none" }}
        type="file"
        ref={fileRef}
        onChange={onChangeFile}
      />
    </div>
  );
}
