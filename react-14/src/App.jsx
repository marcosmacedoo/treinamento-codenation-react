import React from 'react'

import Topbar from './components/Topbar'
import Filters from './components/Filters'
import Contacts from './components/Contacts'
import api from './services/api'
import filterContactsByName from './utils/filterContactsByName'
import alphabeticalOrder from './utils/alphabeticalOrder'
import dateAdmissionOrder from './utils/dateAdmissionOrder'

import './App.scss'

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			contactsApi: [],
			contactsList: [],
			contactNameToSearch: '',
		}
	}

	async componentDidMount() {
		const responseApi = await fetch(api.baseUrl)
			.then((resp) => resp.json())
			.catch((resp) => resp)

		this.setState({
			contactsApi: responseApi,
			contactsList: responseApi,
		})
	}

	handleContactNameToSearch = (value) => {
		const filteredContacts = filterContactsByName(
			this.state.contactsApi,
			value.toLowerCase() || ''
		)

		this.setState({
			contactsList: filteredContacts,
			contactNameToSearch: value,
		})
	}

	handleClickFilter = (filter) => {
		const contactsList = alphabeticalOrder(this.state.contactsList, filter)

		this.setState({ contactsList })
	}

	handleClickFilterAdmissionDate = () => {
		const contactsList = dateAdmissionOrder(this.state.contactsList)

		this.setState({ contactsList })
	}

	render() {
		return (
			<div className="app" data-testid="app">
				<Topbar />
				<Filters
					contactNameToSearch={this.state.contactNameToSearch}
					handleContactNameToSearch={this.handleContactNameToSearch}
					handleClickFilter={this.handleClickFilter}
					handleClickFilterAdmissionDate={this.handleClickFilterAdmissionDate}
				/>
				<Contacts contacts={this.state.contactsList} />
			</div>
		)
	}
}

export default App
