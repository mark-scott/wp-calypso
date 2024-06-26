import { localizeUrl } from '@automattic/i18n-utils';
import { ReactNode } from 'react';
import type { BasicMetricsScored, Metrics, Scores } from 'calypso/data/site-profiler/types';
import type { I18N } from 'i18n-calypso';

type SubsetScores = Exclude< Scores, 'needs-improvement' >;

export type MetricsCopies = {
	[ score in SubsetScores ]: {
		diagnostic: string | ReactNode;
		solution: string | ReactNode;
		cta: string | ReactNode;
		url: string;
	};
};

type WpComNonWpCom = 'wpcom' | 'nonWpcom';

type CopiesProps = {
	title: string;
} & {
	[ key in WpComNonWpCom ]: MetricsCopies;
};

type CopiesReturnValue = {
	[ k in Metrics ]: CopiesProps;
};

export type CopiesReturnValueList = [ Metrics, CopiesProps ][];

export function getCopies(
	basicMetrics: BasicMetricsScored,
	translate: I18N[ 'translate' ],
	domain: string
): CopiesReturnValue {
	const migrateUrl = `/setup/hosted-site-migration?ref=site-profiler&from=${ domain }`;
	const supportUrl = localizeUrl( 'https://wordpress.com/support' );

	const cls: CopiesProps = {
		title: translate( 'Cumulative Layout Shift (CLS)' ),
		nonWpcom: {
			good: {
				diagnostic: translate(
					'Your site’s CLS is %(value)f, ensuring a stable layout. Excellent job maintaining low shifts!',
					{ args: { value: basicMetrics?.cls?.value } }
				),
				solution: translate(
					'Migrate to WordPress.com to maintain this stability and further enhance your site’s layout performance.'
				),
				cta: translate( 'Enhance stability' ),
				url: migrateUrl,
			},
			poor: {
				diagnostic: translate(
					'Your site’s CLS is %(value)f, higher than average, causing noticeable shifts. Aim for 0.1 for smoother layout.',
					{
						args: {
							value: basicMetrics?.cls?.value,
						},
					}
				),
				solution: translate(
					'Migrate to WordPress.com for tools to reduce CLS and stabilize your layout.'
				),
				cta: translate( 'Migrate for stability' ),
				url: migrateUrl,
			},
		},
		wpcom: {
			good: {
				diagnostic: translate(
					'Your site’s CLS is %(value)f, ensuring a stable layout. Great job maintaining low shifts.',
					{ args: { value: basicMetrics?.cls?.value } }
				),
				solution: translate(
					'Keep up the good work! Continue using best practices to maintain your site’s stability.'
				),
				cta: translate( 'Explore Advanced Tips' ),
				url: supportUrl,
			},
			poor: {
				diagnostic: translate(
					'Your site’s CLS is %(value)f, higher than average, causing noticeable shifts. Aim for 0.1 for smoother layout.',
					{ args: { value: basicMetrics?.cls?.value } }
				),
				solution: translate(
					'Connect with a Happiness Engineer to reduce CLS and ensure a more stable layout for your users.'
				),
				cta: translate( 'Improve layout stability' ),
				url: supportUrl,
			},
		},
	};

	const fid: CopiesProps = {
		title: translate( 'First Input Delay (FID)' ),
		nonWpcom: {
			good: {
				diagnostic: translate(
					'Your site’s FID is %(value)fms, offering quick response times. Excellent job maintaining fast interactions!',
					{ args: { value: basicMetrics?.fid?.value } }
				),
				solution: translate(
					'Migrate to WordPress.com to sustain this performance and further improve response times.'
				),
				cta: translate( 'Boost FID performance' ),
				url: migrateUrl,
			},
			poor: {
				diagnostic: translate(
					'Your site’s FID is %(value)fms, slower than most. Aim for less than 100ms for better responsiveness.',
					{
						args: {
							value: basicMetrics?.fid?.value,
						},
					}
				),
				solution: translate(
					'Migrate to WordPress.com for improved FID and faster user interactions.'
				),
				cta: translate( 'Experience Better FID' ),
				url: migrateUrl,
			},
		},
		wpcom: {
			good: {
				diagnostic: translate(
					'Your site’s FID is %(value)fms, offering quick response times. Excellent job on maintaining swift interactions!',
					{ args: { value: basicMetrics?.fid?.value } }
				),
				solution: translate(
					'Maintain this top-notch responsiveness by regularly optimizing your site for consistent performance.'
				),
				cta: translate( 'Keep layout stable' ),
				url: supportUrl,
			},
			poor: {
				diagnostic: translate(
					'Your site’s FID is %(value)fms, slower than most. Aim for less than 100ms for better responsiveness.',
					{ args: { value: basicMetrics?.fid?.value } }
				),
				solution: translate(
					'Connect with a Happiness Engineer to optimize FID and improve your site’s responsiveness'
				),
				cta: translate( 'Enhance responsiveness' ),
				url: supportUrl,
			},
		},
	};

	const fcp: CopiesProps = {
		title: translate( 'First Contentful Paint (FCP)' ),
		nonWpcom: {
			good: {
				diagnostic: translate(
					'Your site’s FCP is %(value)fms, providing a fast initial load. Great job on maintaining quick content display!',
					{ args: { value: basicMetrics?.fcp?.value } }
				),
				solution: translate(
					'Migrate to WordPress.com to sustain this speed and further enhance your initial content load times.'
				),
				cta: translate( 'Improve FCP speed' ),
				url: migrateUrl,
			},
			poor: {
				diagnostic: translate(
					'Your site’s FCP is %(value)fms, slower than average. Aim for under 2s to improve user experience.',
					{
						args: {
							value: basicMetrics?.fcp?.value,
						},
					}
				),
				solution: translate(
					'Migrate to WordPress.com for tools to reduce FCP and speed up content load.'
				),
				cta: translate( 'Boost Content Load' ),
				url: migrateUrl,
			},
		},
		wpcom: {
			good: {
				diagnostic: translate(
					'Your site’s FCP is %(value)fms, providing a fast initial load. Excellent job maintaining quick content delivery!',
					{ args: { value: basicMetrics?.fcp?.value } }
				),
				solution: translate(
					'Continue optimizing your content delivery to consistently maintain this fast load time and performance.'
				),
				cta: translate( 'Maintain fast responses' ),
				url: supportUrl,
			},
			poor: {
				diagnostic: translate(
					'Your site’s FCP is %(value)fms, slower than average. Aim for under 2s to improve user experience.',
					{ args: { value: basicMetrics?.fcp?.value } }
				),
				solution: translate(
					'Connect with a Happiness Engineer to reduce FCP and speed up initial content load.'
				),
				cta: translate( 'Speed up content load' ),
				url: supportUrl,
			},
		},
	};

	const lcp: CopiesProps = {
		title: translate( 'Largest Contentful Paint (LCP)' ),
		nonWpcom: {
			good: {
				diagnostic: translate(
					'Your site’s LCP is %(value)fms, loading main content quickly. Well done on maintaining fast load times!',
					{ args: { value: basicMetrics?.lcp?.value } }
				),
				solution: translate(
					'Migrate to WordPress.com to achieve even faster LCP and enhance your site’s overall performance.'
				),
				cta: translate( 'Optimize main load' ),
				url: migrateUrl,
			},
			poor: {
				diagnostic: translate(
					'Your site’s LCP is %(value)fms, slower than typical sites. Aim for under 2.5s for better performance.',
					{
						args: {
							value: basicMetrics?.lcp?.value,
						},
					}
				),
				solution: translate(
					'Migrate to WordPress.com for optimized LCP and faster main content load.'
				),
				cta: translate( 'Improve Main Load' ),
				url: migrateUrl,
			},
		},
		wpcom: {
			good: {
				diagnostic: translate(
					'Your site’s LCP is %(value)fms, loading main content quickly. Excellent job maintaining fast content display!',
					{ args: { value: basicMetrics?.lcp?.value } }
				),
				solution: translate(
					'Keep optimizing images and elements to consistently maintain swift load times and performance.'
				),
				cta: translate( 'Optimize further' ),
				url: supportUrl,
			},
			poor: {
				diagnostic: translate(
					'Your site’s LCP is %(value)fms, slower than typical sites. Aim for under 2.5s for better performance.',
					{ args: { value: basicMetrics?.lcp?.value } }
				),
				solution: translate(
					'Connect with a Happiness Engineer to optimize LCP and enhance main content load speed.'
				),
				cta: translate( 'Boost main content load' ),
				url: supportUrl,
			},
		},
	};

	const ttfb: CopiesProps = {
		title: translate( 'Time to First Byte (TTFB)' ),
		nonWpcom: {
			good: {
				diagnostic: translate(
					'Your site’s TTFB is %(value)fms, offering fast server response. Excellent job on maintaining quick response!',
					{ args: { value: basicMetrics?.ttfb?.value } }
				),
				solution: translate(
					'Migrate to WordPress.com to sustain this speed and further enhance your server response times.'
				),
				cta: translate( 'Enhance server speed' ),
				url: migrateUrl,
			},
			poor: {
				diagnostic: translate(
					'Your site’s TTFB is %(value)fms, longer than most sites. Aim for less than 600ms for better performance.',
					{
						args: {
							value: basicMetrics?.ttfb?.value,
						},
					}
				),
				solution: translate(
					'Migrate to WordPress.com for faster TTFB and improved server response.'
				),
				cta: translate( 'Enhance server speed' ),
				url: migrateUrl,
			},
		},
		wpcom: {
			good: {
				diagnostic: translate(
					'Your site’s TTFB is %(value)fms, offering fast server response. Excellent job on maintaining quick server performance!',
					{ args: { value: basicMetrics?.ttfb?.value } }
				),
				solution: translate(
					'Continue monitoring server performance to consistently maintain these quick response times and efficiency.'
				),
				cta: translate( 'Monitor performance' ),
				url: supportUrl,
			},
			poor: {
				diagnostic: translate(
					'Your site’s TTFB is %(value)fms, longer than most sites. Aim for less than 600ms for better performance.',
					{ args: { value: basicMetrics?.ttfb?.value } }
				),
				solution: translate(
					'Connect with a Happiness Engineer to reduce TTFB and improve server response time'
				),
				cta: translate( 'Enhance Server Response' ),
				url: supportUrl,
			},
		},
	};

	const inp: CopiesProps = {
		title: translate( 'Interaction to Next Paint (INP)' ),
		nonWpcom: {
			good: {
				diagnostic: translate(
					'Your site’s INP is %(value)fms, providing smooth interactions. Great job on maintaining quick responses!',
					{ args: { value: basicMetrics?.inp?.value } }
				),
				solution: translate(
					'Migrate to WordPress.com to sustain and further enhance your site’s interaction speed.'
				),
				cta: translate( 'Improve INP speed' ),
				url: migrateUrl,
			},
			poor: {
				diagnostic: translate(
					'Your site’s INP is %(value)fms, higher than average. Aim for less than 100ms for smoother interactions.',
					{
						args: {
							value: basicMetrics?.inp?.value,
						},
					}
				),
				solution: translate(
					'Migrate to WordPress.com for tools to optimize INP and interaction speed.'
				),
				cta: translate( 'Improve INP speed' ),
				url: migrateUrl,
			},
		},
		wpcom: {
			good: {
				diagnostic: translate(
					'Your site’s INP is %(value)fms, providing smooth interactions. Excellent performance, keep it up!',
					{ args: { value: basicMetrics?.inp?.value } }
				),
				solution: translate(
					'Keep refining interactive elements to sustain this high level of performance and user satisfaction.'
				),
				cta: translate( 'Refine interactions' ),
				url: supportUrl,
			},
			poor: {
				diagnostic: translate(
					'Your site’s INP is %(value)fms, higher than average. Aim for less than 100ms for smoother interactions.',
					{ args: { value: basicMetrics?.inp?.value } }
				),
				solution: translate(
					'Connect with a Happiness Engineer to optimize INP and improve interaction speed.'
				),
				cta: translate( 'Improve Interaction Speed' ),
				url: supportUrl,
			},
		},
	};

	// TODO: Add the rest of the metrics
	return {
		ttfb,
		fcp,
		lcp,
		inp,
		cls,
		fid,
	};
}
