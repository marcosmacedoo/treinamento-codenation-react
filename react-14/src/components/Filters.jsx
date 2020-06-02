import React from 'react'

class Filters extends React.Component {
	render() {
		return (
			<div className="container" data-testid="filters">
				<section className="filters">
					<div className="filters__search">
						<input
							type="text"
							className="filters__search__input"
							placeholder="Pesquisar"
							value={this.props.contactNameToSearch}
							onChange={(event) =>
								this.props.handleContactNameToSearch(event.target.value)
							}
						/>

						<button className="filters__search__icon">
							<i className="fa fa-search" />
						</button>
					</div>

					<button
						className="filters__item is-selected"
						onClick={() => this.props.handleClickFilter('name')}
					>
						Nome <i className="fas fa-sort-down" />
					</button>

					<button
						className="filters__item"
						onClick={() => this.props.handleClickFilter('country')}
					>
						País <i className="fas fa-sort-down" />
					</button>

					<button
						className="filters__item"
						onClick={() => this.props.handleClickFilter('company')}
					>
						Empresa <i className="fas fa-sort-down" />
					</button>

					<button
						className="filters__item"
						onClick={() => this.props.handleClickFilter('department')}
					>
						Departamento <i className="fas fa-sort-down" />
					</button>

					<button
						className="filters__item"
						onClick={() => this.props.handleClickFilterAdmissionDate()}
					>
						Data de admissão <i className="fas fa-sort-down" />
					</button>
				</section>
			</div>
		)
	}
}

export default Filters
