import { Popover, Button } from '@wordpress/components';
import { info } from '@wordpress/icons';
import clsx from 'clsx';
import { FunctionComponent, useState } from 'react';
import * as React from 'react';

import './style.scss';

interface Props {
	children: React.ReactNode;
	className?: string;
	id?: string;
	position?:
		| 'top left'
		| 'top right'
		| 'top center'
		| 'middle left'
		| 'middle right'
		| 'middle center'
		| 'bottom left'
		| 'bottom right'
		| 'bottom center';
	noArrow?: boolean;
}

const InfoTooltip: FunctionComponent< Props > = ( {
	children,
	className,
	id,
	position = 'bottom center',
	noArrow = true,
} ) => {
	const [ showTooltip, setShowTooltip ] = useState< boolean >( false );
	const handleClick = ( event: React.MouseEvent< HTMLButtonElement, MouseEvent > ): void => {
		setShowTooltip( ! showTooltip );
		// when the info tooltip inside a button, we don't want clicking it to propagate up
		event.stopPropagation();
	};
	const handleClose = () => {
		setShowTooltip( false );
	};

	return (
		<Button
			icon={ info }
			onClick={ handleClick }
			className="info-tooltip"
			data-testid="info-tooltip"
		>
			{ showTooltip && (
				<Popover
					id={ id }
					className={ clsx( 'info-tooltip__content', className ) }
					onClose={ handleClose }
					position={ position }
					noArrow={ noArrow }
				>
					{ children }
				</Popover>
			) }
		</Button>
	);
};

export default InfoTooltip;
