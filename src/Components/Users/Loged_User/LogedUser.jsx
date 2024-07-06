import React, { useEffect, useState } from "react";
import authService from "../../../Service/auth-service";
import Companyp from "../Company/Companyp";
import Userprofile from "../UserProfileNew/Userprofile";
// import Administration from "../Admin/Administration";
import Admin_Dashboard from "../Admin_Dashboard/Admin/Admin_Dashboard";

function Dashboard() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className="dashboard">
      {currentUser &&
        currentUser.roles.includes("CompanyOwner") &&
        currentUser.roles.length === 2 && <Companyp />}

      {currentUser &&
        currentUser.roles.includes("Admin") &&
        currentUser.roles.length === 2 && <Admin_Dashboard />}

      {currentUser &&
        currentUser.roles.length === 1 &&
        currentUser.roles.includes("User") && <Userprofile />}
    </div>
  );
}

export default Dashboard;
