export const Days = ({
  created,
}: {
  created: string
}) => {
  const today = new Date()
  const posted = new Date(created)
  const diff = today.getTime() - posted.getTime()
  const days = Math.round(diff / (1000 * 3600 * 24))

  return (
    <span className='squeak-post-timestamp'>
        {days <= 0 ? 'Today' : `${days} day${days === 1 ? '' : 's'} ago`}
    </span>
  )
}

export default Days
