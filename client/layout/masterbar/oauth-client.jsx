import { Gridicon } from '@automattic/components';
import { localizeUrl } from '@automattic/i18n-utils';
import PropTypes from 'prop-types';
import A4ALogo from 'calypso/a8c-for-agencies/components/a4a-logo';
import JetpackLogo from 'calypso/components/jetpack-logo';
import {
	isCrowdsignalOAuth2Client,
	isWooOAuth2Client,
	isJetpackCloudOAuth2Client,
	isA4AOAuth2Client,
	isBlazeProOAuth2Client,
} from 'calypso/lib/oauth2-clients';
import BlazeProOauthMasterbar from './blaze-pro';
import CrowdsignalOauthMasterbar from './crowdsignal';
import WooOauthMasterbar from './woo';

import './oauth-client.scss';

const clientLogo = ( oauth2Client ) => {
	if ( isJetpackCloudOAuth2Client( oauth2Client ) ) {
		return <JetpackLogo full monochrome={ false } size={ 28 } />;
	} else if ( isA4AOAuth2Client( oauth2Client ) ) {
		return <A4ALogo full className="a4a-logo" size={ 28 } />;
	}
	return oauth2Client.icon && <img src={ oauth2Client.icon } alt={ oauth2Client.title } />;
};

const DefaultOauthClientMasterbar = ( { oauth2Client } ) => (
	<header className="masterbar masterbar__oauth-client">
		<nav>
			<ul className="masterbar__oauth-client-main-nav">
				<li className="masterbar__oauth-client-current">
					<div className="masterbar__oauth-client-logo">{ clientLogo( oauth2Client ) }</div>
				</li>

				{ isWooOAuth2Client( oauth2Client ) && (
					<li className="masterbar__oauth-client-close">
						<a href="https://woocommerce.com">
							Cancel <span>X</span>
						</a>
					</li>
				) }

				{ ! isWooOAuth2Client( oauth2Client ) &&
					! isJetpackCloudOAuth2Client( oauth2Client ) &&
					! isA4AOAuth2Client( oauth2Client ) && (
						<li className="masterbar__oauth-client-wpcc-sign-in">
							<a
								href={ localizeUrl( 'https://wordpress.com/' ) }
								className="masterbar__oauth-client-wpcom"
								target="_self"
							>
								<Gridicon icon="my-sites" size={ 24 } />
								WordPress.com
							</a>
						</li>
					) }
			</ul>
		</nav>
	</header>
);

const OauthClientMasterbar = ( { oauth2Client } ) => {
	if ( isCrowdsignalOAuth2Client( oauth2Client ) ) {
		return <CrowdsignalOauthMasterbar oauth2Client={ oauth2Client } />;
	}

	if ( isWooOAuth2Client( oauth2Client ) ) {
		return <WooOauthMasterbar />;
	}

	if ( isBlazeProOAuth2Client( oauth2Client ) ) {
		return <BlazeProOauthMasterbar />;
	}

	return <DefaultOauthClientMasterbar oauth2Client={ oauth2Client } />;
};

OauthClientMasterbar.displayName = 'OauthClientMasterbar';
OauthClientMasterbar.propTypes = {
	oauth2Client: PropTypes.object,
};

export default OauthClientMasterbar;
