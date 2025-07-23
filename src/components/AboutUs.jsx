import React, { useState } from 'react';
import { 
  Users, 
  Target, 
  Award, 
  Heart,
  MapPin,
  Calendar,
  TrendingUp,
  Shield,
  Lightbulb,
  Globe,
  ChevronRight,
  Play,
  Quote,
  Linkedin,
  Twitter,
  Mail
} from 'lucide-react';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('story');
  const [hoveredMember, setHoveredMember] = useState(null);

  const stats = [
    { number: '2018', label: 'Founded', icon: Calendar },
    { number: '500+', label: 'Organizations Served', icon: Users },
    { number: '2M+', label: 'Complaints Resolved', icon: TrendingUp },
    { number: '50+', label: 'Cities Transformed', icon: Globe }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Transparency',
      description: 'We believe in open governance and transparent processes that build citizen trust.',
      color: 'blue'
    },
    {
      icon: Heart,
      title: 'Citizen-Centric',
      description: 'Every solution we build puts citizens at the center, ensuring their voices are heard.',
      color: 'red'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We leverage cutting-edge technology to solve complex governance challenges.',
      color: 'yellow'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every project, delivering solutions that exceed expectations.',
      color: 'green'
    }
  ];

  const team = [
    {
      name: 'Rajesh Sharma',
      position: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Former IAS officer with 15+ years in public administration. Passionate about digital governance.',
      social: { linkedin: '#', twitter: '#', email: 'rajesh@myciti.in' }
    },
    {
      name: 'Priya Patel',
      position: 'CTO',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Tech leader with expertise in AI/ML and scalable systems. Former Google engineer.',
      social: { linkedin: '#', twitter: '#', email: 'priya@myciti.in' }
    },
    {
      name: 'Amit Kumar',
      position: 'Head of Product',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Product strategist focused on user experience and government workflow optimization.',
      social: { linkedin: '#', twitter: '#', email: 'amit@myciti.in' }
    },
    {
      name: 'Sneha Gupta',
      position: 'Head of Operations',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Operations expert ensuring smooth implementation and customer success across all projects.',
      social: { linkedin: '#', twitter: '#', email: 'sneha@myciti.in' }
    }
  ];

  const milestones = [
    {
      year: '2018',
      title: 'Company Founded',
      description: 'Started with a vision to transform citizen services through technology.'
    },
    {
      year: '2019',
      title: 'First Major Client',
      description: 'Successfully implemented complaint management system for Pune Municipal Corporation.'
    },
    {
      year: '2020',
      title: 'AI Integration',
      description: 'Launched AI-powered complaint categorization and priority assignment features.'
    },
    {
      year: '2021',
      title: 'Mobile Revolution',
      description: 'Released native mobile apps for citizens and field officers with offline capabilities.'
    },
    {
      year: '2022',
      title: 'Scale Achievement',
      description: 'Reached 100+ government organizations and 1M+ complaints resolved milestone.'
    },
    {
      year: '2023',
      title: 'National Recognition',
      description: 'Awarded "Best GovTech Solution" by Digital India Awards.'
    },
    {
      year: '2024',
      title: 'Future Ready',
      description: 'Expanding to 500+ organizations with advanced analytics and predictive insights.'
    }
  ];

  const tabContent = {
    story: (
      <div className="space-y-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-600 leading-relaxed">
            SocietyCare was born from a simple yet powerful observation: citizens deserve better from their government, 
            and technology can be the bridge that makes it happen.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Founded in 2018 by former IAS officer Rajesh Sharma, SocietyCare emerged from years of firsthand experience 
            with the challenges facing government organizations in managing citizen complaints and service requests. 
            Having witnessed the frustration of both citizens and government officials dealing with inefficient, 
            paper-based processes, our founder envisioned a digital solution that could transform how governments 
            interact with their constituents.
          </p>
          <p className="text-gray-600 leading-relaxed">
            What started as a small team of passionate technologists and governance experts has grown into India's 
            leading complaint management platform, serving over 500 government organizations and helping resolve 
            more than 2 million citizen complaints. Our journey has been marked by continuous innovation, 
            unwavering commitment to transparency, and a deep understanding of the unique challenges faced by 
            government organizations.
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            To empower governments with intelligent technology solutions that enhance citizen services, 
            improve operational efficiency, and build trust through transparency and accountability.
          </p>
        </div>
      </div>
    ),
    mission: (
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Transforming Governance Through Technology
          </h3>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Our Vision</h4>
                <p className="text-gray-600">
                  A future where every citizen interaction with government is seamless, transparent, and efficient.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Our Purpose</h4>
                <p className="text-gray-600">
                  To bridge the gap between citizens and government through innovative technology solutions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Our Commitment</h4>
                <p className="text-gray-600">
                  Delivering world-class solutions that make a real difference in people's lives.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="text-center mb-6">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">Global Impact</h4>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Countries</span>
                <span className="font-bold text-blue-600">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cities</span>
                <span className="font-bold text-blue-600">50+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Citizens Served</span>
                <span className="font-bold text-blue-600">10M+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Success Rate</span>
                <span className="font-bold text-green-600">98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    timeline: (
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <div key={index} className="relative flex items-start group">
              <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg group-hover:scale-125 transition-transform"></div>
              <div className="ml-20 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group-hover:transform group-hover:scale-105 duration-300">
                <div className="flex items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold mr-4">
                    {milestone.year}
                  </span>
                  <h4 className="text-xl font-bold text-gray-900">{milestone.title}</h4>
                </div>
                <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">SocietyCare</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to transform how governments serve their citizens through innovative 
              technology solutions that make public services more efficient, transparent, and accessible.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:transform group-hover:scale-105">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                      <IconComponent className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-16">
            <div className="bg-gray-100 p-2 rounded-xl">
              {[
                { id: 'story', label: 'Our Story' },
                { id: 'mission', label: 'Mission & Vision' },
                { id: 'timeline', label: 'Timeline' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-6xl mx-auto">
            {tabContent[activeTab]}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core <span className="text-blue-600">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we build solutions for government organizations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:transform group-hover:scale-105 h-full">
                    <div className={`bg-${value.color}-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-${value.color}-600 transition-colors`}>
                      <IconComponent className={`h-8 w-8 text-${value.color}-600 group-hover:text-white transition-colors`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-blue-600">Leadership Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced leaders from government, technology, and business sectors working together to transform citizen services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:transform group-hover:scale-105 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3">
                        <a href={member.social.linkedin} className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors">
                          <Linkedin className="h-4 w-4 text-white" />
                        </a>
                        <a href={member.social.twitter} className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors">
                          <Twitter className="h-4 w-4 text-white" />
                        </a>
                        <a href={`mailto:${member.social.email}`} className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors">
                          <Mail className="h-4 w-4 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join hundreds of government organizations that trust SocietyCare to improve their citizen services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center group">
              Schedule a Demo
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;