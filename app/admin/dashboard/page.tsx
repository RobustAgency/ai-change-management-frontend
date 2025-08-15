import React from 'react'
import UsersTable from '@/components/admin/dashboard/UsersTable'

const AdminDashboardPage = () => {
    return (
        <div className="">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage users and system settings</p>
            </div>

            <div className="bg-white rounded-lg shadow">
                <UsersTable />
            </div>
        </div>
    )
}

export default AdminDashboardPage