
import React from 'react'
import ChangePasswordForm from './_components/change-password-form'
import DashboardOverviewHeader from '../_components/dashboard-overview-header'

const SettingsPage = () => {
  return (
    <div className=''>
       <DashboardOverviewHeader
        title="Settings"
        description="View, organize, and update all user accounts from one place."
      />
      <ChangePasswordForm/>
    </div>
  )
}

export default SettingsPage