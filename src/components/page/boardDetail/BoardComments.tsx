import BoardComment from './BoardComment';
import BoardTextArea from './BoardTextArea';

const BASE_URL = 'https://wikied-api.vercel.app/6-16/';

export async function getAllComments(id: string) {
  const res = await fetch(`${BASE_URL}/articles/${id}/comments?limit=9999`, {
    cache: 'force-cache',
  });
  return res.json();
}

export async function postComment(id: string, data: string) {
  const res = await fetch(`${BASE_URL}/articles/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to post data');
  }
  return res.json();
}

export interface CommentWriterResponse {
  image: string;
  name: string;
  id: number;
}

export interface CommentResponse {
  writer: CommentWriterResponse;
  updatedAt: Date | string;
  createdAt: Date | string;
  content: string;
  id: number;
}

export default async function BoardComments({ id }: { id: string }) {
  const comments = await getAllComments(id);
  console.log(comments);
  const { list } = comments;
  const commentCount = list.length;

  return (
    <div
      className='margin-auto w-[335px] rounded-lg
      md:w-[624px]
      xl:w-[1060px]'
    >
      <BoardTextArea count={commentCount} isLogin={false} />
      {commentCount === 0 ? (
        <>댓글이 없습니다</>
      ) : (
        list.map((comment: CommentResponse) => {
          return <BoardComment key={comment.id} comment={comment} id={123} />;
        })
      )}
    </div>
  );
}
