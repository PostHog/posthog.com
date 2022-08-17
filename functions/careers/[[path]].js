export function onRequestGet({ env, request }) {
    return env.ASSETS.fetch(new Request(new URL('/careers/', request.url).toString(), request))
}
