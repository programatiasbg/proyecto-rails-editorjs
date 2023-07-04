import { Controller } from "@hotwired/stimulus"
import EditorJS from "@editorjs/editorjs"
// Herramientas adicionales a especificar - Plugins
import Paragraph from "@editorjs/paragraph"
import Header from "@editorjs/header"
import List from "@editorjs/list"
import CodeTool from "@editorjs/code"

// Connects to data-controller="editor"
export default class extends Controller {
  static targets = ["article_content"]
  connect() {
    // console.log("edirorjs...", this.element)

    // Obtener el contenido inicial una vez
    const initialContent = this.getInitialContent()

    this.contentEditor = new EditorJS({
      // Holder is the target element
      holder: this.article_contentTarget,
      data: initialContent,
      // si deseamos herramientas opcionales, las declaramos aquí
      tools: {
        header: {
          class: Header,
          config: {
            defaultLevel: 3,
            placeholder: "Escriba el título",
          },
        },
        list: {
          class: List,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
          config: {
            placeholder: "Un texto debes poner",
          },
        },
        code: CodeTool,
      },
    })

    this.element.addEventListener("submit", this.saveEditorData.bind(this))
  }

  getInitialContent() {
    const hiddenContentField = document.getElementById("article_content_hidden")

    if (hiddenContentField && hiddenContentField.value) {
      return JSON.parse(hiddenContentField.value)
    }

    return {}
  }

  async saveEditorData(event) {
    event.preventDefault()
    const outputData = await this.contentEditor.save()
    const articleForm = this.element
    const hiddenInput = document.getElementById("article_content_hidden")
    hiddenInput.value = JSON.stringify(outputData)

    articleForm.submit()
  }
}
