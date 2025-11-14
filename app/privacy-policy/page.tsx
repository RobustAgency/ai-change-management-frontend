import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Innovative Dialogs protects your privacy and handles your personal data. Read our comprehensive privacy policy for transparency and compliance information.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
                        <p className="text-gray-600">Last updated: 11/1/2025</p>
                    </div>

                    <div className="prose max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                            <p className="text-gray-700 mb-4">
                                Life Vision, LLC – Innovative Dialogs® - ChangeAI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information</h3>
                            <p className="text-gray-700 mb-4">
                                We may collect personal information that you voluntarily provide when you:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Register for an account</li>
                                <li>Use our services</li>
                                <li>Contact us for support</li>
                                <li>Subscribe to our Service</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Information</h3>
                            <p className="text-gray-700 mb-4">
                                We automatically collect certain information about your device and usage patterns, including:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>IP address and location data</li>
                                <li>Browser type and version</li>
                                <li>Pages visited and time spent</li>
                                <li>Device information</li>
                                <li>Cookies and similar technologies</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                            <p className="text-gray-700 mb-4">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Provide, maintain, and improve our services</li>
                                <li>Process transactions and send related information</li>
                                <li>Send administrative information and updates</li>
                                <li>Respond to your comments and questions</li>
                                <li>Personalize your experience</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}