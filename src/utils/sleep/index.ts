export const sleep = (duration: number): Promise<'awake'> => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('awake');
    }, duration);
  }));
