export function onRequestGet({ env, request }) {
    return env.ASSETS.fetch(new Request(new URL('/docs/tutorials', request.url).toString(), request))
}
