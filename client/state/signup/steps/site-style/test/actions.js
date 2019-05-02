/** @format */

/**
 * Internal dependencies
 */
import { setSiteStyle, updateSiteMockupDisplayAction } from '../actions';
import {
	SIGNUP_STEPS_SITE_STYLE_SET,
	SIGNUP_STEPS_SITE_STYLE_UPDATE_PREVIEW,
} from 'state/action-types';

describe( 'setSiteStyle()', () => {
	test( 'should return the expected action object', () => {
		const siteStyle = 'humongous';

		expect( setSiteStyle( siteStyle ) ).toEqual( {
			type: SIGNUP_STEPS_SITE_STYLE_SET,
			siteStyle,
		} );
	} );
} );

describe( 'updateSiteMockupDisplayAction()', () => {
	test( 'should return the expected action object', () => {
		expect( updateSiteMockupDisplayAction() ).toEqual( {
			type: SIGNUP_STEPS_SITE_STYLE_UPDATE_PREVIEW,
		} );
	} );
} );
