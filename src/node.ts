import type { NodeAttributes } from './types'

export default class Node {
  constructor(
    props: { name?: string; data?: string },
    selectors: string[],
    parent: Node | null,
    attributes: NodeAttributes
  ) {
    this.parent = parent
    this.attributes = attributes
    this.children = null
    this.siblings = null
    this.selectors = selectors
    this.name = props.name
    this.data = props.data
  }

  data?: string
  name?: string
  parent: Node | null
  children: Node[] | null
  siblings: Node[] | null
  attributes?: NodeAttributes
  selectors: string[]
}
