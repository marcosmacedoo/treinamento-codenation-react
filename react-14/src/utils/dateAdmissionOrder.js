import dayjs from 'dayjs'

function dateAdmissionOrder(contacts) {
	return contacts.sort((contactA, contactB) => {
		const differenceBetweenDates = dayjs(contactA.admissionDate).diff(
			contactB.admissionDate,
			'millisecond'
		)

		if (differenceBetweenDates > 0) return 1
		else if (differenceBetweenDates < 0) return -1

		return 0
	})
}

export default dateAdmissionOrder
