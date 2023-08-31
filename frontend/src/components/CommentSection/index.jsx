import React, { useEffect, useState } from "react"
import { CommentSection, CommentsHead, CommentariesList, Comment, CommentUser, CommentText } from "./style"

export default function Component() {
    const [commentaries, setCommentaries] = useState([
        {id: 1, user: 'teste', text: 'teste'},
        {id: 2, user: 'teste', text: 'teste'},
        {id: 3, user: 'teste', text: 'teste'},
        {id: 4, user: 'teste', text: 'teste'}
    ]);

    return (
        <CommentSection>
            <CommentsHead onClick={() => {console.log(commentaries)}}>
                Comentários
            </CommentsHead>

            <CommentariesList>
            {commentaries && commentaries.map((comment) => (
                <Comment key={comment.id}>
                    <CommentUser>
                        {comment.user}
                    </CommentUser>
                    <CommentText>
                        {comment.text}
                    </CommentText>
                </Comment>
            ))}
            </CommentariesList>
        </CommentSection>
    )
}