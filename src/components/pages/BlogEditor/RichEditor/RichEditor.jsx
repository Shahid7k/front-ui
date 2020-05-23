import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html';
import { Editor } from 'react-draft-wysiwyg';
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import './RichEditor.css';

const toolbar = {
  options: [
    'inline',
    'blockType',
    'fontSize',
    'list',
    // 'link',
    'emoji',
    'image',
  ],
  inline: {
    inDropdown: false,
    options: ['bold', 'italic', 'underline', 'monospace'],
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote', 'Code'],
  },
  fontSize: {
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
  },
  list: {
    inDropdown: false,
    options: ['unordered', 'ordered'],
  },
  textAlign: {
    inDropdown: false,
    options: ['left', 'center'],
  },
  // link: {
  //   inDropdown: false,
  //   showOpenOptionOnHover: true,
  //   defaultTargetOption: '_blank',
  //   options: ['link'],
  //   linkCallback: undefined,
  // },
  emoji: {
    emojis: ['😀', '😁'],
  },
  image: {
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: false,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
};

const RichEditor = props => {
  const { initialBlogState, handleBlogContentChange, ...rest } = props;

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (initialBlogState.content) {
      const contentState = stateFromHTML(initialBlogState.content);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [initialBlogState]);

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const markup = draftToHtml(rawContentState);
    handleBlogContentChange(markup);
  };

  return (
    <Editor
      {...rest}
      editorState={editorState}
      placeholder='Explore your way in..'
      // wrapperClassName='wrapper-class'
      // editorClassName='editor-class'
      // toolbarClassName='toolbar-class'
      toolbar={toolbar}
      onEditorStateChange={onEditorStateChange}
    />
  );
};

RichEditor.defaultProps = {
  initialBlogState: { title: '', content: '' },
  readOnly: false,
  toolbarHidden: false,
};

export default RichEditor;
