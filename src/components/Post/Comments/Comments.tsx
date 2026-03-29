'use client';

import { DiscussionEmbed } from 'disqus-react';
import siteConfig from '@/lib/config';

interface CommentsProps {
  postSlug: string;
  postTitle: string;
}

const Comments = ({ postSlug, postTitle }: CommentsProps) => {
  const { url, disqusShortname } = siteConfig;

  if (!disqusShortname) return null;

  return (
    <DiscussionEmbed
      shortname={disqusShortname}
      config={{
        url: `${url}${postSlug}`,
        identifier: postTitle,
        title: postTitle,
      }}
    />
  );
};

export default Comments;
