/** @format */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

/**
 * Internal dependencies
 */

import SidebarRegion from './region';

export default class extends React.Component {
	static displayName = 'Sidebar';

	static propTypes = {
		className: PropTypes.string,
		hasSidebar: PropTypes.bool,
		onClick: PropTypes.func,
	};

	render() {
		const hasRegions = React.Children.toArray( this.props.children ).some(
			el => el.type === SidebarRegion
		);

		const sidebarClass =
			'undefined' === typeof this.props.hasSidebar || this.props.hasSidebar ? 'sidebar' : '';

		return (
			<ul
				className={ classNames( sidebarClass, this.props.className, {
					'has-regions': hasRegions,
				} ) }
				onClick={ this.props.onClick }
				data-tip-target="sidebar"
			>
				{ this.props.children }
			</ul>
		);
	}
}
