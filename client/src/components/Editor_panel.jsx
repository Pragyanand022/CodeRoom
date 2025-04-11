import React, { useEffect, useRef } from "react";
import { ACTIONS } from "../utils/Actions";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorState } from "@codemirror/state";

function Editor_panel({ socketRef, roomId, onCodeChange }) {
	const editorRef = useRef(null);
	const isRemoteUpdate = useRef(false); // Flag to prevent re-emitting remote updates

	useEffect(() => {
		if (!editorRef.current) {
			const view = new EditorView({
				state: EditorState.create({
					doc: "",
					extensions: [
						basicSetup,
						javascript(),
						oneDark,
						EditorView.updateListener.of((update) => {
							if (update.docChanged) {
								const code = update.state.doc.toString();

								// Avoid emitting if this was from a remote update
								if (!isRemoteUpdate.current) {
									socketRef.current.emit(ACTIONS.CODE_CHANGE, {
										roomId,
										code,
									});
								}

								isRemoteUpdate.current = false;

								// Send code to parent
								onCodeChange(code);
							}
						}),
					],
				}),
				parent: document.getElementById("realTimeEditor"),
			});

			editorRef.current = view;
		}
	}, []);

	useEffect(() => {
		const socket = socketRef.current;
		if (!socket) return;

		const applyRemoteCode = ({ code }) => {
			if (editorRef.current) {
				isRemoteUpdate.current = true;
				editorRef.current.dispatch({
					changes: {
						from: 0,
						to: editorRef.current.state.doc.length,
						insert: code,
					},
				});
			}
		};

		socket.on(ACTIONS.CODE_CHANGE, applyRemoteCode);
		socket.on(ACTIONS.SYNC_CODE, applyRemoteCode);

		return () => {
			socket.off(ACTIONS.CODE_CHANGE, applyRemoteCode);
			socket.off(ACTIONS.SYNC_CODE, applyRemoteCode);
		};
	}, [socketRef.current]);

	return (
		<div className="h-full overflow-y-auto">
			<div id="realTimeEditor" className="h-full min-h-full text-xl"></div>
		</div>
	);
}

export default Editor_panel;
