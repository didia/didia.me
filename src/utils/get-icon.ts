import { ICONS } from '../constants';

const getIcon = (name: string) => {
  switch (name) {
    case 'twitter':
      return ICONS.TWITTER;
    case 'github':
      return ICONS.GITHUB;
    case 'telegram':
      return ICONS.TELEGRAM;
    case 'email':
      return ICONS.EMAIL;
    case 'rss':
      return ICONS.RSS;
    case 'linkedin':
      return ICONS.LINKEDIN;
    default:
      return { viewBox: '0 0 0 0', path: '' };
  }
};

export default getIcon;
