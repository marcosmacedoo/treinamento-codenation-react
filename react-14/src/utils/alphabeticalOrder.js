function alphabeticalOrder(contacts, filter) {
	return contacts.sort((contactA, contactB) => {
		if (contactA[filter] < contactB[filter]) return -1
		else if (contactA[filter] > contactB[filter]) return 1

		return 0
	})
}

export default alphabeticalOrder
