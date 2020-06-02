import React from 'react'

import dayjs from 'dayjs'

import api from './services/api'
import filterContactsByName from './utils/filterContactsByName'
import alphabeticalOrder from './utils/alphabeticalOrder'
import dateAdmissionOrder from './utils/dateAdmissionOrder'

import { ReactComponent as LogoSvg } from './assets/img/logo.svg'
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
			<React.Fragment data-testid="app">
				<header className="topbar" data-testid="topbar">
					<div className="container">
						<a href="/" className="topbar__logo">
							<LogoSvg alt="Logo Instagram" />
						</a>
					</div>
				</header>

				<div className="container" data-testid="filters">
					<section className="filters">
						<div className="filters__search">
							<input
								type="text"
								className="filters__search__input"
								placeholder="Pesquisar"
								value={this.state.contactNameToSearch}
								onChange={(event) =>
									this.handleContactNameToSearch(event.target.value)
								}
							/>

							<button className="filters__search__icon">
								<i className="fa fa-search" />
							</button>
						</div>

						<button
							className="filters__item is-selected"
							onClick={() => this.handleClickFilter('name')}
						>
							Nome <i className="fas fa-sort-down" />
						</button>

						<button
							className="filters__item"
							onClick={() => this.handleClickFilter('country')}
						>
							País <i className="fas fa-sort-down" />
						</button>

						<button
							className="filters__item"
							onClick={() => this.handleClickFilter('company')}
						>
							Empresa <i className="fas fa-sort-down" />
						</button>

						<button
							className="filters__item"
							onClick={() => this.handleClickFilter('department')}
						>
							Departamento <i className="fas fa-sort-down" />
						</button>

						<button
							className="filters__item"
							onClick={() => this.handleClickFilterAdmissionDate()}
						>
							Data de admissão <i className="fas fa-sort-down" />
						</button>
					</section>
				</div>

				<div className="container" data-testid="contacts">
					<section className="contacts">
						<article className="contact">
							<span className="contact__avatar" />
							<span className="contact__data">Nome</span>
							<span className="contact__data">Telefone</span>
							<span className="contact__data">País</span>
							<span className="contact__data">Admissão</span>
							<span className="contact__data">Empresa</span>
							<span className="contact__data">Departamento</span>
						</article>
						{this.state.contactsList.map((contact) => (
							<article className="contact" key={contact.id}>
								<span className="contact__avatar">
									<img src={contact.avatar} alt={contact.name} />
								</span>
								<span className="contact__data">{contact.name}</span>
								<span className="contact__data">{contact.phone}</span>
								<span className="contact__data">{contact.country}</span>
								<span className="contact__data">
									{dayjs(contact.admissionDate).format('DD/MM/YYYY')}
								</span>
								<span className="contact__data">{contact.company}</span>
								<span className="contact__data">{contact.department}</span>
							</article>
						))}
					</section>
				</div>
			</React.Fragment>
		)
	}
}

export default App
