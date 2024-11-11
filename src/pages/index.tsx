import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import LoadMorePosts from '../components/LoadMorePosts';

const inter = Inter({ subsets: ['latin'] });

interface Post {
  id: number;
  title: string;
}

interface HomeProps {
  initialPosts: Post[];
}

export default function Home({ initialPosts }: HomeProps) {
  const router = useRouter();
  const { q, b, c, d } = router.query; // Lấy tham số `q` từ URL

  return (
    <div>
      <h1>Search Page</h1>
      <p>
        Query: {q}, {b}, {c}, {d}
      </p>
      <div>
        <h1>Danh sách bài viết</h1>
        <LoadMorePosts initialPosts={initialPosts} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(
      'https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10'
    );
    const initialPosts: Post[] = await res.json();

    return {
      props: {
        initialPosts,
      },
    };
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu:', error);
    return {
      props: {
        initialPosts: [],
      },
    };
  }
};
