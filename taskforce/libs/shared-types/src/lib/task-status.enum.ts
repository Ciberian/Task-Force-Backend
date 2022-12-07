export let TaskStatus: {
  New: 'New',
  Cancelled: 'Cancelled',
  AtWork: 'AtWork',
  Completed: 'Completed',
  Failed: 'Failed'
};

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus]
