// loader.js
// Предполагаем, что у вас уже есть код для Three.js, чтобы загружать модель.
// Добавим таймер на 2 секунды, прежде чем скрывать прелоадер.

let scene, camera, renderer;
let modelLoaded = false;

function initLoader3D() {
  const canvas = document.getElementById('loaderCanvas');

  // Создаем сцену
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 3);

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Свет
  const light = new THREE.HemisphereLight(0xffffff, 0x333333, 1);
  scene.add(light);

  // Загрузчик GLTF
  const loader = new THREE.GLTFLoader();
  loader.load(
    'assets/models/tripo.glb',
    function (gltf) {
      const model = gltf.scene;
      scene.add(model);
      modelLoaded = true;
    },
    undefined,
    function (error) {
      console.error('Ошибка при загрузке модели:', error);
    }
  );

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  if (modelLoaded) {
    // Вращение сцены или модели
    scene.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

// Запуск при загрузке скрипта
initLoader3D();

// Скрытие прелоадера спустя 2 секунды после полной загрузки
window.addEventListener('load', () => {
  // Ждём 2 секунды
  setTimeout(() => {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none'; // Или preloader.remove();
  }, 2000);
});
