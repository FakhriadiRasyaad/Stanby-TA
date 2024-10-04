import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';

const AboutUs: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-10 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <p className="text-lg text-center mb-10">
          Lorem kepsum terkesum kesum
          </p>
        <h2 className="text-3xl font-semibold text-center mb-6">Our Mission</h2>
        <p className="text-lg text-center mb-10">
        Lorem kepsum terkesum kesum
        </p>

        <h2 className="text-3xl font-semibold text-center mb-6">Our Vision</h2>
        <p className="text-lg text-center mb-10">
        Lorem kepsum terkesum kesum
        </p>

        <h2 className="text-3xl font-semibold text-center mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
   
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="/path/to/image1.jpg" alt="Team Member 1" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold">SODOM</h3>
              <p className="text-gray-600">IoT</p>
              <p className="mt-2">
              Lorem kepsum terkesum kesum
              </p>
            </div>
          </div>

      
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="/path/to/image2.jpg" alt="Team Member 2" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold">Reykyosi</h3>
              <p className="text-gray-600">Mob</p>
              <p className="mt-2">
              Lorem kepsum terkesum kesum
              </p>
            </div>
          </div>

       
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="/path/to/image3.jpg" alt="Team Member 3" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold">Pari</h3>
              <p className="text-gray-600">Web</p>
              <p className="mt-2">
              Lorem kepsum terkesum kesum
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src="/path/to/image4.jpg" alt="Team Member 4" className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold">Cicak</h3>
              <p className="text-gray-600">AI</p>
              <p className="mt-2">
              Lorem kepsum terkesum kesum
              </p>
            </div>
          </div>
        </div>
        <div className="mt-20"> {/* Margin above the footer */}
        <Footer />
      </div>
      </div>
    </div>
  );
};

export default AboutUs;
