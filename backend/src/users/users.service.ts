import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly mockUsers = [
    {
      id: '1',
      email: 'deacon1@deacons.com',
      firstName: 'أحمد',
      lastName: 'محمد',
      role: 'deacon',
      stage: 'ابتدائي',
      level: '2',
      isActive: true,
      createdAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      email: 'deacon2@deacons.com',
      firstName: 'فاطمة',
      lastName: 'أحمد',
      role: 'deacon',
      stage: 'إعدادي',
      level: '1',
      isActive: true,
      createdAt: '2024-01-20T10:00:00Z',
    },
    {
      id: '3',
      email: 'servant@deacons.com',
      firstName: 'مريم',
      lastName: 'يوسف',
      role: 'servant',
      isActive: true,
      createdAt: '2024-01-10T10:00:00Z',
    },
    {
      id: '4',
      email: 'parent@deacons.com',
      firstName: 'سارة',
      lastName: 'علي',
      role: 'parent',
      isActive: true,
      createdAt: '2024-01-12T10:00:00Z',
    },
    {
      id: '5',
      email: 'admin@deacons.com',
      firstName: 'محمد',
      lastName: 'أحمد',
      role: 'admin',
      isActive: true,
      createdAt: '2024-01-01T10:00:00Z',
    },
  ];

  findAll() {
    return this.mockUsers;
  }

  findByRole(role: string) {
    return this.mockUsers.filter(user => user.role === role);
  }

  findOne(id: string) {
    return this.mockUsers.find(user => user.id === id);
  }

  getProfile() {
    return this.mockUsers[0]; // Return first user as demo profile
  }
}