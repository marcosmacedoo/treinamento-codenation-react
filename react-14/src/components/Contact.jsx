import React from 'react'

import dayjs from 'dayjs'

class Contact extends React.Component {
	render() {
		return (
			<article className="contact" data-testid="contact">
				<span className="contact__avatar" data-testid="contact-avatar">
					<img src={this.props.data.avatar} alt={this.props.data.name} />
				</span>
				<span className="contact__data" data-testid="contact-name">
					{this.props.data.name}
				</span>
				<span className="contact__data" data-testid="contact-phone">
					{this.props.data.phone}
				</span>
				<span className="contact__data" data-testid="contact-country">
					{this.props.data.country}
				</span>
				<span className="contact__data" data-testid="contact-date">
					{dayjs(this.props.data.admissionDate).format('DD/MM/YYYY')}
				</span>
				<span className="contact__data" data-testid="contact-company">
					{this.props.data.company}
				</span>
				<span className="contact__data" data-testid="contact-department">
					{this.props.data.department}
				</span>
			</article>
		)
	}
}

export default Contact
