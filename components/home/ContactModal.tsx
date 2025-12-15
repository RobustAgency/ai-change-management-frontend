"use client"

import React, { useState, useRef } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, Building, User, MessageSquare, Send, CheckCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser'

interface ContactModalProps {
    isOpen: boolean
    onClose: () => void
}

interface FormData {
    full_name: string
    phone_number: string
    email: string
    business: string
    message: string
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    const [formData, setFormData] = useState<FormData>({
        full_name: '',
        phone_number: '',
        email: '',
        business: '',
        message: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const validateForm = (): boolean => {
        if (!formData.full_name.trim()) {
            toast.error('Please enter your full name')
            return false
        }
        if (!formData.email.trim()) {
            toast.error('Please enter your email')
            return false
        }
        if (!formData.email.includes('@')) {
            toast.error('Please enter a valid email address')
            return false
        }
        if (!formData.business.trim()) {
            toast.error('Please enter your business name')
            return false
        }
        if (!formData.message.trim()) {
            toast.error('Please enter a message')
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsLoading(true)

        try {
            const now = new Date()
            const timeFormatted = now.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            })

            const templateParams = {
                full_name: formData.full_name,
                phone_number: formData.phone_number || 'Not provided',
                email: formData.email,
                business: formData.business,
                message: formData.message,
                time: timeFormatted
            }

            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                templateParams,
                process.env.NEXT_PUBLIC_EMAILJS_USER_ID!
            )

            setIsSuccess(true)
            toast.success('Your message has been sent successfully!')

            setFormData({
                full_name: '',
                phone_number: '',
                email: '',
                business: '',
                message: ''
            })

        } catch (error) {
            console.error('Error sending email:', error)
            toast.error('Failed to send message. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleClose = () => {
        if (isLoading) return
        onClose()
        setTimeout(() => {
            setIsSuccess(false)
            setFormData({
                full_name: '',
                phone_number: '',
                email: '',
                business: '',
                message: ''
            })
        }, 100)
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="w-full !max-w-2xl mx-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Mail className="w-6 h-6 text-primary" />
                        Contact Us for Enterprise Pricing
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                        Get in touch with our team to discuss enterprise solutions and custom pricing for your organization.
                    </DialogDescription>
                </DialogHeader>

                {isSuccess ? (
                    <div className="py-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent Successfully!</h3>
                        <p className="text-gray-600 mb-6">
                            Thank you for your interest in our Enterprise plan. Our team will get back to you within 24 hours.
                        </p>
                        <Button onClick={handleClose} className="w-full">
                            Close
                        </Button>
                    </div>
                ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="full_name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </Label>
                                <Input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.full_name}
                                    onChange={handleInputChange}
                                    required
                                    className="h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone_number" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Phone Number
                                </Label>
                                <Input
                                    id="phone_number"
                                    name="phone_number"
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    value={formData.phone_number}
                                    onChange={handleInputChange}
                                    className="h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email Address
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="h-12"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="business" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                    <Building className="w-4 h-4" />
                                    Business/Company
                                </Label>
                                <Input
                                    id="business"
                                    name="business"
                                    type="text"
                                    placeholder="Enter your business or company name"
                                    value={formData.business}
                                    onChange={handleInputChange}
                                    required
                                    className="h-12"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" />
                                Message
                            </Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Tell us about your enterprise needs, team size, and any specific requirements..."
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows={4}
                                className="resize-none"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                disabled={isLoading}
                                className="flex-1"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 flex items-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        Sending
                                        <div className="loader" />
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default ContactModal