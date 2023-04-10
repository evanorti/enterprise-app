export enum Path {
  Landing = '/',
  Dashboard = '/dashboard',
  Daos = '/daos',
  CreateDao = '/dao/create',
  Settings = '/settings',
}

export const getDaoPath = (address: string) => `/dao/${address}`;