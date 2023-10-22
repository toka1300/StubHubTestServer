const parseEventInfo = (data) => {
  const jsonMatch = data.match(/<script id="index-data" type="application\/json">\s*(.*?)\s*<\/script>/);
  if (!jsonMatch || jsonMatch.length < 2) return;
  const jsonData = jsonMatch[1];
  const parsedJson = JSON.parse(jsonData);
  const eventObject = {
    name: parsedJson.eventName,
    url: parsedJson.header.profileUrl.url,
    venue: parsedJson.venueName,
    date: parsedJson.formattedEventDateTime,
    minPrice: Math.round(parsedJson.grid.minPrice),
    id: parsedJson.eventId,
  };
  return eventObject
}

const fetchData = async () => {
  try {
    const url = `https://www.stubhub.ca/event/151779214/?quantity=1`;
    const response = await fetch(url);
    const data = await response.text();
    const priceObject = parseEventInfo(data);
    return priceObject
  } catch (e) {
    console.log('Error:', e);
  }
}

const getResults = async () => {
  const results = await fetchData();
  console.log(results);
}

getResults();