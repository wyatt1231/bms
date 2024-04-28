export const CalculateBmi = (weight: number, height: number) => {
  const bmi = weight / (height * height);

  if (isNaN(bmi)) {
    return null;
  } else {
    return bmi.toFixed(4);
  }
};
