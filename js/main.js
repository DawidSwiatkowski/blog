/// <reference path='./babylonjs/babylon.d.ts' />

//create canvas
const canvas = document.getElementById('renderCanvas');

//create engine
const engine = new BABYLON.Engine(canvas, true);

//create scene
function createScene() {

  var scene = new BABYLON.Scene(engine);

  var light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3( 0, 1, 0 ), scene );
  light.intensity = 0.7;

  var camera = new BABYLON.ArcRotateCamera("camera", BABYLON.Tools.ToRadians(90), BABYLON.Tools.ToRadians(65), 5, BABYLON.Vector3.Zero(), scene);
  camera.wheelPrecision = 50;
  camera.lowerRadiusLimit = 2;
  camera.attachControl(canvas, true);
  camera.useAutoRotationBehavior = true;

  var material = new BABYLON.StandardMaterial('material');
  material.diffuseColor = new BABYLON.Color3.Green;

   BABYLON.SceneLoader.ImportMesh("", "./assets/", "shaderBall.glb", scene, function(newMeshes){
        var sphere = newMeshes[0].getChildMeshes()[0];
        sphere.material = material;
    });
  
  return scene;
}

const scene = createScene();

const ApplicationFlags = {
  isDebugLayerEnable: false
}

//keyboard
scene.onKeyboardObservable.add( (info)=> {
  if ( info.event.key == 'i' )
  {
    if ( ApplicationFlags.isDebugLayerEnable )
      scene.debugLayer.hide();
    else
      scene.debugLayer.show({ embedMode:true, overlay:false });

    ApplicationFlags.isDebugLayerEnable = !ApplicationFlags.isDebugLayerEnable;
  }
});

//render loop
engine.runRenderLoop(function () {
  scene.render();
});

window.addEventListener("resize", function () {
  engine.resize();
});