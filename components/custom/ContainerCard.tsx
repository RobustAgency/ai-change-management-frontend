import React from 'react'

interface ContainerCardProps {
    children: React.ReactNode
    title: string
    description: string
}

const ContainerCard = ({ children, title, description }: ContainerCardProps) => {
    return (
        <div>
            <div className="mb-6 sm:mb-8 lg:mb-10">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{title}</h1>
                <p className="text-base sm:text-lg lg:text-xl text-gray-600">{description}</p>
            </div>
            {children}
        </div>
    )
}
export default ContainerCard