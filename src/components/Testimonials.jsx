import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Municipal Commissioner',
      organization: 'Smart City Mission, Pune',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'MyCiti has revolutionized how we handle citizen complaints. The automated workflow and real-time tracking have improved our response time by 65%. Citizens are more satisfied than ever.',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      position: 'Director of Public Services',
      organization: 'Municipal Corporation, Bangalore',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'The analytics dashboard provides incredible insights into complaint patterns. We can now proactively address issues before they become major problems. Highly recommended!',
      rating: 5
    },
    {
      name: 'Amit Patel',
      position: 'IT Head',
      organization: 'Ahmedabad Municipal Corporation',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      content: 'Implementation was seamless and the support team is exceptional. The mobile app has made it so easy for citizens to report issues. Our complaint resolution rate has increased by 40%.',
      rating: 5
    }
  ];

  const stats = [
    { number: '500+', label: 'Organizations Trust Us' },
    { number: '2M+', label: 'Complaints Resolved' },
    { number: '95%', label: 'Customer Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Government 
            <span className="text-blue-600"> Organizations Nationwide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our clients say about transforming their citizen services with MyCiti's complaint management solution.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200" />
                <p className="text-gray-700 leading-relaxed pl-6">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.position}
                  </div>
                  <div className="text-sm text-blue-600">
                    {testimonial.organization}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;