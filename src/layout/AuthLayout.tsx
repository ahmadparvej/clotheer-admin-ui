
import { Outlet, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
export const AuthLayout = () => {

  const location = useLocation();
  const { user } = useAuthStore();

  if(user !== null){
    const returnTo = new URLSearchParams(location.search).get("returnTo") || "/";
    return <Navigate to={returnTo} replace={true}/>
  }

  return (
    <>
      <Outlet/>
    </>
  )
}
