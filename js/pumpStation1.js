var scene, camera, renderer, daeModel;

//��ʼ������
function initScene() {
    scene = new THREE.Scene();
}

//��ʼ�������
function initcamera() {
    aspect = 980 / 490;
    D = 6;
    //camera = new THREE.OrthographicCamera(-D*aspect, D*aspect, D, -D, 1, 1000);
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 200000)
    //camera.position.set( 66.58, -16.54, 60.16 );
    camera.position.set(66.58, 6.54, 60.16);
    camera.lookAt(new THREE.Vector3(80, 36.7, 0));
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 1;
    //camera.rotation.x = 0.8;
    //camera.rotation.z = 1 / 6 * Math.PI;
    //camera.rotation.z = 5/6*Math.PI;
}
function initthree() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(980, 490);
    renderer.setClearColor(0x000000);
    //document.body.appendChild(renderer.domElement);
    var html = renderer.domElement;
    $('#threeModelDiv').html(html);
    //$("canvas").css("width", "100%");

    
    var axisHelper = new THREE.AxisHelper(500);
    scene.add(axisHelper);

}

function initlight() {
    var light = new THREE.DirectionalLight(0xffffee, 2);
    var light1 = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.4);
    light.position.set(-100, -100, 300);
    //scene.add(light);
    scene.add(light1);
    var spotLight = new THREE.SpotLight(0xffffdd);
    spotLight.position.set(50, 50, 50);
    spotLight.intensity = 1.2;
    spotLight.castShadow = true;

    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;

    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;

    scene.add(spotLight);
    lightHelper2 = new THREE.SpotLightHelper(spotLight);
    scene.add(lightHelper2);
}

function LoadModel() {
        //泵站
    var loader7 = new THREE.ColladaLoader();
    loader7.load("model/maxdae/Pump.dae", function (collada) {
        daeModel6 = collada.scene;
        daeModel6.scale.set(0.3, 0.3, 0.3);
        //daeModel6.position.set(80, 80.7, 0);
        daeModel6.rotation.x = 0.5 * Math.PI;
        scene.add(daeModel6);
    },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + "% loaded");
        });
}

//��ʼ����Ⱦ��
function render() {
    requestAnimationFrame(render);

    renderer.clear();

    renderer.render(scene, camera);
    //if( daeModel ){
    //    daeModel.rotation.z++;
    //}
}

var Controls;
// ��ʼ��������
function initControls() {
    Controls = new THREE.OrbitControls(camera);
}

function startGame() {
    //NProgress.start();
    console.log('Load Model started...');
    initScene();
    initcamera();
    initthree();
    initlight();
    LoadModel();
    LoadMax();
    render();
    initControls();
    /*$("#threeModelDiv").append("<label style='position:absolute;top:83px;left:566px;background-color:gray;border-color: white;border-style: groove;'><font color='#0000ff'>状态:正常</label> </button>");
    $("#threeModelDiv").append("<label style='position:absolute;top:138px;left:569px;background-color:gray;border-color: white;border-style: groove;'><font color='#0000ff'>状态:正常</label> </button>") ;
    $("#threeModelDiv").append("<label style='position:absolute;top:183px;left:572px;background-color:gray;border-color: white;border-style: groove;'><font color='#0000ff'>状态:正常</label> </button>") ;
    $("#threeModelDiv").append("<label style='position:absolute;top:241px;left:577px;background-color:gray;border-color: white;border-style: groove;'><font color='#0000ff'>状态:正常</label> </button>") ;
    $("#threeModelDiv").append("<label style='position:absolute;top:299px;left:582px;background-color:gray;border-color: white;border-style: groove;'><font color='#0000ff'>状态:正常</label> </button>") ;
    $("#threeModelDiv").append("<label style='position:absolute;top:350px;left:586px;background-color:gray;border-color: white;border-style: groove;'><font color='#0000ff'>状态:正常</label> </button>") ;
    $("#threeModelDiv").append("<label style='position:absolute;top:350px;left:586px;background-color:gray;border-color: white;border-style: groove;'><font color='#0000ff'>状态:正常</label> </button>");*/

}
function changePump(num, state) {
    var pumpModel;
    switch (num) {
        case 1: pumpModel = daeModel1; break;
        case 2: pumpModel = daeModel2; break;
        case 3: pumpModel = daeModel3; break;
        case 4: pumpModel = daeModel4; break;
        case 5: pumpModel = daeModel5; break;
        case 6: pumpModel = daeModel6; break;

    }
    switch (state) {
        case "open": ControlPump.open(pumpModel); break;
        case "close": ControlPump.close(pumpModel); break;
        case "fault": ControlPump.fault(pumpModel); break;
    }
    //changecolor(pumpModel,state);

}
var ControlPump = {
    open: function (model) {
        for (var i = 0; i < model.children.length; i++) {
            if (model.children[i].material)
                model.children[i].material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
            else
                ControlPump.open(model.children[i]);
        }
    },
    close: function (model) {
        for (var i = 0; i < model.children.length; i++) {
            if (model.children[i].material)
                model.children[i].material = new THREE.MeshPhongMaterial({ color: 0x000000 });
            else
                ControlPump.close(model.children[i]);
        }
    },
    fault: function (model) {
        for (var i = 0; i < model.children.length; i++) {
            if (model.children[i].material)
                model.children[i].material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
            else
                ControlPump.fault(model.children[i]);
        }
    }
}
function LoadMax() {
    var onError = function (xhr) { };
    THREE.Loader.Handlers.add(/\.dds$/i, new THREE.DDSLoader());
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('model/3DMAX');       //设置我们需要加载的mtl文件路径
    mtlLoader.load('Pumpstatiom.mtl', function (material) {      //这里加载我们需要的文件名  
        material.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(material);      //材质，也可自定义
        objLoader.setPath('model/3DMAX');               //设置要加载的obj文件的路径
        objLoader.load('Pumpstatiom.obj', function (object) {           //加载obj文件
            object.position.z = 1;         //这里设置我们的素材相对于原来的大小以及旋转缩放等
            object.position.y = -0.5;
            object.scale.x = 0.2;
            object.scale.y = 0.2;
            object.scale.z = 0.2;
            object1 = object;               //这里是对素材设置阴影的操作
            for (var k in object.children) {  //由于我们的素材并不是看上去的一个整体，所以需要进行迭代
                //对其中的所有孩子都设置接收阴影以及投射阴影
                //才能看到阴影效果
                object.children[k].castShadow = true;   //设置该对象可以产生阴影
                object.children[k].receiveShadow = true;  //设置该对象可以接收阴影
            }
            scene.add(object1);

        }, onProgress, onError);
    });
}






