import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Contact Us</h1>
      
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Get In Touch</h2>
            
            <div className="flex items-start">
              <Phone className="text-blue-600 mr-4 mt-1" size={24} />
              <div>
                <h3 className="font-medium text-gray-800">Phone Numbers</h3>
                <p className="text-gray-600">8639610615</p>
                <p className="text-gray-600">9959118953</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="text-blue-600 mr-4 mt-1" size={24} />
              <div>
                <h3 className="font-medium text-gray-800">Email</h3>
                <p className="text-gray-600">vadaladineshkumar@gmail.com</p>
                <p className="text-gray-600">vadaladineshkumar1@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <MapPin className="text-blue-600 mr-4 mt-1" size={24} />
              <div>
                <h3 className="font-medium text-gray-800">Location</h3>
                <p className="text-gray-600">Ongole, Andhra Pradesh, India</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Send a Message</h2>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="What would you like to tell us?"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;