import { Badge } from '@automattic/components';
import { Circle, SVG } from '@wordpress/components';
import { home, Icon, info } from '@wordpress/icons';
import { useI18n } from '@wordpress/react-i18n';
import classnames from 'classnames';
import { useTranslate } from 'i18n-calypso';
import FormattedHeader from 'calypso/components/formatted-header';
import { useCurrentRoute } from 'calypso/components/route';
import { resolveDomainStatus } from 'calypso/lib/domains';
import { type as DomainType } from 'calypso/lib/domains/constants';
import TransferConnectedDomainNudge from 'calypso/my-sites/domains/domain-management/components/transfer-connected-domain-nudge';
import { useDispatch } from 'calypso/state';
import type { SiteDetails } from '@automattic/data-stores';
import type { ResponseDomain } from 'calypso/lib/domains/types';
import type { Purchase } from 'calypso/lib/purchases/types';
import type { TranslateResult } from 'i18n-calypso';

import './style.scss';

type SettingsHeaderProps = {
	domain: ResponseDomain;
	site: SiteDetails;
	purchase: Purchase | null;
};

export default function SettingsHeader( { domain, site, purchase }: SettingsHeaderProps ) {
	const { __ } = useI18n();
	const translate = useTranslate();
	const dispatch = useDispatch();
	const { currentRoute } = useCurrentRoute();

	const renderCircle = () => (
		<SVG viewBox="0 0 24 24" height={ 8 } width={ 8 }>
			<Circle cx="12" cy="12" r="12" />
		</SVG>
	);

	const renderSuccessBadge = ( description: TranslateResult, icon?: JSX.Element ) => (
		<Badge className="settings-header__badge settings-header__badge--success">
			{ icon ? (
				<Icon icon={ icon } size={ 14 } />
			) : (
				<div className="settings-header__badge-indicator">{ renderCircle() }</div>
			) }
			{ description }
		</Badge>
	);

	const renderWarningBadge = ( description: TranslateResult ) => (
		<Badge className="settings-header__badge settings-header__badge--warning">
			<div className="settings-header__badge-indicator">{ renderCircle() }</div>
			{ description }
		</Badge>
	);

	const renderPremiumBadge = () => (
		<Badge className="settings-header__badge settings-header__badge--premium">
			{ __( 'Premium domain' ) }
			<Icon icon={ info } size={ 17 } />
		</Badge>
	);

	const renderNeutralBadge = ( description: TranslateResult ) => (
		<Badge className="settings-header__badge settings-header__badge--neutral">
			{ description }
		</Badge>
	);

	const renderDomainTypeBadge = ( type: string ) => {
		if ( type === DomainType.SITE_REDIRECT ) {
			return renderNeutralBadge( __( 'Site Redirect' ) );
		}

		if ( type === DomainType.MAPPED ) {
			return renderNeutralBadge( __( 'Registered with an external provider' ) );
		}

		return renderNeutralBadge( __( 'Domain Transfer' ) );
	};

	const renderStatusBadge = ( domain: ResponseDomain ) => {
		const { status, statusClass } = resolveDomainStatus( domain, null, translate, dispatch, {
			currentRoute,
		} );

		if ( status ) {
			return statusClass === 'status-success'
				? renderSuccessBadge( status )
				: renderWarningBadge( status );
		}
	};

	const renderBadges = () => {
		const showDomainType = [
			DomainType.SITE_REDIRECT,
			DomainType.MAPPED,
			DomainType.TRANSFER,
		].includes( domain.type );

		const showPrimary = domain.isPrimary && ! site.options?.is_domain_only;

		return (
			<div className="settings-header__container-badges">
				{ showDomainType && renderDomainTypeBadge( domain.type ) }
				{ renderStatusBadge( domain ) }
				{ showPrimary && renderSuccessBadge( __( 'Primary site address' ), home ) }
				{ domain.isPremium && renderPremiumBadge() }
			</div>
		);
	};

	const renderNotices = () => {
		const { noticeText, statusClass } = resolveDomainStatus(
			domain,
			purchase,
			translate,
			dispatch,
			{
				siteSlug: site.slug,
				getMappingErrors: true,
				currentRoute,
			}
		);

		if ( noticeText && statusClass ) {
			return (
				<div className="settings-header__domain-notice">
					<Icon
						icon={ info }
						size={ 18 }
						className={ classnames( 'settings-header__domain-notice-icon gridicon', {
							'gridicon--error settings-header__domain-notice-icon--rotated': [
								'status-error',
								'status-warning',
								'status-alert',
							].includes( statusClass ),
						} ) }
						viewBox="2 2 20 20"
					/>
					<div className="settings-header__domain-notice-message">{ noticeText }</div>
				</div>
			);
		}

		return null;
	};

	return (
		<div className="settings-header__container">
			<div className="settings-header__container-title">
				<FormattedHeader
					className="settings-header__title"
					headerText={ domain.name }
					align="left"
					hasScreenOptions={ false }
				/>
				{ renderBadges() }
			</div>
			{ renderNotices() }
			<TransferConnectedDomainNudge
				domain={ domain }
				location="domain_settings"
				siteSlug={ site.slug }
			/>
		</div>
	);
}
