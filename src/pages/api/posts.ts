// pages/api/posts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu', error: error.message });
  }
}
