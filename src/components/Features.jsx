import React from 'react';
import { 
  MessageSquare, 
  BarChart3, 
  Smartphone, 
  Clock, 
  Users, 
  Shield,
  Zap,
  Globe
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'Multi-Channel Complaint Intake',
      description: 'Accept complaints through web portal, mobile app, SMS, email, and phone calls with unified tracking.'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics & Reporting',
      description: 'Comprehensive dashboards with insights on complaint trends, resolution times, and department performance.'
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Native mobile apps for citizens and field officers with offline capability and GPS integration.'
    },
    {
      icon: Clock,
      title: 'Automated Workflow Management',
      description: 'Smart routing, escalation rules, and SLA monitoring to ensure timely resolution of complaints.'
    },
    {
      icon: Users,
      title: 'Citizen Engagement Portal',
      description: 'Self-service portal for citizens to track complaints, provide feedback, and access government services.'
    },
    {
      icon: Shield,
      title: 'Advanced Security & Privacy',
      description: 'Enterprise-grade security with role-based access control and data encryption compliance.'
    },
    {
      icon: Zap,
      title: 'AI-Powered Insights',
      description: 'Machine learning algorithms for complaint categorization, priority assignment, and predictive analytics.'
    },
    {
      icon: Globe,
      title: 'Multi-Language Support',
      description: 'Support for multiple regional languages with automatic translation and localization features.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Features for 
            <span className="text-blue-600"> Modern Governance</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our complaint management solution provides everything you need to transform citizen services and improve government efficiency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <IconComponent className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Citizen Services?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join hundreds of government organizations already using MyCiti to improve citizen satisfaction and operational efficiency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Removed Schedule Demo and Download Brochure buttons as requested */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;