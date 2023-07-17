import React, { useRef, useEffect } from "react";

import { basicSetup, EditorView } from "codemirror";
import { EditorState, Compartment } from "@codemirror/state";
import { keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { java } from "@codemirror/lang-java";
import { useDispatch } from "react-redux";

const CodeEditor = ({ editable, mouseUpHandler, text, updateText }) => {
  const dispatch = useDispatch();
  const editableCompartment = new Compartment();

  const editor = useRef();
  const valueRef = useRef(text);

  useEffect(() => {
    valueRef.current = text;
  }, [text]);

  useEffect(() => {
    if (text) {
      // CodeMirror Extension: update code in store
      const onUpdate = EditorView.updateListener.of((update) => {
        dispatch(updateText(update.state.doc.toString()));
      });

      const codeMirrorOptions = {
        doc: valueRef.current,
        lineNumbers: true,
        lineWrapping: true,
        width: "300px",
        autoCloseBrackets: true,
        cursorScrollMargin: 48,
        indentUnit: 2,
        tabSize: 2,
        styleActiveLine: true,
        viewportMargin: 99,
        extensions: [
          basicSetup,
          keymap.of(defaultKeymap),
          python(),
          javascript(),
          java(),
          onUpdate,
          editableCompartment.of(EditorView.editable.of(editable)),
        ],
      };

      const startState = EditorState.create(codeMirrorOptions);

      const view = new EditorView({
        state: startState,
        parent: editor.current,
      });

      return () => {
        view.destroy();
      };
    }
  }, []);

  return (
    <div
      ref={editor}
      onMouseUp={(e) => (mouseUpHandler ? mouseUpHandler(e) : null)}
    />
  );
};

export default CodeEditor;
