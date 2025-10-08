# Address Book - React Project
#### Patterns
Component Composition

Lifting State Up

Controlled Components

List Rendering Pattern

Conditional Rendering

Separation of Concerns
#### Diagram
```mermaid
graph TD;
    App["App
    Root component
    Renders AddressBook"] 

    AddressBook["AddressBook
    State: contacts[], searchQuery, editingId
    Manages add, update, delete, filter contacts"] 

    AddressForm["AddressForm
    Props: onSubmit
    State: formData, errors
    Validates input fields"] 

    SearchBar["SearchBar
    Props: searchQuery, setSearchQuery
    Controls search input, no local state"] 

    AddressTable["AddressTable
    Props: contacts, onEdit, onUpdate, onDelete, editingId
    State: editData
    Manages inline editing and deletion"] 

    %% Root level
    App --> AddressBook

    %% AddressBook children
    AddressBook --> AddressForm
    AddressBook --> SearchBar
    AddressBook --> AddressTable

    %% Data flow
    AddressForm -.->|"onSubmit(contact)"| AddressBook
    SearchBar -.->|"setSearchQuery(value)"| AddressBook
    AddressTable -.->|"onEdit(id), onUpdate(id, updated), onDelete(id)"| AddressBook

    %% Visual cues
    AddressTable -->|Renders avatar, firstName, lastName, phone| AddressBook
