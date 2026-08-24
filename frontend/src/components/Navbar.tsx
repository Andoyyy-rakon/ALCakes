import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { CakeSlice, Menu, X, LogOut, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-lg font-medium transition ${
    isActive ? 'text-rose-600 bg-rose-100' : 'text-gray-700 hover:text-rose-600'
  }`;

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut();
      toast.success('Signed out. See you soon!');
      navigate('/');
    } catch (err) {
      toast.error((err as Error).message);
    }
    setMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-40 border-b border-rose-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-rose-600">
          <CakeSlice className="h-6 w-6" />
          Cremora
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/shop" className={linkClass}>Shop</NavLink>
          <NavLink to="/cart" className={linkClass}>Cart</NavLink>
        </div>

        {user ? (
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/profile"
              className="flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-gray-700 hover:text-rose-600"
            >
              <User className="h-4 w-4" />
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-gray-700 hover:text-rose-600"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 font-medium text-rose-600 hover:bg-rose-50"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-rose-500 px-4 py-2 font-medium text-white shadow hover:bg-rose-600"
            >
              Register
            </Link>
          </div>
        )}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-gray-700 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-1 border-t border-rose-100 bg-white px-4 py-3 md:hidden">
          <NavLink to="/" end className={linkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/shop" className={linkClass} onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/cart" className={linkClass} onClick={() => setMenuOpen(false)}>Cart</NavLink>

          {user ? (
            <>
              <NavLink to="/profile" className={linkClass} onClick={() => setMenuOpen(false)}>
                Profile
              </NavLink>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3 py-2 text-left font-medium text-gray-700"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass} onClick={() => setMenuOpen(false)}>Login</NavLink>
              <NavLink to="/register" className={linkClass} onClick={() => setMenuOpen(false)}>Register</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}