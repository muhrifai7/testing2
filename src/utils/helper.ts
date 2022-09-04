import axios from "axios";

type SuccesResponse = {
  status: number;
  data: string;
};

export const upload_file = (
  image_name: string,
  path: string,
  base64: string
): any => {
  const url = "http://159.223.52.250/hris/";
  const data = JSON.stringify({
    image_name: `${image_name}`,
    path: `${path}`,
    base64: `${base64}`,
  });

  const config = {
    method: "post",
    headers: {
      Authorization: "Basic c2VjcmV0LWtlcmlzLWh1c2FkYTo=",
      "Content-Type": "application/json",
    },
    data,
  };

  async function callAPi() {
    try {
      // 👇️ const data: GetUsersResponse
      const { data } = await axios.get<SuccesResponse>(url, config);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          status: 400,
          message: "An unexpected error occurred",
        };
      } else {
        return {
          status: 400,
          message: "An unexpected error occurred",
        };
      }
    }
  }
  const result = callAPi();
  return result;
};
