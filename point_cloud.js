var scene, camera, renderer, controls;
var plyLoader = new THREE.PLYLoader();
var object3D;

function initPointCloud() {
  // 创建场景
  scene = new THREE.Scene();
  // 设置背景色为白色
  scene.background = new THREE.Color(0xffffff);

  // 获取容器的宽度和高度
  var container = document.getElementById("point-cloud");
  var width = container.clientWidth;
  var height = container.clientHeight;

  // 创建摄像机
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

  // 创建渲染器
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height); // 设置渲染区域大小
  container.appendChild(renderer.domElement); // 将渲染结果放入容器

  // 添加 OrbitControls 进行用户交互
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // 加载点云文件 (.ply 文件)
  plyLoader.load('./scene0046_00.ply', function (geometry) {
  geometry.computeVertexNormals(); // 计算顶点法线

  // 使用 MeshStandardMaterial 进行网格显示
  var material = new THREE.MeshStandardMaterial({vertexColors: true });
  object3D = new THREE.Mesh(geometry, material);

  // 缩放网格大小
  // object3D.scale.set(2, 2, 2);

  // 将网格添加到场景中
  scene.add(object3D);
});

  // 加载点云文件 (.ply 文件)
  // plyLoader.load('./seeground/scene0046_00.ply', function (geometry) {
  //   geometry.computeVertexNormals(); // 计算顶点法线

  //   var material = new THREE.PointsMaterial({ size: 0.03, vertexColors: THREE.VertexColors });
  //   object3D = new THREE.Points(geometry, material);

  //   // 缩放点云大小
  //   object3D.scale.set(0.85, 0.85, 0.85);

  //   // 将点云添加到场景中
  //   scene.add(object3D);
  // });

  // 设置光源
  var light = new THREE.AmbientLight(0x404040, 2);  // 环境光
  var directionalLight = new THREE.DirectionalLight(0xffffff, 1);  // 平行光
  directionalLight.position.set(5, 5, 5).normalize();
  scene.add(light);
  scene.add(directionalLight);

  // 设置相机位置
  camera.position.set(0, 0, 5);

  // 动画循环
  function animate() {
    requestAnimationFrame(animate);
    controls.update(); // 更新控制器
    renderer.render(scene, camera); // 渲染场景
  }

  animate(); // 开始渲染
}

initPointCloud(); // 初始化点云