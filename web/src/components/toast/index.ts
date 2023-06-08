import { createVNode, render } from 'vue'
import toastTemplate from './toast.vue'
export interface IProps {
  color?: string
  msg?: string
  duration?: number
}

const Toast = ({ color, msg, duration = 3000 }: IProps) => {
  let timer = null
  const div = document.createElement('div')
  // root node
  const vNode = createVNode(toastTemplate, { msg, color })

  div.setAttribute('class', 'acg-toast__wrapper')
  render(vNode, div)

  const el = document.body.appendChild(div)

  timer = setTimeout(() => {
    return setTimeout(() => {
      // destroy
      document.body.removeChild(el)
    }, duration)
  })
}

export default Toast
