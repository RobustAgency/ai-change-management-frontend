import type { Metadata } from 'next'

;

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
                                <li>Monitor and analyze usage patterns</li>
                                <li>Detect and prevent fraud and abuse</li>
                                <li>Comply with legal obligations</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
                            <p className="text-gray-700 mb-4">
                                We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>With your explicit consent</li>
                                <li>To trusted service providers who assist in operating our service</li>
                                <li>When required by law or to protect our rights</li>
                                <li>In connection with a business transfer or merger</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
                            <p className="text-gray-700 mb-4">
                                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
                            <p className="text-gray-700 mb-4">
                                We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
                            <p className="text-gray-700 mb-4">
                                Depending on your location, you may have the following rights regarding your personal information:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 mb-4">
                                <li>Access to your personal information</li>
                                <li>Correction of inaccurate information</li>
                                <li>Deletion of your personal information</li>
                                <li>Restriction of processing</li>
                                <li>Data portability</li>
                                <li>Objection to processing</li>
                                <li>Withdrawal of consent</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking Technologies</h2>
                            <p className="text-gray-700 mb-4">
                                We use cookies and similar tracking technologies to enhance your experience on our service. You can control cookie settings through your browser, but disabling cookies may affect functionality.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Third-Party Services</h2>
                            <p className="text-gray-700 mb-4">
                                Our service may contain links to third-party websites or integrate with third-party services. This Privacy Policy does not apply to these external services, and we encourage you to review their privacy policies.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Children&apos;s Privacy</h2>
                            <p className="text-gray-700 mb-4">
                                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will delete it promptly.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. International Data Transfers</h2>
                            <p className="text-gray-700 mb-4">
                                Your information may be transferred to and processed in countries other than your own. We ensure that such transfers are protected by appropriate safeguards in accordance with applicable data protection laws.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to This Privacy Policy</h2>
                            <p className="text-gray-700 mb-4">
                                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page with an updated &ldquo;Last updated&rdquo; date.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
                            <p className="text-gray-700 mb-4">
                                If you have any questions about these Terms of Service, please contact us at Mirinda.scott@innovative-dialogs.com.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}