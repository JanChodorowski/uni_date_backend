import io from "socket.io-client";

export const socket = io(`http://localhost:${process.env.PORT || 8081}`, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
