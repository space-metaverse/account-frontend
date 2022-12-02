export default (value: number): string => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(value)
