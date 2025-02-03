import app from '@/firebase';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { logInSuccess } from '@/store/user/slice';
import { useRouter } from 'next/navigation';
import { routes } from '@/routes';

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(logInError(data));
        return;
      }
      dispatch(logInSuccess(data));
      push(routes.home);
    } catch (error) {
      console.log('could not login with google');
    }
  };

  return (
    <button
      type='button'
      className='bg-red-700 text-white rounded-lg p-3 uppercase hover:bg-red-500 transition-all duration-150 ease-in'
      onClick={handleGoogleClick}
    >
      Continue with Google
    </button>
  );
};

export default GoogleAuth;
