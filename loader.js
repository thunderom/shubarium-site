let scene, camera, renderer;
let modelLoaded = false;

// Инициализация сцены
function initLoader3D() {
  const canvas = document.getElementById('loaderCanvas');
  
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 3);

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Освещение
  const light = new THREE.HemisphereLight(0xffffff, 0x333333, 1);
  scene.add(light);

  // Загрузчик GLTF
  const loader = new THREE.GLTFLoader();
  loader.load(
    'assets/models/tripo.glb',
    function (gltf) {
      // Модель загружена
      const model = gltf.scene;
      scene.add(model);
      modelLoaded = true;

      // Запускаем анимацию вращения
      animate();

      // Ждём 2 секунды, пока модель крутится в прелоадере...
      setTimeout(() => {
        // ...и только потом скрываем прелоадер
        const preloader = document.getElementById('preloader');
        preloader.style.display = 'none';
      }, 2000);
    },
    undefined, // Можно добавить прогресс-коллбек, если хотите
    function (error) {
      console.error('Ошибка при загрузке модели:', error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);

  if (modelLoaded) {
    scene.rotation.y += 0.01; // вращаем сцену/модель
  }
  renderer.render(scene, camera);
}

// Запускаем процесс сразу при загрузке файла loader.js
initLoader3D();
