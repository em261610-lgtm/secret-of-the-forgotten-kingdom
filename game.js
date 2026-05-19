// --- إعداد مشهد الـ 3D الاحترافي ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// إضافة ضباب في الخلفية عشان يديك إحساس عمق الفضاء الساحر
scene.fog = new THREE.FogExp2(0x050510, 0.15);

// الكاميرا
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// المحرك
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // عشان الأداء يبقى طلقة على الموبايل
container.appendChild(renderer.domElement);

// --- عمل مجسم الكريستالة المفقودة (التصميم العصري) ---
const geometry = new THREE.IcosahedronGeometry(1.6, 0); // شكل كريستالي مضلع فخم
const material = new THREE.MeshStandardMaterial({
    color: 0x00f2fe,
    wireframe: true, // شبكة النيون المضية
    roughness: 0.1,
    metalness: 0.9
});
const crystal = new THREE.Mesh(geometry, material);
scene.add(crystal);

// إضاءة نيون محيطة باللعبة
const ambientLight = new THREE.AmbientLight(0x111133, 1.5);
scene.add(ambientLight);

const blueLight = new THREE.PointLight(0x00f2fe, 3, 30);
blueLight.position.set(2, 3, 4);
scene.add(blueLight);

const pinkLight = new THREE.PointLight(0xe100ff, 3, 30);
pinkLight.position.set(-2, -3, 4);
scene.add(pinkLight);

// --- نظام التحكم باللمس للف الكاميرا (التفاعل) ---
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };

window.addEventListener('touchstart', (e) => {
    isDragging = true;
    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.y;

    crystal.rotation.y += deltaX * 0.005;
    crystal.rotation.x += deltaY * 0.005;

    previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

window.addEventListener('touchend', () => { isDragging = false; });

// تشغيل الحركة المستمرة للبلورة
function animate() {
    requestAnimationFrame(animate);
    if (!isDragging) {
        crystal.rotation.y += 0.004; // بتلف لوحدها بهدوء شيك
        crystal.rotation.x += 0.002;
    }
    renderer.render(scene, camera);
}
animate();

// ضبط الشاشة لو الموبايل اتقلب أو اتغير اتجاهه
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- لوجيك القصة المشوقة ---
function makeChoice(choice) {
    const text = document.getElementById('story-text');
    const box = document.getElementById('ui-box');
    
    if(choice === 1) {
        text.innerText = "كفو يا زين! سيف النور اتملى طاقة زرقاء مرعبة، وفتحت بوابة الأبعاد! عفروتو ظهر فجأة وصرخ: 'الوحوش جاية من ورا القلعة الطايرة، اجهز!' ⚔️👹";
        crystal.material.color.setHex(0x00f2fe);
        box.style.borderColor = "#00f2fe";
    } else if(choice === 2) {
        text.innerText = "قمر ظهرت في وسط طيف كريستالي موف ساحر وقالتلك: 'طاقتك هي أملنا الوحيد يا زين'. البلورة السحرية بدأت تطلع وميض مرعب حماسي! 🔮✨";
        crystal.material.color.setHex(0xe100ff);
        box.style.borderColor = "#e100ff";
    }
}
