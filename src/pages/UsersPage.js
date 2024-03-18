import React from "react";
import UsersList from "../components/Users/UsersList";
import Breadcrumbs from "../components/ui/Breadcrumbs";

const UsersPage = () => {
  return (
    <div>
      <Breadcrumbs page={"Users"} main={false} text={""} />
      <h2 className="text-2xl font-bold mb-4">Users List</h2>
      <UsersList />
    </div>
  );
};

export default UsersPage;
