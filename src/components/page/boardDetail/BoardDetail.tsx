import { dateFormater } from '@/utils/date';

import Image from 'next/image';
import { BoardDelete, BoardEdit, BoardLike } from './BoardDetailButton';

const BASE_URL = 'https://wikied-api.vercel.app/6-16/';

export async function getArticles(id: string) {
  const res = await fetch(`${BASE_URL}/articles/${id}`, {
    cache: 'force-cache',
  });
  return res.json();
}

export default async function BoardDetail({ id }: { id: string }) {
  const article = await getArticles(id);

  console.log(article);
  const {
    title,
    image,
    createdAt,
    writer: { name },
    content,
    likeCount,
  } = article;
  const formattedDate = dateFormater(createdAt);

  return (
    <div className='p-5'>
      <header className='flex flex-col gap-[30px]'>
        <section className='flex justify-between items-center'>
          <h1 className='text-3xl-semibold'>{title}</h1>
          <div className='flex gap-[14px]'>
            <BoardEdit articleId={id} />
            <BoardDelete articleId={id} />
          </div>
        </section>
        <section className='flex justify-between items-center  text-grayscale-400 text-md-regular'>
          <div className='flex gap-[10px]'>
            <p>{name}</p>
            <p>{formattedDate}</p>
          </div>
          <BoardLike articleId={id} initialLikeCount={likeCount} />
        </section>
        <main className='flex flex-col gap-[20px]'>
          <div
            className='w-[295px] h-[177px]
          md:w-[500px] md:h-[300px] relative'
          >
            {image ? (
              <Image src={image} alt='게시물 이미지' fill style={{ objectFit: 'cover' }} />
            ) : null}
          </div>
          <span className='text-lg-regular text-grayscale-400'>{content}</span>
        </main>
      </header>
    </div>
  );
}
