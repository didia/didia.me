const getContactHref = (name: string, contact: string): string => {
  switch (name) {
    case 'twitter':
      return `https://www.twitter.com/${contact}`;
    case 'github':
      return `https://github.com/${contact}`;
    case 'linkedin':
      return `https://www.linkedin.com/in/${contact}`;
    case 'email':
      return `mailto:${contact}`;
    default:
      return contact;
  }
};

export default getContactHref;
