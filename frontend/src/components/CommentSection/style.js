import { styled } from "styled-components";

const CommentSection = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    padding: 10px;
    border-top: 1px solid lightgray;
`;

const CommentsHead = styled.div`
    font-size: 18px;
`;

const CommentariesList = styled.div`
    width: 100%;
`;

const NewComment = styled.input`
	width: 100%;

	border: 1px solid lightgray;
`

const Comment = styled.div`
    display: flex;
    flex-direction: column;

    border: 1px solid lightgray;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px;
`

const CommentUser = styled.span`
    font-size: 13px;
    color: gray;
`;

const CommentText = styled.a`
    font-size: 14px;
`;

export { CommentSection, CommentsHead, CommentariesList, NewComment, Comment, CommentUser, CommentText }
