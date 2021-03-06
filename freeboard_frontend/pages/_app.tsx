import {
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  useQuery,
} from "@apollo/client";
import "antd/dist/antd.css";
import Layout from "./src/components/commons/layout/index";
import { Global, css } from "@emotion/react";
import { GlobalStyles } from "./src/commons/styles/globalstyles";
import { initializeApp } from "firebase/app";
import { createUploadLink } from "apollo-upload-client";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "./src/commons/libraries/getAccessToken";

const firebaseConfig = {
  apiKey: "AIzaSyBdCfpc9Sqb_C1sHS_lBZtw2lXi-2cWIiQ",
  authDomain: "goranii.firebaseapp.com",
  projectId: "goranii",
  storageBucket: "goranii.appspot.com",
  messagingSenderId: "114947965407",
  appId: "1:114947965407:web:dd893b7f3df3cb0cee446a",
};

export const FirebaseApp = initializeApp(firebaseConfig);

interface IUserInfo {
  name?: string;
  email?: string;
  picture?: string;
}

interface IGlobalContext {
  accessToken?: string;
  setAccessToken?: Dispatch<SetStateAction<string>>;
  userInfo?: string;
  setUserInfo?: Dispatch<SetStateAction<IUserInfo>>;
  isEdit?: boolean;
  setIsEdit?: Dispatch<SetStateAction<boolean>>;
  server?: string;
  setServer?: Dispatch<SetStateAction<string>>;
  item?: any;
  setItem?: any;
  onChangeSelectServer?: () => void;
}

export const GlobalContext = createContext<IGlobalContext>({});

function MyApp({ Component, pageProps }) {
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState<IUserInfo>({});
  const [isEdit, setIsEdit] = useState(false);
  const [server, setServer] = useState("");
  const [item, setItem] = useState([]);

  useEffect(() => {
    getAccessToken().then((newAccessToken) => {
      setAccessToken(newAccessToken);
    });
    if (localStorage.getItem("userInfo")) {
      setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
    }
  }, []);
  const onChangeSelectServer = (e) => {
    setServer(e.target.value);
  };

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    // 1. ?????? ??????
    if (graphQLErrors) {
      for (const error of graphQLErrors) {
        // 2. ?????? ?????? ?????? ?????? ??????
        if (error.extensions.code === "UNAUTHENTICATED") {
          // 3. refreshToken?????? ?????? ?????????
          getAccessToken().then((newAccessToken) => {
            // 4. ????????? ?????? accessToken ??????
            setAccessToken(newAccessToken);
            // 5. ????????? ???????????? ????????? ?????? ?????????
            operation.setContext({
              //?????? ??????, ?????? ????????? ?????? ????????? ????????? ?????????
              headers: {
                ...operation.getContext().headers,
                Authorization: `Bearer ${newAccessToken}`,
              },
            });
          });
          return forward(operation); // ????????? operation?????? ?????????
        }
      }
    }
  });
  const uploadLink = createUploadLink({
    uri: "https://backend05.codebootcamp.co.kr/graphql",
    headers: { Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  const client = new ApolloClient({
    // uploadLink??? ????????? uploadLink as unknown as ApolloLink
    link: ApolloLink.from([errorLink, uploadLink as unknown as ApolloLink]),
    //API ????????? ?????? ????????? uri??? ??????
    cache: new InMemoryCache(),
  });
  const value = {
    accessToken,
    setAccessToken,
    userInfo,
    setUserInfo,
    isEdit,
    setIsEdit,
    onChangeSelectServer,
    server,
    setServer,
    item,
    setItem,
  };

  return (
    <GlobalContext.Provider value={value}>
      <ApolloProvider client={client}>
        <Global styles={GlobalStyles} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </GlobalContext.Provider>
  );
}

export default MyApp;
