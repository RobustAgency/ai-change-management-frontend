import React from 'react'
import { Card, CardTitle } from '../ui/card'

const TableCard = ({ children, title }: { children: React.ReactNode, title: string }) => {
    return (
        <React.Fragment>
            <Card className="p-5 gap-0">
                <CardTitle className="text-lg font-semibold">{title}</CardTitle>
                {children}
            </Card>
        </React.Fragment>
    )
}

export default TableCard