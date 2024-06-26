import { Card, Gridicon } from '@automattic/components';
import { localize } from 'i18n-calypso';
import PropTypes from 'prop-types';
import { Component } from 'react';
import StatsTabs from '../stats-tabs';
import StatsTab from '../stats-tabs/tab';

class StatsOverviewPlaceholder extends Component {
	static displayName = 'StatsOverviewPlaceholder';

	static propTypes = {
		insights: PropTypes.bool,
	};

	render() {
		let icon;

		if ( ! this.props.insights ) {
			icon = (
				<div className="module-header__site-icon">
					{ /* eslint-disable-next-line jsx-a11y/alt-text */ }
					<img width="24" height="24" />
				</div>
			);
		}

		return (
			<Card className="stats-module is-loading">
				<div className="module-header">
					<h3 className="module-header-title">
						{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
						<a href="#" className="module-header__link">
							{ icon }
							<span className="module-header__right-icon">
								<Gridicon icon="stats" />
							</span>
							<span>{ this.props.translate( 'Loading Stats' ) }</span>
						</a>
					</h3>
				</div>

				<StatsTabs>
					<StatsTab
						isLoading
						gridicon="visible"
						label={ this.props.translate( 'Views', { context: 'noun' } ) }
						value={ null }
					/>
					<StatsTab
						isLoading
						gridicon="user"
						label={ this.props.translate( 'Visitors', { context: 'noun' } ) }
						value={ null }
					/>
					<StatsTab
						isLoading
						gridicon="star"
						label={ this.props.translate( 'Likes', { context: 'noun' } ) }
						value={ null }
					/>
					<StatsTab
						isLoading
						gridicon="comment"
						label={ this.props.translate( 'Comments', { context: 'noun' } ) }
						value={ null }
					/>
				</StatsTabs>
			</Card>
		);
	}
}

export default localize( StatsOverviewPlaceholder );
