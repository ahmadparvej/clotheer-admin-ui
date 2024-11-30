
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
export const AuthLayout = () => {

  const { user } = useAuthStore();
  if(user !== null){
    return <Navigate to="/" replace={true}/>
  }

  return (
    <>
      <Outlet/>
    </>
  )
}
