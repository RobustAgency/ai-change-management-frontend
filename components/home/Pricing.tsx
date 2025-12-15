import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CheckCircle, Sparkles, Star, Zap } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { Plan } from '@/interfaces/Plan'
import { formatCurrency } from '@/utils/formatCurrency'

// The home page doesn't need stripe IDs — use a Plan-like shape without `stripe_price_id`.
const plansData: Omit<Plan, 'stripe_price_id'>[] = [
    {
        id: 1,
        name: 'Basic',
        description: 'Basic plan with essential features',
        limit: 1,
        price: 29.99,
        billing_cycle: 'monthly',
        currency: 'usd',
        active: true,
        created_at: '2025-10-16T13:46:38.000000Z',
        updated_at: '2025-10-16T13:46:38.000000Z',
    },
    {
        id: 2,
        name: 'Standard',
        description: 'Standard plan with additional features',
        limit: 3,
        price: 59.99,
        billing_cycle: 'monthly',
        currency: 'usd',
        active: true,
        created_at: '2025-10-16T13:46:38.000000Z',
        updated_at: '2025-10-16T13:46:38.000000Z',
    },
    {
        id: 3,
        name: 'Premium',
        description: 'Premium plan with all features',
        limit: 5,
        price: 99.99,
        billing_cycle: 'monthly',
        currency: 'usd',
        active: true,
        created_at: '2025-10-16T13:46:38.000000Z',
        updated_at: '2025-10-16T13:46:38.000000Z',
    },
]

const Pricing = () => {
    return (
        <section id="pricing" className="container mx-auto px-14 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Simple, Transparent Pricing</h2>
                <p className="text-xl text-gray-600">Choose the plan that fits your needs</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {plansData.map((plan, idx) => {
                    const isFeatured = plan.name.toLowerCase() === 'standard' || idx === 1
                    return (
                        <Card
                            key={plan.id}
                            className={
                                isFeatured
                                    ? 'border-2 border-indigo-500 bg-white relative shadow-xl scale-105'
                                    : 'border-2 border-gray-200 bg-white hover:shadow-lg transition-all'
                            }
                        >
                            {isFeatured && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-primary text-white px-6 py-2 rounded-full text-sm font-bold">Most Popular</div>
                                </div>
                            )}

                            <CardHeader className="text-center pb-6 pt-8">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${isFeatured ? 'bg-primary' : plan.name.toLowerCase() === 'basic' ? 'bg-gray-100' : 'bg-gray-600'}`}>
                                    {plan.name.toLowerCase() === 'basic' && <Star className="w-6 h-6 text-gray-600" />}
                                    {plan.name.toLowerCase() === 'standard' && <Sparkles className="w-6 h-6 text-white" />}
                                    {plan.name.toLowerCase() === 'premium' && <Zap className="w-6 h-6 text-white" />}
                                </div>
                                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                <div className="text-4xl font-bold text-gray-900 mt-2">
                                    {formatCurrency(plan.price, plan.currency)}
                                    <span className="text-lg font-normal text-gray-600">/{plan.billing_cycle}</span>
                                </div>
                                <p className="text-gray-600 mt-2">{plan.description}</p>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4 mb-6 text-sm">
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">{plan.limit} projects</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Customizable presentation templates</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Slide deck generation</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Email series automation</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Video script generation</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Audience-specific messaging</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Export to PPTX & DOCX</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700">Standard support</span>
                                    </li>
                                </ul>
                                <Link href={'/billing?tab=plans'}>
                                    <Button
                                        variant={isFeatured ? 'default' : 'outline'}
                                        className={`w-full h-12 font-semibold ${isFeatured ? 'text-white' : ''}`}
                                    >
                                        Get Started
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </section>
    )
}

export default Pricing