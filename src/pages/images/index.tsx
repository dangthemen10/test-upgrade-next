import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { q, b, c, d } = router.query; // Lấy tham số `q` từ URL

  return (
    <div>
      <Link href={'/'}>Top Page</Link>
    </div>
  );
}
