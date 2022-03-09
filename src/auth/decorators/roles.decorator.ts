import { SetMetadata } from '@nestjs/common';

import { Role } from '../models/roles.model';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: Array<Role>) => SetMetadata(ROLES_KEY, roles);

/* Agrega la metadata de roles a las peticiones para despues ser evaluadas por un guardian */
