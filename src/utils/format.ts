const convertFirebaseDateToJSDate = (
  firebaseDate:
    | {
        seconds: number;
        nanoseconds: number;
      }
    | undefined
): Date | undefined => {
  if (firebaseDate) {
    return new Date(firebaseDate.seconds * 1000);
  }
  return undefined;
};

export { convertFirebaseDateToJSDate };
