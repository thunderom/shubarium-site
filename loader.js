// loader.js
// Предположим, что tripo.glb лежит в assets/models/tripo.glb

let scene, camera, renderer, mixer;
let modelLoaded = false; // Будет true, когда модель загрузится

initLoader3D();

function initLoader3D() {
  const canvas = document.getElementById('loaderCanvas');

  // Создаём сцену, камеру
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 3);

  // Рендерер
  renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Добавим освещение
  const light = new THREE.HemisphereLight(0xffffff, 0x333333, 1);
  scene.add(light);

  // Загрузка модели GLB
  const loader = new THREE.GLTFLoader();
  loader.load(
    'assets/models/tripo.glb',
    function (gltf) {
      const model = gltf.scene;
      scene.add(model);
      modelLoaded = true;
    },
    function (xhr) {
      // xhr.loaded / xhr.total показывает прогресс
    },
    function (error) {
      console.error('Ошибка загрузки модели:', error);
    }
  );

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  if (modelLoaded) {
    // Можно вращать сцену или саму модель
    scene.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}
