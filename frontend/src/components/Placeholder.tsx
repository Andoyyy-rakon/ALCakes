import { Link } from 'react-router-dom';

export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-pink-50">
      <h1 className="text-3xl font-bold text-rose-600">{title}</h1>
      <p className="text-gray-500">This page is coming soon 🍰</p>
      <Link to="/" className="text-rose-500 underline hover:text-rose-700">
        Back to home
      </Link>
    </div>
  );
}