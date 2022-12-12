const regex = /^(0x[a-zA-Z0-9]{8})[a-zA-Z0-9]+([a-zA-Z0-9]{8})$/

export default (address: string): string => {
  const match = address.match(regex)

  if (!match) return address

  return `${match[1]}…${match[2]}`
}
