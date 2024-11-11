import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home({}) {
  const router = useRouter();
  const { title } = router.query; // Lấy tham số `q` từ URL

  return (
    <div>
      <Link href={'/'}>Top Page</Link>
      <p>{title?.toString().trim()}</p>
    </div>
  );
}
