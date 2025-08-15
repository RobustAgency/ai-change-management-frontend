'use client'

import React from 'react'
import { DataTable } from '@/components/custom/DataTable'
import { columns, User } from './columns'
import TableCard from '@/components/custom/TableCard'

const dummyUsers: User[] = [
    {
        id: '1',
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        status: 'approved',
    },
    {
        id: '2',
        full_name: 'Jane Smith',
        email: 'jane.smith@example.com',
        status: 'pending',
    },
    {
        id: '3',
        full_name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        status: 'rejected',
    },
    {
        id: '4',
        full_name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        status: 'approved',
    },
    {
        id: '5',
        full_name: 'David Brown',
        email: 'david.brown@example.com',
        status: 'pending',
    },
]

const UsersTable = () => {
    return (
        <React.Fragment>
            <TableCard title="Users">
                <DataTable
                    columns={columns}
                    data={dummyUsers}
                    searchKey="full_name"
                    searchPlaceholder="Search users..."
                />
            </TableCard>
        </React.Fragment>
    )
}

export default UsersTable