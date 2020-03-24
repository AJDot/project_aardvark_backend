export default function (defaultTag: string = 'div') {
  return {
    props: {
      tag: {
        type: String,
        default: defaultTag,
      },
    },
  }
}
