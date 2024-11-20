export function formatBalance(number: number): string {
	return Intl.NumberFormat('en-us').format(number)
}