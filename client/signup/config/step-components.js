/**
 * External dependencies
 */
import React from 'react';
import { get, memoize } from 'lodash';

const stepNameToFilenameMap = {
	about: 'about',
	'clone-start': 'clone-start',
	'clone-destination': 'clone-destination',
	'clone-credentials': 'clone-credentials',
	'clone-point': 'clone-point',
	'clone-jetpack': 'clone-jetpack',
	'clone-ready': 'clone-ready',
	'clone-cloning': 'clone-cloning',
	'creds-confirm': 'creds-confirm',
	'creds-complete': 'creds-complete',
	'creds-permission': 'creds-permission',
	domains: 'domains',
	'domains-store': 'domains',
	'domain-only': 'domains',
	'domains-theme-preselected': 'domains',
	'domains-launch': 'domains',
	'from-url': 'import-url',
	launch: 'launch-site',
	plans: 'plans',
	'plans-launch': 'plans',
	'plans-personal': 'plans',
	'plans-premium': 'plans',
	'plans-business': 'plans',
	'plans-store-nux': 'plans-atomic-store',
	'plans-site-selected': 'plans-without-free',
	site: 'site',
	'rebrand-cities-welcome': 'rebrand-cities-welcome',
	'rewind-migrate': 'rewind-migrate',
	'rewind-were-backing': 'rewind-were-backing',
	'rewind-add-creds': 'rewind-add-creds',
	'rewind-form-creds': 'rewind-form-creds',
	'site-or-domain': 'site-or-domain',
	'site-picker': 'site-picker',
	'site-style': 'site-style',
	'site-title': 'site-title',
	'site-title-without-domains': 'site-title',
	'site-topic': 'site-topic',
	'site-type': 'site-type',
	survey: 'survey',
	'survey-user': 'survey-user',
	test: 'test-step',
	themes: 'theme-selection',
	'website-themes': 'theme-selection',
	'blog-themes': 'theme-selection',
	'themes-site-selected': 'theme-selection',
	user: 'user',
	'oauth2-user': 'user',
	'oauth2-name': 'user',
	displayname: 'user',
	'reader-landing': 'reader-landing',
	'site-style-with-preview': 'site-style',
	'site-topic-with-preview': 'site-topic',
	'domains-with-preview': 'domains',
	'site-title-with-preview': 'site-title',
};

export const asyncLoadStep = stepName =>
	import(
		/* webpackChunkName: "async-load-signup-steps-[request]", webpackInclude: /signup\/steps\/[a-z-]+\/index.jsx$/ */ `signup/steps/${ stepName }`
	);

const loadStepComponent = memoize( stepName => React.lazy( () => asyncLoadStep( stepName ) ) );

export const getStepComponent = stepName =>
	loadStepComponent( get( stepNameToFilenameMap, stepName /* , someFallback? */ ) );
