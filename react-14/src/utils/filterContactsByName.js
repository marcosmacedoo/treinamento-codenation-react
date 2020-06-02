function filterContactsByName(contacts, name) {
	if (name.length === 0) {
		return contacts
	}

	return contacts.filter((contact) => contact.name.toLowerCase().includes(name))
}

export default filterContactsByName
