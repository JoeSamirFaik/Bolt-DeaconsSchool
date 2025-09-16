export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
}

export const AttendanceStatusLabels = {
  [AttendanceStatus.PRESENT]: 'حاضر',
  [AttendanceStatus.ABSENT]: 'غائب',
  [AttendanceStatus.LATE]: 'متأخر',
};