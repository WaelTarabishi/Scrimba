import { auth } from "@/auth";
import React from "react";
import { currentUserRole } from "../../../../lib/auth";

const AdminPage = async () => {
  const session = await currentUserRole();
  return <div>{session}</div>;
};

export default AdminPage;
