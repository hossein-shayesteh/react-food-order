import { UserConfirmOrderDataType } from "../store/Types";
const postRequest = async (url: string, data: UserConfirmOrderDataType) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Can not connect to server!");
};
export default postRequest;
