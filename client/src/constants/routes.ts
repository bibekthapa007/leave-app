import { createRoute } from 'utils/route';

import paths from './paths';

export default {
  home: createRoute([paths.home]),
  signup: createRoute([paths.signup]),
  signin: createRoute([paths.signin]),
  leave: createRoute([paths.leave]),
  applyleave: createRoute([paths.leave, paths.apply]),
  editLeave(id: number) {
    createRoute([paths.leave, id.toString()]);
  },
} as const;
