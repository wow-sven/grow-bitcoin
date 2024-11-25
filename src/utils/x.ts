
export function getXAvatar(xUrl : string): string {

	console.log(xUrl)
	if (xUrl.endsWith('/')) {
		xUrl = xUrl.slice(0, -1)
	}
	console.log(xUrl)
	console.log(`https://unavatar.io/x/${xUrl.slice(xUrl.lastIndexOf('/')+1)}`)
	return `https://unavatar.io/x/${xUrl.slice(xUrl.lastIndexOf('/')+1)}`
}
