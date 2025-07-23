import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { useComplaints } from './ComplaintsContext';
import { auth } from '../firebase';

const categories = [
  { label: 'Water Leakage', value: 'Water Leakage' },
  { label: 'Electricity Issue', value: 'Electricity Issue' },
  { label: 'Sanitation / Garbage', value: 'Sanitation / Garbage' },
  { label: 'Security Concern', value: 'Security Concern' },
  { label: 'Lift Problem', value: 'Lift Problem' },
  { label: 'Noise Disturbance', value: 'Noise Disturbance' },
  { label: 'Maintenance / Repair', value: 'Maintenance / Repair' },
  { label: 'Others', value: 'Others' },
];

const priorities = [
  { label: 'Low', value: 'Low' },
  { label: 'Medium', value: 'Medium' },
  { label: 'High', value: 'High' },
];

const statesWithCities = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Tawang', 'Pasighat', 'Ziro'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
  'Haryana': ['Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar'],
  'Himachal Pradesh': ['Shimla', 'Mandi', 'Solan', 'Dharamshala', 'Una'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar'],
  'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam'],
  'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane'],
  'Manipur': ['Imphal', 'Thoubal', 'Bishnupur', 'Churachandpur', 'Kakching'],
  'Meghalaya': ['Shillong', 'Tura', 'Nongpoh', 'Jowai', 'Baghmara'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Champhai', 'Serchhip', 'Kolasib'],
  'Nagaland': ['Dimapur', 'Kohima', 'Mokokchung', 'Tuensang', 'Wokha'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur'],
  'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer'],
  'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing', 'Mangan', 'Rangpo'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
  'Tripura': ['Agartala', 'Udaipur', 'Dharmanagar', 'Kailasahar', 'Ambassa'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol'],
};

const stateOptions = Object.keys(statesWithCities).map(state => ({ label: state, value: state }));

const FileComplaint = () => {
  const { addComplaint, userId, loading } = useComplaints();
  const loggedInEmail = auth.currentUser ? auth.currentUser.email : '';

  const [form, setForm] = useState({
    name: '',
    flat: '',
    email: '',
    city: '',
    state: '',
    area: '',
    category: '',
    title: '',
    description: '',
    priority: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (userId && loggedInEmail) {
      setForm(prev => ({ ...prev, email: loggedInEmail }));
    }
  }, [userId, loggedInEmail]);

  if (loading) return null;
  if (!userId) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8">
        <div className="w-full max-w-xl bg-white rounded shadow-xl text-center py-16 px-4">
          <h2 className="text-2xl font-bold mb-6">File a Complaint</h2>
          <div className="text-gray-600 text-lg">Please log in to file a complaint.</div>
        </div>
      </div>
    );
  }

  const cityOptions = form.state
    ? statesWithCities[form.state].map(city => ({ label: city, value: city }))
    : [];

  const handleChange = (e, name) => {
    if (name === 'state') {
      setForm({ ...form, state: e.target ? e.target.value : e.value, city: '' });
    } else {
      setForm({ ...form, [name]: e.target ? e.target.value : e.value });
    }
    setError('');
  };

  const validate = () => {
    if (!form.name || !form.flat || !form.city || !form.state || !form.area || !form.category || !form.title || !form.description || !form.priority) {
      setError('Please fill in all required fields.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    addComplaint(form);
    setSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 pt-20 pb-8">
      <Card className="w-full max-w-2xl shadow-2xl border border-blue-100 bg-white min-h-[700px] pt-12">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-1 tracking-tight">File a New Complaint</h2>
          <p className="text-gray-500 text-base">Please fill in the details below to submit your complaint.</p>
        </div>
        {submitted ? (
          <div className="text-green-700 bg-green-50 border border-green-200 rounded-lg text-center text-lg font-semibold py-8 my-8 shadow-sm">
            <i className="pi pi-check-circle text-2xl mr-2 align-middle" />
            Complaint submitted successfully!
          </div>
        ) : (
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* User Details */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-2">
              <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center"><i className="pi pi-user-edit mr-2" />Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <span className="p-float-label">
                  <InputText id="name" value={form.name} onChange={(e) => handleChange(e, 'name')} className="w-full focus:ring-2 focus:ring-blue-400" />
                  <label htmlFor="name">Name</label>
                </span>
                <span className="p-float-label">
                  <InputText id="flat" value={form.flat} onChange={(e) => handleChange(e, 'flat')} className="w-full focus:ring-2 focus:ring-blue-400" />
                  <label htmlFor="flat">Flat/Apartment</label>
                </span>
                <span className="p-float-label">
                  <InputText id="email" value={form.email} readOnly className="w-full bg-gray-100 cursor-not-allowed" />
                  <label htmlFor="email">Email</label>
                </span>
              </div>
            </div>

            {/* Location Details */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-2">
              <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center"><i className="pi pi-map-marker mr-2" />Location</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <span className="p-float-label">
                  <Dropdown id="state" value={form.state} options={stateOptions} onChange={(e) => handleChange(e, 'state')} className="w-full focus:ring-2 focus:ring-blue-400" placeholder="Select State" />
                  <label htmlFor="state">State*</label>
                </span>
                <span className="p-float-label">
                  <Dropdown id="city" value={form.city} options={cityOptions} onChange={(e) => handleChange(e, 'city')} className="w-full focus:ring-2 focus:ring-blue-400" placeholder={form.state ? 'Select City' : 'Select State First'} disabled={!form.state} />
                  <label htmlFor="city">City*</label>
                </span>
                <span className="p-float-label">
                  <InputText id="area" value={form.area} onChange={(e) => handleChange(e, 'area')} className="w-full focus:ring-2 focus:ring-blue-400" />
                  <label htmlFor="area">Area / Locality / Society*</label>
                </span>
              </div>
            </div>

            {/* Category, Title, Description */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-2">
              <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center"><i className="pi pi-list mr-2" />Complaint Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <span className="p-float-label">
                  <Dropdown id="category" value={form.category} options={categories} onChange={(e) => handleChange(e, 'category')} className="w-full focus:ring-2 focus:ring-blue-400" placeholder="Select Category" />
                  <label htmlFor="category">Category*</label>
                </span>
                <span className="p-float-label">
                  <Dropdown id="priority" value={form.priority} options={priorities} onChange={(e) => handleChange(e, 'priority')} className="w-full focus:ring-2 focus:ring-blue-400" placeholder="Select Priority" />
                  <label htmlFor="priority">Urgency / Priority*</label>
                </span>
              </div>
              <span className="p-float-label mt-4 block">
                <InputText id="title" value={form.title} onChange={(e) => handleChange(e, 'title')} className="w-full focus:ring-2 focus:ring-blue-400" />
                <label htmlFor="title">Complaint Title*</label>
              </span>
              <span className="p-float-label mt-4 block">
                <InputTextarea id="description" value={form.description} onChange={(e) => handleChange(e, 'description')} rows={4} className="w-full focus:ring-2 focus:ring-blue-400" />
                <label htmlFor="description">Complaint Description*</label>
              </span>
            </div>

            {error && <div className="text-red-700 bg-red-50 border border-red-200 rounded-lg text-center text-base py-2 shadow-sm">{error}</div>}

            <Button type="submit" label="Submit Complaint" className="w-full bg-blue-600 border-0 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md text-lg" />
          </form>
        )}
      </Card>
    </div>
  );
};

export default FileComplaint;
