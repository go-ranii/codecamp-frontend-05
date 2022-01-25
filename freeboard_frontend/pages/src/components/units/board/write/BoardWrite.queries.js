import { gql } from '@apollo/client'

export const CREATE_BOARD = gql`
   mutation createBoard($writer:String, $password:String, $title:String!, $contents:String!,$youtubeUrl:String ){
      createBoard(createBoardInput:{writer: $writer, password: $password, title: $title, contents:$contents, youtubeUrl:$youtubeUrl}) {
         _id
         writer
         title
         contents
         likeCount
         dislikeCount
         createdAt
         youtubeUrl
      }   
   }
`
export const UPDATE_BOARD = gql`
    mutation updateBoard($updateBoardInput:UpdateBoardInput!, $password:String,$boardId: ID!){
        updateBoard(updateBoardInput:$updateBoardInput, password:$password, boardId:$boardId){
            _id
            title
            writer
            contents
            likeCount
            youtubeUrl
        }
    }
`