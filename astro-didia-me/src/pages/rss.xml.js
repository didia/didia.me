import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { siteConfig } from '../config';

export async function GET(context) {
	const posts = await getCollection('blog', ({ data }) => {
		return data.draft !== true;
	});
	
	const sortedPosts = posts.sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf()
	);
	
	return rss({
		title: siteConfig.title,
		description: siteConfig.subtitle,
		site: context.site,
		items: sortedPosts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.date,
			description: post.data.description,
			link: `/${post.slug}/`,
		})),
	});
}
