const skipFields = (data: any) => {
  const { updated_at, created_at, ...rest } = data;
  console.log(updated_at);
  console.log(created_at);
  return { ...rest };
};

export default skipFields;
