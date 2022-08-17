export function onRequestGet({ env, request }) {
    return env.ASSETS.fetch(new Request(new URL('/next-steps/', request.url).toString(), request))
}
