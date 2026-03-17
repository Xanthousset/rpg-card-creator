import type {EditorToolbarItem} from "#ui/components/EditorToolbar.vue";

export const editorToolBarItems: EditorToolbarItem[][] = [
  // Text formatting
  [{
    kind: 'mark',
    mark: 'bold',
    icon: 'i-lucide-bold',
    tooltip: { text: 'Bold' }
  }, {
    kind: 'mark',
    mark: 'italic',
    icon: 'i-lucide-italic',
    tooltip: { text: 'Italic' }
  }, {
    kind: 'mark',
    mark: 'underline',
    icon: 'i-lucide-underline',
    tooltip: { text: 'Underline' }
  }, {
    kind: 'mark',
    mark: 'strike',
    icon: 'i-lucide-strikethrough',
    tooltip: { text: 'Strikethrough' }
  }],
  // Text alignment
  [{
    icon: 'i-lucide-align-justify',
    tooltip: {text: 'Text Align'},
    content: {
      align: 'end'
    },
    items: [{
      kind: 'textAlign',
      align: 'left',
      icon: 'i-lucide-align-left',
      label: 'Align Left'
    }, {
      kind: 'textAlign',
      align: 'center',
      icon: 'i-lucide-align-center',
      label: 'Align Center'
    }, {
      kind: 'textAlign',
      align: 'right',
      icon: 'i-lucide-align-right',
      label: 'Align Right'
    }, {
      kind: 'textAlign',
      align: 'justify',
      icon: 'i-lucide-align-justify',
      label: 'Align Justify'
    }],
  }],
]
