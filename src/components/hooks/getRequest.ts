const getRequest = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  let meals = [];

  for (const key in data) {
    meals.push({
      id: key,
      name: data[key].name,
      amount: 0,
      price: data[key].price,
      description: data[key].description,
    });
  }
  if (!response.ok) throw new Error("server is not responding!");
  return meals;
};
export default getRequest;
