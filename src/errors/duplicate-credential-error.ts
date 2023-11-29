import { ApplicationError } from '@/protocols';

export function DuplicatedCredentialError(): ApplicationError {
  return {
    name: 'DuplicatedCredentialError',
    message: 'There is already a credential with this title',
  };
}
