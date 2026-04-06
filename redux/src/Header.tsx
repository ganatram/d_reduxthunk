import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';
import { loginUser } from './store/userSlice'; // Import the new Thunk

export function Header() {
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);

  // Note: For async thunks in TypeScript, it's best practice to use the AppDispatch type
  const dispatch = useDispatch<AppDispatch>();

  function handleSignInClick() {
    // Just dispatch the Thunk! Redux handles the rest.
    dispatch(loginUser());
  }

  return (
    <header className="flex justify-between items-center border-b-2 border-gray-100 py-6">
      {user ? (
        <span className="ml-auto font-bold">{user.name} has signed in</span>
      ) : (
        <button
          onClick={handleSignInClick}
          className="whitespace-nowrap inline-flex items-center justify-center ml-auto px-4 py-2 w-36 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? '...' : 'Sign in'}
        </button>
      )}
    </header>
  );
}
