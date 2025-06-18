import React from "react";
import { StyleSheet, View } from "react-native";
import useMessageStore from "~/store/toasts/messageStore";
import Message from "./Message";

const MessageHost: React.FC = () => {
  const type = useMessageStore((state) => state.type);
  const title = useMessageStore((state) => state.title);
  const message = useMessageStore((state) => state.message);
  const duration = useMessageStore((state) => state.duration);
  const hideMessage = useMessageStore((state) => state.hideMessage);

  if (!title || !message) return null;
  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <Message
        type={type}
        title={title}
        message={message}
        duration={duration}
        onClose={hideMessage}
      />
    </View>
  );
};

export default MessageHost;
