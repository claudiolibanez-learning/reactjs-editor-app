import React, { useRef, useMemo } from "react";
import RNCodeEditor, { TextareaCodeEditorProps } from '@uiw/react-textarea-code-editor';

import "./CodeEditor.styles.css";

type CodeEditorProps = TextareaCodeEditorProps & {
  minNumOfLines?: number;
};

export function CodeEditor({ minNumOfLines = 1, value = "", ...rest }: CodeEditorProps) {
  const lineCounterRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const lineCount = useMemo(() => value.toString().split("\n").length, [value]);

  const linesArr = useMemo(
    () =>
      Array.from(
        { length: Math.max(minNumOfLines, lineCount) },
        (_, i) => i + 1,
      ),
    [minNumOfLines, lineCount],
  );

  const handleTextareaScroll = () => {
    if (lineCounterRef.current && textAreaRef.current) {
      lineCounterRef.current.scrollTop = textAreaRef.current.scrollTop;
    }
  };

  return (
    <div className="editor-container">
      <div ref={lineCounterRef} className="editor-line-numbers">
        {linesArr.map((item, index) => (
          <div key={`${item}-${index + 1}`} className="editor-number">{item}</div>
        ))}
      </div>
      <div className="editor-content">
        <RNCodeEditor
          ref={textAreaRef}
          value={value}
          onScroll={handleTextareaScroll}
          className="editor-code-editor"
          {...rest}
        />
      </div>
    </div>
  );
}