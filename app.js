import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

// Setup Camera
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 15;
camera.position.y = -2; // Lower camera position for bottom focus

// Setup Scene
const scene = new THREE.Scene();
let model;

// Lighting Setup
const setupLighting = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 6);
    pointLight.position.set(2, 3, 5);
    scene.add(pointLight);
};

setupLighting();

// Load 3D Model
const loader = new GLTFLoader();
loader.load('/e.glb',
    function (gltf) {
        model = gltf.scene;
        scene.add(model);
        model.scale.set(1.2, 1.2, 1.2);

        // Initially hidden
        model.visible = false;
        model.position.set(-6, -4, 0); // Start at left side
    },
    undefined,
    function (error) { console.error("Model Loading Error:", error); }
);

// Setup Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// Animation Loop
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
animate();

// Scroll Detection & Movement
let lastScrollY = window.scrollY;
let movingRight = true;
let isAnimating = false;

const checkVisibilityAndMove = () => {
    if (!model) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Calculate Scroll Position (Middle to Bottom)
    const scrollPercentage = scrollY / (documentHeight - windowHeight);
    const isMiddleToBottom = scrollPercentage > 0.4; // Visible from 40% scroll onwards

    if (isMiddleToBottom) {
        if (!model.visible) {
            model.visible = true;
            gsap.fromTo(model.scale, { x: 0, y: 0, z: 0 }, { x: 1.2, y: 1.2, z: 1.2, duration: 1, ease: "elastic.out(1, 0.5)" });
        }

        if (!isAnimating) {
            isAnimating = true;
            
            let targetX = movingRight ? 6 : -6; // Move between left (-6) and right (6)
            gsap.to(model.position, {
                x: targetX,
                duration: 2, // Smooth movement speed
                ease: "power2.inOut",
                onComplete: () => {
                    movingRight = !movingRight; // Reverse direction
                    isAnimating = false; // Unlock animation
                }
            });
        }
    } else {
        if (model.visible) {
            gsap.to(model.scale, { x: 0, y: 0, z: 0, duration: 0.5, ease: "power2.in", onComplete: () => (model.visible = false) });
        }
    }

    lastScrollY = scrollY;
};

// Scroll Event
window.addEventListener('scroll', checkVisibilityAndMove);

// Resize Event
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
