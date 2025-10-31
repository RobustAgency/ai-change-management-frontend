import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms of service for AI Change Management platform. Understand your rights and responsibilities when using our change management tools and services.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Terms of Service</h1>
                        <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
                    </div>

                    <div className="prose max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 mb-4">
                                By accessing and using ChangeAI (&ldquo;Service&rdquo;), you accept and agree to be bound by the terms and provision of this agreement.
                                If you do not agree to abide by the above, please do not use this service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                            <p className="text-gray-700 mb-4">
                                ChangeAI is a platform that helps organizations generate professional communication assets using artificial intelligence.
                                Our service includes tools for creating presentations, documents, and other communication materials.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                            <p className="text-gray-700 mb-4">
                                To access certain features of the Service, you must register for an account. You are responsible for maintaining
                                the confidentiality of your account credentials and for all activities that occur under your account.
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>You must provide accurate and complete registration information</li>
                                <li>You are responsible for maintaining the security of your account</li>
                                <li>You must notify us immediately of any unauthorized use of your account</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Acceptable Use</h2>
                            <p className="text-gray-700 mb-4">
                                You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Use the Service for any illegal or unauthorized purpose</li>
                                <li>Violate any applicable laws or regulations</li>
                                <li>Infringe upon the rights of others</li>
                                <li>Upload or transmit harmful, offensive, or inappropriate content</li>
                                <li>Attempt to gain unauthorized access to the Service or other users&apos; accounts</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
                            <p className="text-gray-700 mb-4">
                                The Service and its original content, features, and functionality are owned by ChangeAI and are protected by
                                international copyright, trademark, patent, trade secret, and other intellectual property laws.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. User Content</h2>
                            <p className="text-gray-700 mb-4">
                                You retain ownership of any content you submit, upload, or create using the Service. By using the Service,
                                you grant us a license to use, store, and process your content as necessary to provide the Service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Payment and Billing</h2>
                            <p className="text-gray-700 mb-4">
                                Certain features of the Service may require payment. You agree to pay all applicable fees and charges.
                                All payments are non-refundable unless otherwise stated.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Termination</h2>
                            <p className="text-gray-700 mb-4">
                                We may terminate or suspend your account and access to the Service immediately, without prior notice,
                                for any reason, including breach of these Terms.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimer of Warranties</h2>
                            <p className="text-gray-700 mb-4">
                                The Service is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. We make no warranties, expressed or implied,
                                and hereby disclaim all other warranties including implied warranties of merchantability, fitness for a particular purpose,
                                and non-infringement.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Limitation of Liability</h2>
                            <p className="text-gray-700 mb-4">
                                In no event shall ChangeAI be liable for any indirect, incidental, special, or consequential damages,
                                including loss of profits, data, or use, incurred by you or any third party.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h2>
                            <p className="text-gray-700 mb-4">
                                We reserve the right to modify these Terms at any time. We will notify users of any material changes by
                                posting the new Terms on this page with an updated &ldquo;Last updated&rdquo; date.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Information</h2>
                            <p className="text-gray-700 mb-4">
                                If you have any questions about these Terms of Service, please contact us at legal@changeai.com.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}