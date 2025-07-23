import React from 'react';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: 'Improved Efficiency',
      description: 'Reduce complaint resolution time by up to 60% with automated workflows and smart routing.',
      stats: '60% Faster Resolution'
    },
    {
      icon: Users,
      title: 'Enhanced Citizen Satisfaction',
      description: 'Increase citizen satisfaction scores with transparent tracking and timely updates.',
      stats: '95% Satisfaction Rate'
    },
    {
      icon: Clock,
      title: 'Real-time Monitoring',
      description: 'Track complaint status in real-time with automated notifications and escalations.',
      stats: '24/7 Monitoring'
    },
    {
      icon: Award,
      title: 'Better Accountability',
      description: 'Improve government transparency with detailed audit trails and performance metrics.',
      stats: '100% Transparency'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Measurable Benefits for 
            <span className="text-blue-600"> Your Organization</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See real results with our proven complaint management solution that delivers tangible improvements in citizen services.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                
                <div className="text-2xl font-bold text-blue-600">
                  {benefit.stats}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Benefits;