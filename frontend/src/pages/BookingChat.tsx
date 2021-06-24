import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../app";
import { getBooking } from "../app/bookingSlice";
import { getChat } from "../app/chatSlice";
import { getMessages, sendMessage } from "../app/messageSlice";
import Layout from "../components/layout/Layout";
import TheirMessage from "../components/ui/TheirMessage";
import YourMessage from "../components/ui/YourMessage";

const BookingChat: React.FC = () => {
  const params = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: RootState) => state.user);
  const { booking } = useSelector((state: RootState) => state.booking);
  const { chat } = useSelector((state: RootState) => state.chat);
  const { messages, sending } = useSelector(
    (state: RootState) => state.message
  );

  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (
    e:
      | React.KeyboardEventHandler<HTMLInputElement>
      | React.MouseEventHandler<HTMLButtonElement>
  ) => {
    if (e?.which === 13 || e._reactName === "onClick") {
      console.log("e", e._reactName);
      if (!message) {
        return;
      } else {
        dispatch(
          sendMessage({
            token: token as string,
            message,
            chatId: chat?._id as string,
          })
        );
        setMessage("");
      }
    }
  };

  useEffect(() => {
    if (params) {
      setBookingId(params?.id);
    }
  }, [params]);

  useEffect(() => {
    if (bookingId) {
      dispatch(getBooking({ token: token as string, id: bookingId }));
    }
  }, [bookingId]);

  useEffect(() => {
    if (booking) {
      dispatch(
        getChat({
          token: token as string,
          data: {
            users: `${booking?.user},${booking.consultant?.user?._id}`,
          },
        })
      );
    }
  }, [booking]);

  useEffect(() => {
    console.log("chat", chat);
    if (!sending && chat) {
      dispatch(
        getMessages({
          token: token as string,
          data: { chat: chat?._id as string },
        })
      );
    }
  }, [sending, chat]);

  return (
    <Layout>
      <div className="container flex-center">
        <div className="chat-window">
          <div className="message-container">
            {messages &&
              messages.map((message) => {
                if (message.sender === user?.id) {
                  return (
                    <div>
                      <div className="message-block">
                        <YourMessage message={message.message} />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <div className="message-block">
                        <TheirMessage message={message.message} />
                      </div>
                    </div>
                  );
                }
              })}
          </div>

          <div className="message-input-box">
            <input
              type="text"
              placeholder="Enter your message"
              className="message-input-box__input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleSubmit}
            />
            <button
              className="message-send-btn curpointer"
              onClick={handleSubmit}
            >
              send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingChat;
