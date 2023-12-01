import { ApplicationError } from "protocols";

export function ForbiddenError(): ApplicationError {
  return {
    name: 'ForbiddenError',
    message: 'Access denied. You do not have permission to access this resource.',
  };
}
