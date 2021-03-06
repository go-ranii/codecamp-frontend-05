import { ReactChild } from "react";
import LayoutBanner from "./banner";
import LayoutFooter from "./footer";
import LayoutHeader from "./header";
import LayoutNavigation from "./navigation";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const LayoutBody = styled.div`
  width: 100%;
  height: 100%;
`;
const LayoutSidebar = styled.div`
  width: 200px;
  height: 1000px;
  background-color: rosybrown;
`;
const BodyWrapper = styled.div`
  display: flex;
`;

// 헤더를 숨기고 싶은 페이지를 설정하기
const HIDDEN_HEADERS = ["/12-06-modal-address-refactoring"];

interface IProps {
  children: ReactChild;
}
export default function Layout(props: IProps) {
  const router = useRouter();
  console.log(router);

  const isHiddenHeader = HIDDEN_HEADERS.includes(router.asPath);
  return (
    <div>
      {!isHiddenHeader && <LayoutHeader />}
      <LayoutBanner />
      <LayoutNavigation />
      <BodyWrapper>
        <LayoutSidebar />
        <LayoutBody>{props.children}</LayoutBody>
      </BodyWrapper>
      <LayoutFooter />
    </div>
  );
}
