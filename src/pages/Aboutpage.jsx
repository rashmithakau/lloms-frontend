import React from 'react';
import Navbar from "../websiteComponents/navbar/Navbar.jsx";
import Footer from "../websiteComponents/footer/Footer.jsx";
import "../websiteComponents/scrollbar.css";

// Team Member Data
const teamMembers = [
    { name: '###', img: '#', role: 'Head Pastry Chef' },
    { name: '###', img: '#', role: 'Master Baker' },
    { name: '###', img: '#', role: 'Cake Specialist' }
];

const AboutPage = () => {
    return (
        <div className="bg-[#f8f4f4] min-h-screen flex flex-col">
            <Navbar />

            {/* Main Content Container */}
            <main className="flex-1">
                {/* Our Story Section */}
                <section className="py-5 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="text-center mb-8">
                            <h2 className="text-[#F4952C] font-pacifico text-3xl ">Our Story</h2>
                            <h3 className="text-black font-quicksand text-2xl font-semibold mt-2">
                                We Care About Our Customers <br /> Experience Too
                            </h3>
                        </div>
                        <br/>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            Since 2010, Sweet Oven Bakery has been a place where passion meets perfection.
                            From a small family kitchen to a renowned artisan bakery, we've upheld our tradition
                            of using natural ingredients and time-honored recipes.
                        </p>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                            <img
                                src="#"
                                alt="Our bakery interior"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="bg-[#fff5e1] py-16">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6">
                                <h3 className="text-2xl md:text-3xl font-quicksand font-semibold">
                                    Why Choose Us
                                </h3>
                                <ul className="space-y-4 text-gray-800">
                                    {[
                                        '100% Natural & Organic Ingredients',
                                        'Handcrafted With Love',
                                        'Freshly Baked Every Morning',
                                        'Supporting Local Farmers'
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="text-[#F4952C] mt-1">✓</span>
                                            <span className="flex-1 font-quicksand text-base md:text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Image Grid */}
                            <div className="grid grid-cols-2 grid-rows-2 gap-4 h-96">
                                <img
                                    src="#"
                                    alt="Freshly baked bread"
                                    className="w-full h-full object-cover rounded-lg shadow-lg row-span-2"
                                />
                                <img
                                    src="#"
                                    alt="Work"
                                    className="w-full h-full object-cover rounded-lg shadow-lg"
                                />
                                <img
                                    src="#"
                                    alt="Fresh ingredients"
                                    className="w-full h-full object-cover rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-2xl md:text-3xl font-quicksand font-semibold mb-12">
                            Meet Our Bakers
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {teamMembers.map((member) => (
                                <div key={member.name} className="group">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto
                    shadow-lg transition-transform duration-300 group-hover:scale-105">
                                        <img
                                            src={member.img}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="font-quicksand font-medium text-[#F4952C] text-lg">
                                            {member.name}
                                        </h4>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;