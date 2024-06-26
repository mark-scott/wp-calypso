import page from '@automattic/calypso-router';
import { __ } from '@wordpress/i18n';
import ActionPanel from 'calypso/components/action-panel';
import HeaderCake from 'calypso/components/header-cake';
import { useSelector } from 'calypso/state';
import { getSelectedSiteId, getSelectedSiteSlug } from 'calypso/state/ui/selectors';
import { PageShell } from '../components/page-shell';
import { useCodeDeploymentsQuery } from '../deployments/use-code-deployments-query';
import { indexPage } from '../routes';
import { GitHubDeploymentCreationForm } from './deployment-creation-form';

export const GitHubDeploymentCreation = () => {
	const siteId = useSelector( getSelectedSiteId );
	const siteSlug = useSelector( getSelectedSiteSlug );

	const { data } = useCodeDeploymentsQuery( siteId! );

	const goToDeployments = () => page( indexPage( siteSlug! ) );

	return (
		<PageShell pageTitle={ __( 'Connect GitHub repository' ) }>
			<HeaderCake
				onClick={ data?.length ? goToDeployments : undefined }
				isCompact
				backIcon="chevron-left"
			>
				<h1>{ __( 'Connect repository' ) }</h1>
			</HeaderCake>
			<ActionPanel>
				<GitHubDeploymentCreationForm onConnected={ goToDeployments } />
			</ActionPanel>
		</PageShell>
	);
};
