export function formatAddress(address: string) {
  if (address.length <= 8) {
    return address;
  }

  return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
}
