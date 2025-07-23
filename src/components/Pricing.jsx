import React, { useState } from 'react';
import { Check, X, ArrowRight, Star, Zap } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small municipalities',
      price: { monthly: 999, annual: 9990 },
      originalPrice: { monthly: 1299, annual: 12990 },
      features: [
        'Up to 1,000 complaints/month',
        'Web portal & mobile app',
        'Basic reporting',
        'Email support',
        '2 admin users',
        'Standard integrations'
      ],
      limitations: [
        'No advanced analytics',
        'No custom workflows',
        'No API access'
      ],
      popular: false,
      color: 'blue',
      badge: null
    },
    {
      name: 'Professional',
      description: 'Ideal for medium-sized cities',
      price: { monthly: 2499, annual: 24990 },
      originalPrice: { monthly: 2999, annual: 29990 },
      features: [
        'Up to 10,000 complaints/month',
        'Advanced analytics dashboard',
        'Custom workflows',
        'Priority support',
        '10 admin users',
        'API access',
        'Multi-language support',
        'SLA management'
      ],
      limitations: [
        'No white-labeling',
        'Limited customization'
      ],
      popular: true,
      color: 'indigo',
      badge: 'Most Popular'
    },
    {
      name: 'Enterprise',
      description: 'For large government organizations',
      price: { monthly: 4999, annual: 49990 },
      originalPrice: { monthly: 5999, annual: 59990 },
      features: [
        'Unlimited complaints',
        'Full white-labeling',
        'Custom integrations',
        'Dedicated support manager',
        'Unlimited admin users',
        'Advanced security features',
        'Custom reporting',
        'On-premise deployment option',
        'Training & onboarding'
      ],
      limitations: [],
      popular: false,
      color: 'purple',
      badge: 'Enterprise'
    }
  ];

  const handlePlanSelect = (planIndex) => {
    setSelectedPlan(planIndex);
    // Add a subtle shake animation
    setTimeout(() => setSelectedPlan(null), 300);
  };

  const calculateSavings = (plan) => {
    const monthlyCost = plan.price.monthly * 12;
    const annualCost = plan.price.annual;
    return monthlyCost - annualCost;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce">
            <Star className="h-4 w-4 mr-2" />
            Limited Time Offer - Save up to 17%
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent 
            <span className="text-blue-600 relative">
              Pricing
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform"></div>
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your organization's needs. All plans include our core complaint management features.
          </p>
          
          {/* Enhanced Billing Toggle */}
          <div className="flex items-center justify-center mb-8">
            <span className={`mr-4 text-lg font-medium transition-all duration-300 ${billingCycle === 'monthly' ? 'text-gray-900 scale-110' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative inline-flex h-8 w-16 items-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-all duration-300 ${
                  billingCycle === 'annual' ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`ml-4 text-lg font-medium transition-all duration-300 ${billingCycle === 'annual' ? 'text-gray-900 scale-110' : 'text-gray-500'}`}>
              Annual
            </span>
            {billingCycle === 'annual' && (
              <div className="ml-3 bg-gradient-to-r from-green-400 to-green-600 text-white text-sm px-3 py-1 rounded-full animate-pulse">
                <Zap className="inline h-3 w-3 mr-1" />
                Save up to ₹10,000
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-3xl shadow-xl transition-all duration-500 cursor-pointer group ${
                plan.popular ? 'ring-4 ring-blue-500 scale-105 z-10' : 'hover:scale-105'
              } ${
                selectedPlan === index ? 'animate-pulse ring-4 ring-green-400' : ''
              } ${
                hoveredCard === index ? 'shadow-2xl transform -translate-y-2' : ''
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handlePlanSelect(index)}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-20">
                  <div className={`bg-gradient-to-r ${
                    plan.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    plan.color === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                    'from-purple-500 to-purple-600'
                  } text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-bounce`}>
                    {plan.badge}
                  </div>
                </div>
              )}
              
              {/* Card Content */}
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {plan.description}
                  </p>
                  
                  {/* Price Display */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-2">
                      {billingCycle === 'annual' && (
                        <span className="text-lg text-gray-400 line-through mr-2">
                          ₹{plan.originalPrice[billingCycle].toLocaleString()}
                        </span>
                      )}
                      <span className="text-4xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        ₹{plan.price[billingCycle].toLocaleString()}
                      </span>
                    </div>
                    <span className="text-gray-600">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                    
                    {billingCycle === 'annual' && (
                      <div className="mt-2 text-green-600 font-semibold text-sm">
                        Save ₹{calculateSavings(plan).toLocaleString()} annually!
                      </div>
                    )}
                  </div>
                  
                  {/* CTA Button */}
                  <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl focus:ring-blue-300' 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300'
                  } group`}>
                    <span className="flex items-center justify-center">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
                
                {/* Features List */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      Included Features:
                    </h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start text-sm group/item">
                          <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                          <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <X className="h-5 w-5 text-gray-400 mr-2" />
                        Not Included:
                      </h4>
                      <ul className="space-y-3">
                        {plan.limitations.map((limitation, limitationIndex) => (
                          <li key={limitationIndex} className="flex items-start text-sm">
                            <X className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-500">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                plan.color === 'blue' ? 'from-blue-500/5 to-blue-600/5' :
                plan.color === 'indigo' ? 'from-indigo-500/5 to-indigo-600/5' :
                'from-purple-500/5 to-purple-600/5'
              } rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Enhanced FAQ Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                {
                  question: "Is there a setup fee?",
                  answer: "No, there are no setup fees. We include implementation and training in all our plans."
                },
                {
                  question: "Can I upgrade or downgrade my plan?",
                  answer: "Yes, you can change your plan at any time. Changes take effect at the next billing cycle."
                },
                {
                  question: "Do you offer custom pricing for large organizations?",
                  answer: "Yes, we offer custom pricing for organizations with specific requirements. Contact our sales team."
                }
              ].map((faq, index) => (
                <div key={index} className="group cursor-pointer">
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              {[
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept bank transfers, credit cards, and can work with government procurement processes."
                },
                {
                  question: "Is there a free trial available?",
                  answer: "Yes, we offer a 30-day free trial with full access to all features in the Professional plan."
                },
                {
                  question: "What kind of support is included?",
                  answer: "All plans include technical support, with priority support for Professional and dedicated support for Enterprise."
                }
              ].map((faq, index) => (
                <div key={index} className="group cursor-pointer">
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full font-medium">
            <Check className="h-5 w-5 mr-2" />
            30-day money-back guarantee • No questions asked
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;