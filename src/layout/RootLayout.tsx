import { Outlet } from "react-router-dom"
import { self } from "../http/api";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/store";
import { useEffect } from "react";

export const RootLayout = () => {

  const { setUser } = useAuthStore();

  const getSelf = async () => {
    const data = await self();
    return data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
  });

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
  }, [data, setUser])
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet/>
}
