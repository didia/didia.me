'use client';

import { useEffect } from 'react';

const FollowButtons = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <a
        href="https://twitter.com/didia_aristote?ref_src=twsrc%5Etfw"
        className="twitter-follow-button"
        data-size="large"
        data-show-count="false"
      >
        Follow @didia_aristote
      </a>
    </div>
  );
};

export default FollowButtons;
