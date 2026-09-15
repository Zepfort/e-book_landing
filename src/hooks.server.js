/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const response = await resolve(event);

	response.headers.set(
		'Content-Security-Policy',
		[
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' https://js.stripe.com",
			"style-src 'self' 'unsafe-inline'",
			"img-src 'self' data:",
			'connect-src ' + "'self' https://api.stripe.com",
			'frame-src https://js.stripe.com https://hooks.stripe.com',
			"font-src 'self' data:"
		].join('; ')
	);
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	return response;
}
