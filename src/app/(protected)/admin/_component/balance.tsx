"use client";
import { useQuery } from "@tanstack/react-query";
import CountUp from "react-countup";
import { AdminBalance } from "../../../../../actions/user/get-admin-balance";
import { useEffect, useState } from "react";

const Balance = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { data: balance, isLoading } = useQuery({
    queryKey: ["counts"],
    queryFn: () => AdminBalance(),
  });
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return 0;
  return (
    <div>{isLoading ? "0" : <CountUp end={balance || 0} duration={2.5} />}</div>
  );
};

export default Balance;
