type Props = {
  children: any
  onClick: any
}

export function Button(props: Props) {
  return (
    <button onClick={props.onClick} className="bg-slate hover:bg-slate-300 active:bg-slate-400 hover:scale-105">
      {props.children}
    </button>
  )
}
