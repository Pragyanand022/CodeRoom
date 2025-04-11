import React, { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { ACTIONS } from "../utils/Actions";

function Editor_panel({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);
  const editorContainerRef = useRef(null);

  useEffect(() => {
    if (!editorContainerRef.current) return;

    const startState = EditorState.create({
      doc: "",
      extensions: [
        basicSetup,
        javascript(),
        oneDark,
        keymap.of(defaultKeymap),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            const code = update.state.doc.toString();
            onCodeChange(code);
            socketRef.current?.emit(ACTIONS.CODE_CHANGE, { roomId, code });
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorContainerRef.current,
    });

    editorRef.current = view;

    return () => {
      view.destroy();
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const handler = ({ code }) => {
      if (editorRef.current) {
        editorRef.current.dispatch({
          changes: {
            from: 0,
            to: editorRef.current.state.doc.length,
            insert: code,
          },
        });
      }
    };

    socket.on(ACTIONS.CODE_CHANGE, handler);
    return () => socket.off(ACTIONS.CODE_CHANGE, handler);
  }, [socketRef.current]);

  return <div ref={editorContainerRef} style={{ height: "600px" }} />;
}

export default Editor_panel;
