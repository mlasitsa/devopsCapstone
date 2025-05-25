'use client';

import { useState } from 'react';
import { UserPost } from '@/types';

const ItemForm = ({onClose} : {onClose: () => void }) => {
  const [formData, setFormData] = useState<UserPost>(
    {
        name: '',
        lastname: '',
        title: '',
        description: '',
        image: '',
        readingTime: '',
        date: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log(formData)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted form data:', formData);
    
    const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      alert(data.message); 
      onClose()
  };

  return (
    <div className="inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4">Create New Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="First Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
          <input
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            rows={3}
            required
          />
          <input
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
          <input
            name="readingTime"
            placeholder="Reading Time (mins)"
            value={formData.readingTime}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}; export default ItemForm;
 