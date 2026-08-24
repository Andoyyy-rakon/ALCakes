import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-pink-50">
      <h1 className="text-5xl font-bold text-rose-600">Cremora</h1>
      <p className="text-lg text-gray-600">
        {user ? `Welcome back, ${user.email}!` : 'Delicious cakes, delivered fresh.'}
      </p>
      <Link
        to="/shop"
        className="rounded-full bg-rose-500 px-8 py-3 font-semibold text-white shadow hover:bg-rose-600"
      >
        Browse Cakes
      </Link>
    </div>
  );
}