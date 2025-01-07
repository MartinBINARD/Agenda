import axios from "axios";

export const createEvent = async (event) => {
  const response = await axios.post(
    process.env.EXPO_PUBLIC_API_URL + "events.json",
    event
  )
  
  return response.data.name;
}

export const getAllEvents = async () => {
  const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + "events.json");

  const events = [];
  for(const key in response.data) {
    const event = {
      id: key,
      ...response.data[key]
    }
    events.push(event);
  }
  
  return events;
};

export const updateEvent = async ({ id, ...event }) => {
  const response = await axios.patch(
    process.env.EXPO_PUBLIC_API_URL + `events/${id}.json`,
    event
  );

  return response.data;
}