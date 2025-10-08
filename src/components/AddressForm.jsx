import { useState } from 'react';

function AddressForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState(initialData || { firstName: '', lastName: '', phone: '' });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    if (!formData.phone.trim()) newErrors.phone = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      setFormData({ firstName: '', lastName: '', phone: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-3xl shadow-xl flex flex-col md:flex-row gap-4 items-end border border-gray-700"
    >
      <div className="flex-1">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-2xl bg-gray-800 text-gray-100 border ${errors.firstName ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-2xl bg-gray-800 text-gray-100 border ${errors.lastName ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full px-4 py-2 rounded-2xl bg-gray-800 text-gray-100 border ${errors.phone ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        />
      </div>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-2xl transition-all shadow-md">
        Add
      </button>
    </form>
  );
}

export default AddressForm;
