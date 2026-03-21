import React from "react";
import ContactManagementContainer from "./_components/contact-management-container";
import DashboardOverviewHeader from "../_components/dashboard-overview-header";

const ContactManagementPage = () => {
  return (
    <div>
      <DashboardOverviewHeader
        title="Manage Users"
        description="View, organize, and update all user accounts from one place."
      />
      <ContactManagementContainer />
    </div>
  );
};

export default ContactManagementPage;
