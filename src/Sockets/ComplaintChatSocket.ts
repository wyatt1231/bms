import { Server, Socket } from "socket.io";
import SocketAuth from "../Middlewares/SocketAuth";
import { ComplaintChatModel } from "../Models/ComplaintModels";
import { UserClaims } from "../Models/UserModels";

export let chat_room: Array<ComplaintChatModel> = [];

const SOCKET_NAMESPACE = "/socket/complaint/chat";

const findRoom = (complaint_pk: string | number) => {
  const found_room_index = chat_room.findIndex((room) => {
    return room.room == complaint_pk;
  });
  return found_room_index;
};

const ComplaintChatSocket = (io: Server) => {
  io.of(SOCKET_NAMESPACE)
    .use(SocketAuth)
    .on("connection", (socket: Socket & UserClaims) => {
      const socket_id = socket.id;
      const user_pk = socket.user_pk;

      socket.on("disconnect", () => {
        const chat_room_temp = [...chat_room];
        let found_room_index: number;
        let found_room_user_index: number;

        for (let i = 0; i < chat_room_temp.length; i++) {
          const curr_room = chat_room_temp[i];
          for (let x = 0; x < curr_room.con.length; x++) {
            if (curr_room.con[x]?.socket_id === socket_id) {
              found_room_index = i;
              found_room_user_index = x;
            }
          }
        }

        if (found_room_index >= 0) {
          const found_room_data = chat_room_temp[found_room_index];

          if (found_room_data?.con?.length > 0) {
            // const new_room = chat_room_temp[found_room_index].con.splice(
            //   found_room_user_index
            // );

            io.of(SOCKET_NAMESPACE)
              .to(chat_room_temp[found_room_index].room)
              .emit("updateRoom", chat_room_temp[found_room_index].con);
          } else {
            io.of(SOCKET_NAMESPACE)
              .to(chat_room_temp[found_room_index].room)
              .emit("updateRoom", []);
            chat_room_temp.splice(found_room_index, 1);
          }
          chat_room = chat_room_temp;
        }
      });

      socket.on("joinRoom", (complaint_pk: string) => {
        socket.join(complaint_pk);
        const found_room_index = findRoom(complaint_pk);
        if (found_room_index != -1) {
          const found_room_user_index = chat_room[
            found_room_index
          ].con.findIndex((userRoom) => userRoom.user_pk === user_pk);

          if (found_room_user_index === -1) {
            chat_room[found_room_index].con = [
              ...chat_room[found_room_index].con,
              {
                socket_id: socket_id,
                user_pk: user_pk,
              },
            ];
          }
        } else {
          chat_room.push({
            room: complaint_pk,
            con: [
              {
                socket_id: socket_id,
                user_pk: user_pk,
              },
            ],
          });
        }

        const updated_found_room = findRoom(complaint_pk);

        if (updated_found_room >= 0) {
          io.of(SOCKET_NAMESPACE)
            .to(chat_room[updated_found_room].room)
            .emit("updateRoom", chat_room[updated_found_room].con);
        }
      });

      socket.on("sendMessage", (complaint_pk: string) => {
        io.of(SOCKET_NAMESPACE).to(complaint_pk).emit("allMessage");
      });
    });
};

export default ComplaintChatSocket;
