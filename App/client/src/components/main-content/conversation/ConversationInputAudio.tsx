import React, { useState, useRef } from "react";

interface ConversationInputAudioProps {
  audioInput:
    | ((audioBlob: Blob) => void)
    | ((event: React.MouseEvent<HTMLButtonElement>) => void);
}

const handleStartRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/wav",
      });
      onSendAudio(audioBlob);
      audioChunksRef.current = [];
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setIsRecording(true);
  } catch (error) {
    console.error("Error accessing microphone:", error);
  }
};
