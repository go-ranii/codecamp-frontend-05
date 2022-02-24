import { gql,  useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useState } from "react";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../src/commons/types/generated/types";
import { GlobalContext } from "../_app";

const LOGIN_USER = gql`
  mutation loginUserExample($email: String!, $password: String!) {
    loginUserExample(email: $email, password: $password) {
      accessToken
    }
  }
`;



export default function LoginPage() {
  const { setAccessToken } = useContext(GlobalContext);
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [loginUserExample] = useMutation<
    Pick<IMutation, "loginUserExample">, // Omit => 특정 데이터를 제외한 데이터를 전부 요청
    IMutationLoginUserArgs // Partial => 요청하는 데이터의 인자들의 뒤에 '?' 를 붙여서 불러오기
  >(LOGIN_USER);

  const onChangeUserEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };
  const onChangeUserPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setUserPassword(e.target.value);
  };
  const onClickLogin = async () => {
    try {
      //로그인 관련
      const result = await loginUserExample({
        variables: {
          email: userEmail,
          password: userPassword,
        },
      });
      const accessToken = result.data?.loginUserExample.accessToken || "";
      // 글로벌 스테이트에 저장
      if (setAccessToken) setAccessToken(accessToken);
      

      router.push(`/30-02-login-success`);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <div>
      이메일: <input type="text" onChange={onChangeUserEmail} />
      비밀번호: <input type="password" onChange={onChangeUserPassword} />
      <button onClick={onClickLogin}>Login</button>
    </div>
  );
}
