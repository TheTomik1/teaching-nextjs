export function MessagesList({ messages }: { messages: { name: string; description: string; price: number }[] }) {
  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index}>
          {message.name} {message.description} {message.price}
        </li>
      ))}
    </ul>
  )
}
