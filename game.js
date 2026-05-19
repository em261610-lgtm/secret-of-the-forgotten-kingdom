// --- إعداد مشهد الـ 3D ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050510, 0.15);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// البلورة الكريستالية
const geometry = new THREE.IcosahedronGeometry(1.6, 0);
const material = new THREE.MeshStandardMaterial({ color: 0x00f2fe, wireframe: true, roughness: 0.1, metalness: 0.9 });
const crystal = new THREE.Mesh(geometry, material);
scene.add(crystal);

// الإضاءة
scene.add(new THREE.AmbientLight(0x111133, 1.5));
const blueLight = new THREE.PointLight(0x00f2fe, 3, 30); blueLight.position.set(2, 3, 4); scene.add(blueLight);
const pinkLight = new THREE.PointLight(0xe100ff, 3, 30); pinkLight.position.set(-2, -3, 4); scene.add(pinkLight);

// اللف باللمس
let isDragging = false; let previousMousePosition = { x: 0, y: 0 };
window.addEventListener('touchstart', (e) => { isDragging = true; previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }; });
window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;
    crystal.rotation.y += deltaX * 0.005; crystal.rotation.x += deltaY * 0.005;
    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});
window.addEventListener('touchend', () => { isDragging = false; });

function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) { crystal.rotation.y += 0.004; crystal.rotation.x += 0.002; }
    renderer.render(scene, camera);
}
animate();

// --- نظام التنقل بين الشاشات ---
function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('ui-box').classList.remove('hidden');
    document.getElementById('joystick-info').classList.remove('hidden');
}

function makeChoice(choice) {
    document.getElementById('ui-box').classList.add('hidden');
    const endScreen = document.getElementById('end-screen');
    const endText = document.getElementById('end-story-text');
    
    if(choice === 1) {
        endText.innerText = "كفو يا زين! شحنت السيف واكتسحت جيوش الظلام مع عفروتو وقمر.. البلورة نورت الكون والمملكة رجعت بطلة! ⚔️ غلبت يا ملك!";
        crystal.material.color.setHex(0x00f2fe);
    } else if(choice === 2) {
        endText.innerText = "برافو! تعويذة قمر السحرية عملت درع نيون حماسي حبس الشر للأبد.. عشت يا بطل وحققت النهاية الأسطورية السعيدة! 🔮✨";
        crystal.material.color.setHex(0xe100ff);
    }
    endScreen.classList.remove('hidden');
}

function restartGame() {
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
    crystal.material.color.setHex(0x00f2fe);
}

// زرار الخروج السحري من التطبيق
function exitGame() {
    if (navigator.app) {
        navigator.app.exitApp(); // كود الخروج الخاص بـ Cordova للأندرويد
    } else if (navigator.device) {
        navigator.device.exitApp();
    } else {
        window.close(); // للمتصفح العادي
    }
}
