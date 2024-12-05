// 存储当前加载的点云对象
var currentObject = null;

function updateQuery(query) {
  // 先去除所有查询按钮的 'active' 类
  document.querySelectorAll('.query-item').forEach(item => {
    item.classList.remove('active');
  });

  // 选择当前点击的元素（无论是文字部分还是圆环部分）
  const targetElement = event.target.closest('.query-item');  // 找到最近的具有 .query-item 类的父元素
  
  // 为当前点击的查询项添加 'active' 类
  if (targetElement) {
    targetElement.classList.add('active');
  }


  let imageUrl = '';
  let cameraPosition = new THREE.Vector3(0, 0, 5);  // 默认相机位置
  let lookAtPosition = new THREE.Vector3(0, -5, 0);  // 默认 lookAt 位置
  let plyFilePath = '';  // 新的 PLY 文件路径
  
  // 根据不同的查询选择更新相应的图像和点云的视角
  switch(query) {
    case 'Query 1':
      imageUrl = './seeground/0046_00-chair-00.png';  // 更新为 Query 1 的图片路径
      cameraPosition = new THREE.Vector3(0, 0, 5); // 修改相机位置
      lookAtPosition = new THREE.Vector3(-1.1, 1.6, 0.93); // 修改 lookAt 位置
      plyFilePath = './seeground/scene0046_00/chair_1.ply';  // 更新为 Query 1 的 PLY 文件路径
      break;
    case 'Query 2':
      imageUrl = './seeground/0046_00-door-00.png';  // 更新为 Query 2 的图片路径
      cameraPosition = new THREE.Vector3(2, 0, 5); // 修改相机位置
      lookAtPosition = new THREE.Vector3(0, 0, 0); // 修改 lookAt 位置
      plyFilePath = './seeground/scene0046_00/door_21.ply';  // 更新为 Query 2 的 PLY 文件路径
      break;
    case 'Query 3':
      imageUrl = './seeground/0046_00-door-01.png';   // 更新为 Query 3 的图片路径
      cameraPosition = new THREE.Vector3(-2, 0, 5); // 修改相机位置
      lookAtPosition = new THREE.Vector3(0, 0, 0); // 修改 lookAt 位置
      plyFilePath = './seeground/scene0046_00/door_26.ply';   // 更新为 Query 3 的 PLY 文件路径
      break;
    default:
      imageUrl = './seeground/0046_00-00.png';   // 如果没有匹配的查询则使用默认图像
      lookAtPosition = new THREE.Vector3(0, 0, 0); // 默认 lookAt 位置
  }
  
  // 更新显示的 2D 渲染图
  document.getElementById('renderedImage').src = imageUrl;

  // // 禁用 OrbitControls 更新相机，避免与手动设置冲突
  // controls.enabled = false;

  // // 更新相机位置
  // camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

  // // 强制更新相机的旋转
  // camera.lookAt(lookAtPosition);  // 让相机指向指定的 lookAt 位置

  // // 手动触发相机更新
  // camera.updateProjectionMatrix();

  // // 启用 OrbitControls
  // controls.enabled = true;

  // 移除之前的点云对象
  if (currentObject) {
    scene.remove(currentObject);
  }

  // 加载新的 PLY 文件并添加到场景中
  plyLoader.load(plyFilePath, function (geometry) {
    geometry.computeVertexNormals(); // 计算顶点法线

    // var material = new THREE.PointsMaterial({ size: 0.02, vertexColors: THREE.VertexColors });
    // var newObject3D = new THREE.Points(geometry, material);
    // 使用 MeshBasicMaterial 进行网格显示
    var material = new THREE.MeshBasicMaterial({ color: new THREE.Color(0x01B1A0), wireframe: true });  // 网格材质，启用线框模式

    // 如果 PLY 文件包含面数据
    var newObject3D = new THREE.Mesh(geometry, material);
    
    // 缩放点云大小
    // newObject3D.scale.set(0.85, 0.85, 0.85);

    // 将新的点云添加到场景中
    scene.add(newObject3D);

    // 更新当前点云对象
    currentObject = newObject3D;

    // 手动更新场景渲染
    renderer.render(scene, camera);
  });
}

