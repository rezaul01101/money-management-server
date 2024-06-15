const USER_ROLE = {
    superAdmin: 'superAdmin',
    user: 'user'
  } as const;
export type TUserRole = keyof typeof USER_ROLE;