const BASE_URL = 'https://reqres.in/api/';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface CustomHookPropType {
  url: string;
  method: HttpMethod; // Add the method property to specify the HTTP method
  data?: {};
}

export const fetchData = async ({ url, method, data }: CustomHookPropType): Promise<any> => {
  try {
    const requestOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json', // You can add more headers if needed
      },
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      // requestOptions.body = data;
      requestOptions.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${url}`, requestOptions);

    // if (!response.ok) {
    //   // return await response.json()
    //   throw new Error(`${response}: ${response.statusText}`);
    // }
    return await response.json();
  } catch (e) {
    console.log('Error ', e);
    return null;
  }
};
