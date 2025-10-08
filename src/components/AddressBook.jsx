import { useState } from 'react';
import AddressForm from './AddressForm';
import AddressTable from './AddressTable';
import SearchBar from './SearchBar';

function AddressBook() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addContact = (contact) => {
    // додаємо дефолтний аватар
    const newContact = { ...contact, id: Date.now(), avatar: 'https://i.pravatar.cc/40' };
    setContacts([...contacts, newContact]);
  };

  const updateContact = (id, updated) => {
    setContacts(contacts.map(c => c.id === id ? { ...updated, id, avatar: c.avatar || 'https://i.pravatar.cc/40' } : c));
    setEditingId(null);
  };

  const deleteContact = (id) => setContacts(contacts.filter(c => c.id !== id));

  const filteredContacts = contacts.filter(c =>
    c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold border-b border-gray-700 pb-2 flex items-center gap-3">
          <span className="text-indigo-500 text-4xl">👤</span>
          Address Book
        </h1>

        <AddressForm onSubmit={addContact} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <AddressTable
          contacts={filteredContacts}
          onEdit={setEditingId}
          onUpdate={updateContact}
          onDelete={deleteContact}
          editingId={editingId}
        />
      </div>
    </div>
  );
}

export default AddressBook;
