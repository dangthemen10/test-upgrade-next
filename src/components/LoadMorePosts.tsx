// components/LoadMorePosts.tsx
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
}

interface LoadMorePostsProps {
  initialPosts: Post[];
}

const LoadMorePosts: React.FC<LoadMorePostsProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState<number>(2); // Bắt đầu từ trang 2 vì trang 1 đã tải trước
  const [loading, setLoading] = useState<boolean>(false);

  const loadMorePosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get<Post[]>(`/api/posts?page=${page}`);
      setPosts((prevPosts) => [...prevPosts, ...response.data]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/search/result?title=${post.title.trim()}`}>
              {post.title.trim()}
            </Link>
          </li>
        ))}
      </ul>
      <button onClick={loadMorePosts} disabled={loading}>
        {loading ? 'Đang tải...' : 'Load More'}
      </button>
    </div>
  );
};

export default LoadMorePosts;
