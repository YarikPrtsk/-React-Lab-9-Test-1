import { useState } from 'react';

function AddressTable({ contacts, onEdit, onUpdate, onDelete, editingId }) {
  const [editData, setEditData] = useState({});

  const handleEdit = (contact) => {
    onEdit(contact.id);
    setEditData(contact);
  };

  const handleSave = (id) => {
    if (editData.firstName && editData.lastName && editData.phone) {
      onUpdate(id, editData);
      setEditData({});
    }
  };

  const handleCancel = () => {
    onEdit(null);
    setEditData({});
  };

  const handleChange = (field, value) => setEditData(prev => ({ ...prev, [field]: value }));

  if (!contacts.length)
    return <div className="text-center py-12 text-gray-400 font-medium">No contacts found</div>;

  return (
    <div className="overflow-x-auto rounded-3xl shadow-xl bg-gray-900 border border-gray-700 p-4">
      <table className="min-w-full divide-y divide-gray-700 rounded-2xl">
        <thead className="bg-gray-800 rounded-2xl">
          <tr>
            {['Avatar', 'First Name', 'Last Name', 'Phone', 'Actions'].map(col => (
              <th
                key={col}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {contacts.map((c, i) => (
            <tr
              key={c.id}
              className={`transition-colors ${
                i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
              } hover:bg-gray-700/50 rounded-lg`}
            >
              <td className="px-6 py-3">
  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center border border-gray-600">
    <span className="text-gray-400 text-lg">👤</span>
  </div>
</td>

              <td className="px-6 py-3">
                {editingId === c.id ? (
                  <input
                    className="w-full px-2 py-1 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                  />
                ) : (
                  c.firstName
                )}
              </td>
              <td className="px-6 py-3">
                {editingId === c.id ? (
                  <input
                    className="w-full px-2 py-1 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                  />
                ) : (
                  c.lastName
                )}
              </td>
              <td className="px-6 py-3 font-mono">
                {editingId === c.id ? (
                  <input
                    className="w-full px-2 py-1 rounded-xl bg-gray-800 text-gray-100 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={editData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                  />
                ) : (
                  c.phone
                )}
              </td>

              <td className="px-6 py-3 flex gap-2">
                {editingId === c.id ? (
                  <>
                    <button
                      onClick={() => handleSave(c.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-2xl text-sm transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-2xl text-sm transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-2xl text-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(c.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-2xl text-sm transition"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddressTable;
