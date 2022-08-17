export function onRequestGet({ env, request }) {
    return env.ASSETS.fetch(new Request(new URL('/question/', request.url).toString(), request))
}
