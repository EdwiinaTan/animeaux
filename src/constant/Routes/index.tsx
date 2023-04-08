export const PRIVATE_BASE = 'private'

export const ROUTES = {
  AUTH: {
    LOGIN: 'login',
  },
  PRIVATE: {
    ANIMAL: {
      name: 'animal',
      path: `${PRIVATE_BASE}/animal`,
    },
    ANIMAL_DETAILS: {
      name: 'animal_details',
      path: `${PRIVATE_BASE}/animal_details`,
    },
    HOST_FAMILY: {
      name: 'host_family',
      path: `${PRIVATE_BASE}/host_family`,
    },
    INFORMATION: {
      name: 'information',
      path: `${PRIVATE_BASE}/information`,
    },
    PROFILE: {
      name: 'profile',
      path: `${PRIVATE_BASE}/profile`,
    },
  },
}
