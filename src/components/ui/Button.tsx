type Props = any

export function Button(props: Props) {
  const { children, ...restProps } = props

  return <button {...restProps}>{children}</button>
}
