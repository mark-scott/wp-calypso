import { shuffle } from '@automattic/js-utils';
import { ReactElement, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Plugin } from 'calypso/my-sites/plugins/categories';
import { useCategories } from 'calypso/my-sites/plugins/categories/use-categories';
import { useGetCategoryUrl } from 'calypso/my-sites/plugins/categories/use-get-category-url';
import PluginsBrowserList from 'calypso/my-sites/plugins/plugins-browser-list';
import { PluginsBrowserListVariant } from 'calypso/my-sites/plugins/plugins-browser-list/types';
import isSiteAutomatedTransfer from 'calypso/state/selectors/is-site-automated-transfer';
import { isJetpackSite } from 'calypso/state/sites/selectors';
import { getSelectedSiteId } from 'calypso/state/ui/selectors';

export default function CollectionListView( {
	category,
	siteSlug,
	sites,
}: {
	category: 'monetization' | 'business' | 'onlinestore';
	siteSlug: string;
	sites: any;
} ): ReactElement | null {
	const siteId = useSelector( getSelectedSiteId );
	const isJetpack = useSelector( ( state ) => isJetpackSite( state, siteId ) );
	const isAtomic = useSelector( ( state ) => isSiteAutomatedTransfer( state, siteId ) );
	const isJetpackSelfHosted = isJetpack && ! isAtomic;

	const getCategoryUrl = useGetCategoryUrl();
	const categories = useCategories( [ category ] );

	const plugins = useRef< Array< Plugin > >();
	useEffect( () => {
		plugins.current = shuffle( categories[ category ].preview.slice( 0, 6 ) );
	}, [ categories, category ] );

	if ( isJetpackSelfHosted ) {
		return null;
	}

	return (
		<PluginsBrowserList
			listName={ 'collection-' + category }
			plugins={ plugins.current || [] }
			size={ plugins.current?.length }
			title={ categories[ category ].title }
			subtitle={ categories[ category ].description }
			site={ siteSlug }
			currentSites={ sites }
			variant={ PluginsBrowserListVariant.Fixed }
			browseAllLink={ getCategoryUrl( category ) }
			showPlaceholders={ false }
			resultCount={ false }
			search={ '' }
			extended={ false }
		/>
	);
}
