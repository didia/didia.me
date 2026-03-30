const siteConfig = {
  image: '/cover.png',
  imageWidth: '800',
  imageHeight: '310',
  url: 'https://www.didia.me',
  title: 'Aristote Didia',
  subtitle:
    'Fractional CTO | ROI-Driven AI | Technology Cost Optimization',
  description:
    'Fractional CTO specialising in ROI-driven AI and technology cost optimisation. I help growing companies align technology investments with business outcomes and deliver measurable value.',
  copyright: '© All rights reserved.',
  disqusShortname: 'didia',
  postsPerPage: 4,
  googleAnalyticsId: 'G-386353207',
  menu: [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Services',
      path: '/#services',
    },
    {
      label: 'About',
      path: '/about/',
    },
    {
      label: 'Blog',
      path: '/blog/',
    },
    {
      label: 'Contact',
      path: '/contact/',
    },
  ],
  author: {
    name: 'Aristote Didia',
    photo: '/photo.jpg',
    bio: 'Fractional CTO specialising in ROI-driven AI and technology cost optimisation. I help growing companies align technology investments with business outcomes and deliver measurable value.',
    contacts: {
      email: 'aristote@didia.me',
      linkedin: 'diasonama',
      twitter: 'didia_aristote',
      github: 'didia',
      rss: 'https://www.didia.me/rss.xml',
    },
  },
} as const;

export default siteConfig;

export type SiteConfig = typeof siteConfig;
