/**
 * External dependencies
 */
import { memoize } from 'lodash';

/**
 *
 * @param {string} address An address formatted onto separate lines
 * @return {string} Get rid of the last line of the address.
 */
export const formatAddress = memoize( ( address = '' ) =>
	address
		.split( '\n' )
		.slice( 0, 2 )
		.join( ', ' )
);
