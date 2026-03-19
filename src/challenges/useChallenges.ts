import { useContext } from 'react';

import { ChallengesContext } from './ChallengesContext';

export const useChallenges = () => {
  const challengesContext = useContext(ChallengesContext);

  if (!challengesContext) {
    throw new Error('useChallenges must be used within a ChallengesProvider.');
  }

  return challengesContext;
};
