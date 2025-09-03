import React from 'react'

const HowItWorks = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 px-6">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Transform your change communication in three simple steps
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                                1
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Describe Your Change</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Tell us about your project, timeline, and stakeholders. Our AI understands the context and
                                    requirements for effective communication.
                                </p>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                                2
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Generates Assets</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Professional slide decks, email series, video scripts, and FAQs are created instantly, tailored
                                    for each audience level.
                                </p>
                            </div>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl">
                                3
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Download & Deploy</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Get ready-to-use files in PowerPoint, Word, and PDF formats. Deploy your communication strategy
                                    immediately.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks