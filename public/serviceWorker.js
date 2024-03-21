let id = 1;
let addresses = [];
addEventListener("message", (event) => {
  const { data: request } = event;
  switch (request.type) {
    case "create_address":
      request.data.id = id;
      id++;
      addresses.push(request.data);
      break;
    case "get_addresses":
      event.ports[0].postMessage({ addresses });
      break;
    case "update_address":
      const address = addresses.find(
        (searchAddress) => searchAddress.id === request.data.id
      );
      Object.assign(address, { ...request.data });
      break;
    case "delete_address":
      addresses = addresses.filter(
        (searchAddress) => searchAddress.id !== request.data.id
      );
      break;
  }
});
self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});
