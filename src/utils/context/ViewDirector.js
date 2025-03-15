import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { useRouter } from 'next/navigation';
import Loading from '@/components/Loading';
import SignIn from '@/components/SignIn';
import NavBar from '@/components/NavBar';
import RegisterForm from '@/components/forms/RegisterForm';
import { checkUser } from '@/utils/auth'; // ✅ Make sure path is correct

function ViewDirectorBasedOnUserAuthStatus({ children }) {
  const { user, userLoading, updateUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.uid && !user.id) {
      checkUser(user.uid).then((existingUser) => {
        if (existingUser.id) {
          updateUser(existingUser); // ✅ Update user state
          if (window.location.pathname === '/register') {
            router.push('/'); // ✅ Redirect only if on /register
          }
        }
      });
    }
  }, [user, updateUser, router]);

  if (userLoading) return <Loading />;

  if (user) {
    return (
      <>
        <NavBar />
        <div className="container">{user.uid && !user.id ? <RegisterForm user={user} updateUser={updateUser} /> : children}</div>
      </>
    );
  }

  return <SignIn />;
}

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ViewDirectorBasedOnUserAuthStatus;
