import * as JH from './BoardWrite.styles'


export default function BoardWriteUI(props){

    return(
        <JH.Board>
        
            <JH.MyTitle>게시물 {props.isEdit ? '수정' : '등록'}</JH.MyTitle>
            <JH.MySubTitle>*  는 필수 작성 항목입니다.</JH.MySubTitle>
            
            <JH.TextBox1>
                <div>
                    <JH.Text>작성자* </JH.Text>
                    <JH.InputBox 
                    type='text' 
                    onChange={props.nameCheck}  
                    placeholder='이름을 입력하세요'                 
                    defaultValue={props.isEdit ? props.data?.fetchBoard.writer :''}
                    />
                    <JH.ErrorMassages>{props.nameError}</JH.ErrorMassages>
                </div>

                <div>
                    <JH.Text>비밀번호* </JH.Text>
                    <JH.InputBox 
                    type='password' 
                    onChange={props.passwordCheck} 
                    placeholder='비밀번호를 입력하세요'
                    defaultValue={props.isEdit ? props.data?.fetchBoard.password :''}
                    />
                    <JH.ErrorMassages>{props.passwordError}</JH.ErrorMassages>
                </div>

                
            </JH.TextBox1>
            <JH.TextBox2>
            
                <JH.Text>제목* </JH.Text>
                <JH.InputTitle 
                type='text' 
                onChange={props.titleCheck}   
                placeholder='제목을 입력하세요'
                defaultValue={props.isEdit ? props.data?.fetchBoard.title :''}
                />
                <JH.ErrorMassages>{props.titleError}</JH.ErrorMassages>
                
            </JH.TextBox2>
            <JH.TextBox2>
                <JH.Text>내용* </JH.Text>
                <JH.InputOne  
                onChange={props.txtCheck}  
                placeholder='내용을 작성해주세요'
                defaultValue={props.isEdit ? props.data?.fetchBoard.contents :''}
                >                
                </JH.InputOne>
                <JH.ErrorMassages> {props.txtError} </JH.ErrorMassages>
            </JH.TextBox2>
            <JH.TextBox2>
            
                <JH.Text>주소 </JH.Text>
                <JH.PartOfAddress>
                    <JH.InputMailAddress type='text' placeholder='우편번호'/>
                    <JH.FindMailAddress>🔍️</JH.FindMailAddress>
                </JH.PartOfAddress>

                <JH.InputAddress type='text' placeholder='주소' disabled={true} />
                <JH.InputAddress type='text' placeholder='상세주소를 입력해주세요'/>
                
            </JH.TextBox2>

            <JH.TextBox2>
            
                <JH.Text>YouTube </JH.Text>
                <JH.InputYoutube 
                onChange={props.YoutubeUrlCheck} 
                type='text' 
                placeholder='링크를 복사해주세요'
                defaultValue={props.isEdit ? props.data?.fetchBoard.youtubeUrl :''}
                />
                
                
            </JH.TextBox2>

            <JH.PictureBox>
                <JH.Text>사진 첨부</JH.Text>
                <JH.InputPic>
                    <JH.Picture>
                        <JH.Picture1 >+</JH.Picture1>
                        <JH.Picture2 >Upload</JH.Picture2>
                        
                    </JH.Picture>
                    <JH.Picture>
                        <JH.Picture1 >+</JH.Picture1>
                        <JH.Picture2 >Upload</JH.Picture2>
                    </JH.Picture>
                    <JH.Picture>
                        <JH.Picture1 >+</JH.Picture1>
                        <JH.Picture2>Upload</JH.Picture2>
                    </JH.Picture>
                </JH.InputPic>
            </JH.PictureBox>

            <JH.TextBox2>
                <JH.Text>메인설정</JH.Text>
                <JH.WrapperChoose>
                    <JH.ChooseMain>
                        <JH.ChooseButton type='checkbox'name='choose' id='checkbox1' ></JH.ChooseButton>
                        <JH.ChooseButtonText htmlFor='checkbox1'>YouTube</JH.ChooseButtonText>
                    </JH.ChooseMain>
                    <JH.ChooseMain>
                        <JH.ChooseButton type='checkbox' name='choose'id='checkbox2' ></JH.ChooseButton>
                        <JH.ChooseButtonText htmlFor='checkbox2' >사진</JH.ChooseButtonText>
                    </JH.ChooseMain>
                </JH.WrapperChoose>
                    
            </JH.TextBox2>

            <JH.Signup>
                <JH.SignupButton 
                onClick={props.ValueCheck}
                // {props.isEdit ? props.EditBoard() : props.ValueCheck()}
                changeBtnColor={props.isActive}> 
                {props.isEdit ? '수정하기' : '등록하기'} 
                </JH.SignupButton>
                <JH.CansleButton onClick={props.ClickCansle}> 취소하기 </JH.CansleButton>
            </JH.Signup>


        </JH.Board>
    )
}