import { adjectives, nouns } from './data/usernameTemplates';

export const generateRandomUsername = (): string => {
  let username = '';

  username += adjectives[Math.floor(Math.random() * adjectives.length)];
  username += nouns[Math.floor(Math.random() * nouns.length)];
  username += Math.floor(Math.random() * 100);

  return username;
};
