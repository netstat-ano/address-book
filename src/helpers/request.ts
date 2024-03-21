import type { Events } from "@/enums/Events";

export const request = (
  { event, data }: { event: Events; data?: any },
  callback?: (response: any) => void
) => {
  const messageChannel = new MessageChannel();
  messageChannel.port1.onmessage = (response) => {
    if (callback) {
      callback(response);
    }
  };

  window.navigator!.serviceWorker!.controller!.postMessage(
    {
      type: event,
      data: data ? JSON.parse(JSON.stringify(data)) : null,
    },
    [messageChannel.port2]
  );
};
