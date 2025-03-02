import React from 'react';
import Navbar from "../websiteComponents/navbar/Navbar.jsx";
import Footer from "../websiteComponents/footer/Footer.jsx";
import "../websiteComponents/scrollbar.css";

// Team Member Data
const teamMembers = [
    {
        name: 'Anna Smith',
        img: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        role: 'Head Pastry Chef'
    },
    {
        name: 'Bella Johnson',
        img: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        role: 'Master Baker'
    },
    {
        name: 'Clara Williams',
        img: 'https://images.unsplash.com/photo-1577221084712-45b0445d2b00?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        role: 'Cake Specialist'
    }
];

const AboutPage = () => {
    return (
        <div className="bg-[#e9e3e3] min-h-screen flex flex-col">
            <Navbar />

            {/* Main Content Container */}
            <main className="flex-1">
                {/* Our Story Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="text-center mb-8">
                            <h2 className="text-[#F4952C] font-pacifico text-3xl ">Our Story</h2>
                            <h3 className="text-black font-quicksand text-2xl font-semibold mt-2">
                                Baking Memories Since 2010
                            </h3>
                        </div>
                        <p className="text-lg text-gray-700 leading-relaxed mb-8">
                            What began as a small family kitchen in downtown Paris has blossomed into Sweet Oven Bakery,
                            a beloved institution where traditional recipes meet modern artistry. Founded by master baker
                            Pierre Laurent, we've stayed true to our roots while innovating with seasonal ingredients and
                            sustainable practices.
                        </p>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1670&q=80"
                                alt="Bakery interior"
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
                                    Our Baking Philosophy
                                </h3>
                                <ul className="space-y-4 text-gray-800">
                                    {[
                                        'Locally-sourced organic ingredients',
                                        '72-hour fermented sourdough',
                                        'Zero preservatives & artificial additives',
                                        'Sustainable packaging solutions'
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
                                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1670&q=80"
                                    alt="Freshly baked bread"
                                    className="w-full h-full object-cover rounded-lg shadow-lg row-span-2"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1670&q=80"
                                    alt="Bakers at work"
                                    className="w-full h-full object-cover rounded-lg shadow-lg"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1557844352-761f2565b576?ixlib=rb-1.2.1&auto=format&fit=crop&w=1670&q=80"
                                    alt="Organic ingredients"
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
                            Master Bakers Behind the Magic
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {teamMembers.map((member) => (
                                <div key={member.name} className="group">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden mx-auto
                    shadow-lg transition-transform duration-300 group-hover:scale-105">
                                        <img
                                            src={member.img}
                                            alt={`${member.name} portrait`}
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