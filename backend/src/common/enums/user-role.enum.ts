export enum UserRole {
  DEACON = 'deacon',
  SERVANT = 'servant',
  PARENT = 'parent',
  ADMIN = 'admin',
}

export const UserRoleLabels = {
  [UserRole.DEACON]: 'شماس',
  [UserRole.SERVANT]: 'خادم',
  [UserRole.PARENT]: 'ولي أمر',
  [UserRole.ADMIN]: 'مدير',
};