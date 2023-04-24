export default function AdminChats({ data }: any) {
  return (
    <>
      {data?.map((message: any, index: number) => {
        return (
          <div key={index}>
            {!message.admin
              ? `User: ${message.text}`
              : `Admin: ${message.text}`}
            <br />
          </div>
        )
      })}
    </>
  )
}
