import { auth } from "@/auth";
import React from "react";
import { currentUserRole } from "../../../../lib/auth";

const AdminPage = async () => {
  const usr = await currentUserRole();
  return <>{usr}</>;
};

export default AdminPage;
