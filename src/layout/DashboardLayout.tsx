import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/store";

export const DashboardLayout = () => {

  const { user } = useAuthStore();
  if(user == null){
    return <Navigate to="/auth/login" replace={true}/>
  }

  return (
    <>
      <Outlet/>
    </>
  )
}
