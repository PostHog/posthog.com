import alienSvg from '../../images/alien.svg'
import * as THREE from 'three'

export const createAlienSkyboxLayer = () => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
        return null
    }

    const customLayer: any = {
        id: 'alien-skybox',
        type: 'custom',
        renderingMode: '3d',
        onAdd: function (map: any, gl: any) {
            this.camera = new THREE.Camera()
            this.scene = new THREE.Scene()
            this.map = map

            // Create a large sphere for the skybox
            const geometry = new THREE.SphereGeometry(500, 60, 40)
            // Invert the sphere so textures are visible from inside
            geometry.scale(-1, 1, 1)

            // Load the alien SVG as a texture
            const loader = new THREE.TextureLoader()
            loader.load(
                alienSvg,
                (texture) => {
                    texture.wrapS = THREE.RepeatWrapping
                    texture.wrapT = THREE.RepeatWrapping
                    texture.repeat.set(8, 8) // Tile the alien pattern

                    const material = new THREE.MeshBasicMaterial({
                        map: texture,
                        side: THREE.BackSide,
                        transparent: true,
                        opacity: 0.6,
                    })

                    this.skyboxMesh = new THREE.Mesh(geometry, material)
                    this.scene.add(this.skyboxMesh)
                    map.triggerRepaint()
                },
                undefined,
                (error) => {
                    console.error('Error loading alien texture:', error)
                }
            )

            // Use the Mapbox GL JS map canvas for three.js
            this.renderer = new THREE.WebGLRenderer({
                canvas: map.getCanvas(),
                context: gl,
                antialias: true,
            })

            this.renderer.autoClear = false
        },
        render: function (gl: any, matrix: any) {
            if (!this.skyboxMesh) return

            const zoom = this.map.getZoom()

            // Calculate opacity based on zoom level - visible when zoomed out
            const opacity = Math.max(0, Math.min(0.8, (5 - zoom) / 5))

            if (opacity > 0 && this.skyboxMesh.material) {
                this.skyboxMesh.material.opacity = opacity

                // Get the camera position from the map
                const cameraPosition = this.map.getFreeCameraOptions()

                // Position skybox at camera location so it moves with the view
                if (cameraPosition && cameraPosition.position) {
                    this.skyboxMesh.position.set(
                        cameraPosition.position.x || 0,
                        cameraPosition.position.y || 0,
                        cameraPosition.position.z || 0
                    )
                }

                // Set up the camera projection matrix
                const m = new THREE.Matrix4().fromArray(matrix)
                this.camera.projectionMatrix = m

                // Render the scene
                this.renderer.resetState()
                gl.disable(gl.DEPTH_TEST) // Render skybox without depth testing
                this.renderer.render(this.scene, this.camera)
                gl.enable(gl.DEPTH_TEST)

                this.map.triggerRepaint()
            }
        },
    }

    return customLayer
}

// Load THREE.js dynamically for client-side rendering
export const loadThreeJS = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (typeof window === 'undefined') {
            reject(new Error('Cannot load THREE.js on server'))
            return
        }

        // Check if already loaded
        if ((window as any).THREE) {
            resolve()
            return
        }

        // Load THREE.js from CDN
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/three@0.126.0/build/three.min.js'
        script.async = true
        script.onload = () => {
            console.log('THREE.js loaded successfully')
            resolve()
        }
        script.onerror = () => {
            reject(new Error('Failed to load THREE.js'))
        }
        document.head.appendChild(script)
    })
}
