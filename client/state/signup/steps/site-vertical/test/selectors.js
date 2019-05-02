/** @format */

/**
 * External dependencies
 */
import { omit } from 'lodash';

/**
 * Internal dependencies
 */
import {
	getSiteVerticalId,
	getSiteVerticalName,
	getSiteVerticalSlug,
	getSiteVerticalIsUserInput,
	getSiteVerticalPreview,
	getSiteVerticalPreviewIframeContent,
	getSiteVerticalPreviewLastShown,
	getSiteVerticalPreviewTagline,
	getSiteVerticalParentId,
} from '../selectors';
import { translate } from 'i18n-calypso';

describe( 'selectors', () => {
	const verticals = {
		felice: [
			{ verticalName: 'felice', preview: '<!--gutenberg-besties-forever <p>Fist bump!</p>-->' },
		],
	};

	const state = {
		signup: {
			siteMockupShown: 12345678,
			steps: {
				siteInformation: {
					address: '1604 Wherever Ln',
					phone: '555-4444',
					title: 'Whatever you want it to be',
				},
				siteVertical: {
					id: 'p4u',
					name: 'felice',
					slug: 'happy',
					isUserInput: false,
					parentId: 'gluecklich',
				},
			},
			verticals,
		},
	};

	describe( 'getSiteVerticalName', () => {
		test( 'should return empty string as a default state', () => {
			expect( getSiteVerticalName( {} ) ).toEqual( '' );
		} );

		test( 'should return site vertical from the state', () => {
			expect( getSiteVerticalName( state ) ).toEqual( state.signup.steps.siteVertical.name );
		} );
	} );
	describe( 'getSiteVerticalSlug', () => {
		test( 'should return empty string as a default state', () => {
			expect( getSiteVerticalSlug( {} ) ).toEqual( '' );
		} );

		test( 'should return site vertical from the state', () => {
			expect( getSiteVerticalSlug( state ) ).toEqual( state.signup.steps.siteVertical.slug );
		} );
	} );
	describe( 'getSiteVerticalIsUserInput', () => {
		test( 'should return true as a default state', () => {
			expect( getSiteVerticalIsUserInput( {} ) ).toBe( true );
		} );

		test( 'should return site vertical from the state', () => {
			expect( getSiteVerticalIsUserInput( state ) ).toEqual(
				state.signup.steps.siteVertical.isUserInput
			);
		} );
	} );
	describe( 'getSiteVerticalPreview', () => {
		test( 'should return empty string as a default state', () => {
			expect( getSiteVerticalPreview( {} ) ).toBe( '' );
		} );

		test( 'should return site vertical from the state', () => {
			expect( getSiteVerticalPreview( state ) ).toEqual( verticals.felice[ 0 ].preview );
		} );
	} );
	describe( '', () => {
		test( 'should return empty string as a default state', () => {
			expect( getSiteVerticalId( {} ) ).toBe( '' );
		} );

		test( 'should return site id from the state', () => {
			expect( getSiteVerticalId( state ) ).toEqual( state.signup.steps.siteVertical.id );
		} );
	} );
	describe( 'getSiteVerticalParentId', () => {
		test( 'should return empty string as a default state', () => {
			expect( getSiteVerticalParentId( {} ) ).toBe( '' );
		} );

		test( 'should return site id from the state', () => {
			expect( getSiteVerticalParentId( state ) ).toEqual(
				state.signup.steps.siteVertical.parentId
			);
		} );
	} );
	describe( 'getSiteVerticalPreviewLastShown', () => {
		test( 'should return on null on empty', () => {
			expect( getSiteVerticalPreviewLastShown() ).toBe( null );
		} );
		test( 'should return on null on null', () => {
			expect( getSiteVerticalPreviewLastShown( omit( state, 'signup.siteMockupShown' ) ) ).toBe(
				null
			);
		} );
		test( 'should return signup.siteMockupShown value', () => {
			expect( getSiteVerticalPreviewLastShown( state ) ).toBe( 12345678 );
		} );
	} );
	describe( 'getSiteVerticalPreviewTagline', () => {
		test( 'should return default value on empty', () => {
			expect( getSiteVerticalPreviewTagline() ).toEqual(
				translate( 'You’ll be able to customize this to your needs.' )
			);
		} );
		test( 'should return address with address and no phone', () => {
			expect(
				getSiteVerticalPreviewTagline( omit( state, 'signup.steps.siteInformation.phone' ) )
			).toEqual( '1604 Wherever Ln' );
		} );
		test( 'should return phone with phone and no address', () => {
			expect(
				getSiteVerticalPreviewTagline( omit( state, 'signup.steps.siteInformation.address' ) )
			).toEqual( '555-4444' );
		} );
		test( 'should return both with address & phone', () => {
			expect( getSiteVerticalPreviewTagline( state ) ).toEqual(
				'1604 Wherever Ln &middot; 555-4444'
			);
		} );
	} );
	describe( 'getSiteVerticalPreviewIframeContent', () => {
		test( 'should return empty object on empty', () => {
			expect( getSiteVerticalPreviewIframeContent() ).toEqual( {} );
		} );
		test( 'should return populated object on valid state', () => {
			expect( getSiteVerticalPreviewIframeContent( state ) ).toEqual( {
				body: '<!--gutenberg-besties-forever <p>Fist bump!</p>-->',
				tagline: '1604 Wherever Ln &middot; 555-4444',
				title: 'Whatever you want it to be',
			} );
		} );
	} );
} );
