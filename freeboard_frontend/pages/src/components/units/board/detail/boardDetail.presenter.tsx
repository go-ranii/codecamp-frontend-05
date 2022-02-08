import BoardCommentsPage from "../../../commons/comments/index";
import * as JH from "./boardDetail.styles";
import ReactPlayer from "react-player";
import { Modal, Button } from "antd";

export default function BoardDetailUI(props) {
  return (
    <JH.Wrapper>
      <JH.WrapperBody>
        <JH.WrapperBody__contents>
          <JH.ContentsHeader>
            {/* <JH.ContentsNum>
              글번호: {props.data?.fetchBoard._id}
            </JH.ContentsNum> */}
            <JH.ContentsTitle>
              제목: {props.data?.fetchBoard.title}
            </JH.ContentsTitle>
            <JH.ContentsWriter>
              작성자: {props.data?.fetchBoard.writer}
            </JH.ContentsWriter>
          </JH.ContentsHeader>

          <div>
            우편번호:
            {props.data?.fetchBoard.boardAddress.zipcode || ""} <br />
            주소:
            {props.data?.fetchBoard.boardAddress.address || ""}
            <br />
            상세주소:
            {props.data?.fetchBoard.boardAddress.addressDetail || ""}
          </div>
          <div>
            <img
              src={`https://storage.googleapis.com/${props.data?.fetchBoard.images?.[0]}`}
            />
          </div>

          <JH.ContentsBody>
            <JH.ContentsText>{props.data?.fetchBoard.contents}</JH.ContentsText>
            <JH.YoutubePlayer>
              <ReactPlayer url={String(props.data?.fetchBoard.youtubeUrl)} />
            </JH.YoutubePlayer>
          </JH.ContentsBody>
        </JH.WrapperBody__contents>

        <JH.WrapperBody__menu>
          <JH.BoardLikeCountWrapper>
            <JH.LikeBtnPart onClick={props.onClickLikeBoard}>
              <JH.LikeBtn></JH.LikeBtn>
              <JH.LikeCount>{props.data?.fetchBoard.likeCount}</JH.LikeCount>
            </JH.LikeBtnPart>
            <JH.DisLikeBtnPart onClick={props.onClickDisLikeBoard}>
              <JH.DisLikeBtn></JH.DisLikeBtn>
              <JH.DisLikeCount>
                {props.data?.fetchBoard.dislikeCount}
              </JH.DisLikeCount>
            </JH.DisLikeBtnPart>
          </JH.BoardLikeCountWrapper>
          <div>
            <JH.ToListBtn onClick={props.onClickToBoard}>목록으로</JH.ToListBtn>
            <JH.RewriteBtn onClick={props.onClickUpdateBoard}>
              수정하기
            </JH.RewriteBtn>
            <JH.DeleteBtn onClick={props.onToggleModal}>삭제하기</JH.DeleteBtn>
            <Modal
              title={"삭제"}
              visible={props.isCancelModalVisible}
              onOk={props.handleOk}
              onCancel={props.cancelModalPressCancel}
            >
              게시글을 삭제하시겠습니까?
            </Modal>
          </div>
        </JH.WrapperBody__menu>
      </JH.WrapperBody>

      <BoardCommentsPage />
    </JH.Wrapper>
  );
}