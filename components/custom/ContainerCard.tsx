import React from 'react'

interface ContainerCardProps {
    children: React.ReactNode
    title: string
    description: string
}

const ContainerCard = ({ children, title, description }: ContainerCardProps) => {
    return (
        <div className="container mx-auto px-4">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
                <p className="text-gray-600">{description}</p>
            </div>
            <div className="mb-12">
                {children}
            </div>
        </div>
    )
}

export default ContainerCard