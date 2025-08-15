import './index.css';
import {Suspense, useRef,useState, useEffect} from 'react'
import {Canvas, useThree} from '@react-three/fiber'
import {OrbitControls, useGLTF} from '@react-three/drei'
import saveImage from './assets/save.png'
import bottle1Image from './assets/bottle1.png'
import bottle2Image from './assets/bottle2.png'
import bottle3Image from './assets/bottle3.png'
import html2canvas from 'html2canvas'
/*
Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    // Set the canvas background color
    context.fillStyle = 'lightblue'; // Change this to the desired color
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <Canvas ref={canvasRef}/>
  );
};
*/
function Model1({...props }) {
 const group = useRef();

 const {nodes, materials} = useGLTF("bottle1/bottle1.gltf");

  return (
    <group ref={group} {...props} position={[0,0,-1.5]} dispose={null} scale={5}>
      <mesh geometry={nodes.Circle_Material_001_0.geometry} material={materials.Material_001} position={[0,-0.7,-1]} rotation={[(-Math.PI/2),0,0]} scale={[1,1,1]} material-color={props.customColors.bottle} />
      <mesh geometry={nodes.Circle_001_Material_002_0.geometry} material={materials.Material_002} position={[0,1,-1]} rotation={[(-Math.PI/2),0,0]} scale={[0.14,0.14,0.14]} material-color={props.customColors.cap} />
      <mesh geometry={nodes.Circle_002_Material_002_0.geometry} material={materials.Material_002} position={[0,1,-1]} rotation={[(-Math.PI/2),0,0]} scale={[0.14,0.14,0.14]} material-color={props.customColors.cap} />
      <mesh geometry={nodes.Background.geometry} material={materials.Floor} position={[0,-2,4]} rotation={[0,0,0]} scale={[10,10,10]} material-color={props.customColors.bgcolour}/>
    </group>
  )
}

function Model2({...props }) {
  const group = useRef();
 
  const {nodes, materials} = useGLTF("bottle2/bottle2.gltf");
 
   return (
     <group ref={group} {...props} dispose={null} scale={0.02} position={[0,0.5,-1]}>
     <mesh geometry={nodes.Cylinder_Common_Pill_Bottle_0_001.geometry} material={materials.Common_Pill_Bottle_001} rotation={[(-Math.PI/2),0,0]} scale={[1,1,1]} material-color={props.customColors.cap}/>
     <mesh geometry={nodes.Cylinder_Common_Pill_Bottle_0_002.geometry} material={materials.Common_Pill_Bottle_002} rotation={[(-Math.PI/2),0,0]} scale={[1,1,1]} material-color={props.customColors.bottle}/>
     <mesh geometry={nodes.Background.geometry} material={materials.Floor} position={[0,-700,500]} rotation={[0,0,0]} scale={[1000,1000,1000]} material-color={props.customColors.bgcolour}/>
   </group>
   )
 }

 function Model3({...props }) {
  const group = useRef();
 
  const {nodes, materials} = useGLTF("bottle3/bottle3.gltf");
 
   return (
   <group ref={group} {...props} position={[0,-2,-2]} dispose={null} scale={2}>
   <mesh geometry={nodes.Bottle_002.geometry} material={materials.Material_001} position={[0,0,0]} rotation={[0.2,0,0]} scale={[1,1,1]} material-color={props.customColors.cap}/>
   <mesh geometry={nodes.Bottle_001.geometry} material={materials.Material_002} position={[0,0,0]} rotation={[0.2,0,0]} scale={[1,1,1]} material-color={props.customColors.bottle}/>
   <mesh geometry={nodes.Background.geometry} material={materials.Floor} position={[0,-2.5,5]} rotation={[0.2,0,0]} scale={[10,10,10]} material-color={props.customColors.bgcolour}/>
 </group>
   )
 }

function App() {
  
  const [bottle,setBottle] = useState("#d3d3d3");
  const [cap,setCap] = useState("#000000");
  const [bgcolour,setBgcolour] = useState("#ffffff");
  const [showBGColorPicker, setShowBGColorPicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, selectColor] = useState('#ffffff');
  const [component, setComponent] = useState("bottle");
  const productCanvasRef = useRef(null);
  const [selectedType, setType] = useState("bottle1");

  const clickSelectType = (selectedType) => {
    setType(selectedType);
  };

  const toggleColorPicker = (event) => {
    setShowColorPicker(!showColorPicker);
    setComponent(event.target.id);
  };

  const toggleBGColorPicker = (event) => {
    setShowBGColorPicker(!showBGColorPicker);
    setComponent(event.target.id);
  };

  const clickSelectColor = (color) => {
    selectColor(color);
  };

  const clickSelect = () => {
    setShowColorPicker(!showColorPicker);
    if (component === "bottle") {
      setBottle(selectedColor);
    }
    if (component === "cap") {
      setCap(selectedColor);
    }
  }

  const clickCancel = () => {
    setShowColorPicker(!showColorPicker);
  }

  const clickBGSelect = () => {
    setShowBGColorPicker(!showBGColorPicker);
    if (component === "bgcolour") {
      setBgcolour(selectedColor);
    }
  }

  const clickBGCancel = () => {
    setShowBGColorPicker(!showBGColorPicker);
  }

  const saveScreenshot = () => {
    const productCanvasElement = productCanvasRef.current;

    if (!productCanvasElement) {
      console.error("Canvas element not found");
      return;
    }

    // Capture the content of the card using html2canvas
    html2canvas(productCanvasElement).then(canvas => {
      // Convert the canvas to a data URL
      const dataURL = canvas.toDataURL('image/png');

      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = dataURL;

      // Set the download attribute to specify the filename
      link.download = 'screenshot.png';

      // Simulate a click on the anchor element to trigger the download
      link.click();
    });
  };

  return (
    <div className="App">
          {!(showColorPicker || showBGColorPicker) && 
            <div className="card">
              <div className='colors'>
              <div className='main_title'><div><h2>Bottle Type Picker</h2></div></div>
              <button className="type" style={{border: selectedType === "bottle1" ? "3px solid gray" : "none"}} onClick={() => clickSelectType("bottle1")}>
              <img src={bottle1Image} style={{maxBlockSize: '50px'}}></img>
              </button>
              <button className="type" style={{border: selectedType === "bottle2" ? "3px solid gray" : "none"}} onClick={() => clickSelectType("bottle2")}>
              <img src={bottle2Image}style={{maxBlockSize: '50px'}}></img>
              </button>
              <button className="type" style={{border: selectedType === "bottle3" ? "3px solid gray" : "none"}} onClick={() => clickSelectType("bottle3")}>
              <img src={bottle3Image}style={{maxBlockSize: '50px'}}></img>
              </button>
              </div>
                <div className="product-canvas" ref={productCanvasRef}>
                   <Canvas gl={{ preserveDrawingBuffer: true }}>
                      <Suspense fallback={null}>
                          <ambientLight />
                          <spotLight intensity={0.9} 
                                     angle={0.1} 
                                     penumbra={1} 
                                     position={[10,15,10]}
                                     castShadow />
                          {selectedType==="bottle1" && <Model1 customColors={{ bottle:bottle, cap:cap, bgcolour:bgcolour }}/>}
                          {selectedType==="bottle2" && <Model2 customColors={{ bottle:bottle, cap:cap, bgcolour:bgcolour }}/>}
                          {selectedType==="bottle3" && <Model3 customColors={{ bottle:bottle, cap:cap, bgcolour:bgcolour }}/>}
                          <OrbitControls enablePan={true}
                                         enableZoom={true}
                                         enableRotate={true}/>
                      </Suspense>
                   </Canvas>
                </div>
                <div className='colors'>
                <div className='main_title'><div><h2>PANTONE Colour Picker</h2></div></div>
                    <div className='color'>
                        <button id="bottle" name="bottle" className = "color_picker_button" onClick={toggleColorPicker}>
                          <div id="bottle" style={{backgroundColor: bottle}}></div>
                        </button>
                        <label>Bottle</label>
                    </div>
                    <div className='color'>
                        <button id="cap" name="cap" className = "color_picker_button" onClick={toggleColorPicker}>
                          <div id="cap" style={{backgroundColor: cap}}></div>
                        </button>
                        <label>Cap</label>
                    </div>
                    <div className='color'>
                        <button id="bgcolour" name="bgcolour" className = "color_picker_button" onClick={toggleBGColorPicker}>
                          <div id="bgcolour" style={{backgroundColor: bgcolour}}></div>
                        </button>
                        <label>Background</label>
                    </div>
                    <div className='button'>
                      <button className = "color_picker_button" onClick={saveScreenshot}>
                        <img src={saveImage}></img>
                      </button>
                      <label>Save Image</label>
                    </div>
                </div>
            </div>
          }
          {showBGColorPicker &&
          <div className="wrapper">
          <div className="card_pantone">
            <div className='title'><div><h2>Background Color Picker</h2></div></div>
              <div className="lister">
                <div className="content">
<button className="child" style={{border: selectedColor === "#ffffff" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffffff")}>
<div className="color_sample" style={{backgroundColor: "#ffffff"}}></div>
<label className="color-name">White</label>
</button>
<button className="child" style={{border: selectedColor === "#808080" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#808080")}>
<div className="color_sample" style={{backgroundColor: "#808080"}}></div>
<label className="color-name">Grey</label>
</button>
<button className="child" style={{border: selectedColor === "#add8e6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#add8e6")}>
<div className="color_sample" style={{backgroundColor: "#add8e6"}}></div>
<label className="color-name">Light Blue</label>
</button>
<button className="child" style={{border: selectedColor === "#000000" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#000000")}>
<div className="color_sample" style={{backgroundColor: "#000000"}}></div>
<label className="color-name">Black</label>
</button>
<button className="child" style={{border: selectedColor === "#90ee90" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#90ee90")}>
<div className="color_sample" style={{backgroundColor: "#90ee90"}}></div>
<label className="color-name">Light Green</label>
</button>
<button className="child" style={{border: selectedColor === "#ffb6c1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffb6c1")}>
<div className="color_sample" style={{backgroundColor: "#ffb6c1"}}></div>
<label className="color-name">Light Pink</label>
</button>
<button className="child" style={{border: selectedColor === "#ffff00" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffff00")}>
<div className="color_sample" style={{backgroundColor: "#ffff00"}}></div>
<label className="color-name">Yellow</label>
</button>
                </div>
                </div>
                <div className='select-cancel'>
                        <button id="select" onClick={clickBGSelect}>SELECT</button>
                        <div className='seperator'></div>
                        <button onClick={clickBGCancel}>CANCEL</button>
                </div>
            </div>
            </div>
          }
          {showColorPicker &&
          <div className="wrapper">
            <div className="card_pantone">
              <div className='title'><div><h2>PANTONE Color Picker</h2></div></div>
                <div className="lister">
                  <div className="content">
<button className="child" style={{border: selectedColor === "#f4ed7c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4ed7c")}>
<div className="color_sample" style={{backgroundColor: "#f4ed7c"}}></div>
<label className="color-name">Pantone 100</label>
<label className="color-shade">C: 0 M: 3 Y: 49 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#f4ed47" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4ed47")}>
<div className="color_sample" style={{backgroundColor: "#f4ed47"}}></div>
<label className="color-name">Pantone 101</label>
<label className="color-shade">C: 0 M: 3 Y: 71 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#f9e814" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9e814")}>
<div className="color_sample" style={{backgroundColor: "#f9e814"}}></div>
<label className="color-name">Pantone 102</label>
<label className="color-shade">C: 0 M: 7 Y: 92 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#c6ad0f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c6ad0f")}>
<div className="color_sample" style={{backgroundColor: "#c6ad0f"}}></div>
<label className="color-name">Pantone 103</label>
<label className="color-shade">C: 0 M: 13 Y: 92 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#ad9b0c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ad9b0c")}>
<div className="color_sample" style={{backgroundColor: "#ad9b0c"}}></div>
<label className="color-name">Pantone 104</label>
<label className="color-shade">C: 0 M: 10 Y: 93 K: 32</label>
</button>
<button className="child" style={{border: selectedColor === "#82750f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#82750f")}>
<div className="color_sample" style={{backgroundColor: "#82750f"}}></div>
<label className="color-name">Pantone 105</label>
<label className="color-shade">C: 0 M: 10 Y: 88 K: 49</label>
</button>
<button className="child" style={{border: selectedColor === "#f7e859" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f7e859")}>
<div className="color_sample" style={{backgroundColor: "#f7e859"}}></div>
<label className="color-name">Pantone 106</label>
<label className="color-shade">C: 0 M: 6 Y: 64 K: 3</label>
</button>
<button className="child" style={{border: selectedColor === "#f9e526" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9e526")}>
<div className="color_sample" style={{backgroundColor: "#f9e526"}}></div>
<label className="color-name">Pantone 107</label>
<label className="color-shade">C: 0 M: 8 Y: 85 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f9dd16" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9dd16")}>
<div className="color_sample" style={{backgroundColor: "#f9dd16"}}></div>
<label className="color-name">Pantone 108</label>
<label className="color-shade">C: 0 M: 11 Y: 91 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f9d616" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9d616")}>
<div className="color_sample" style={{backgroundColor: "#f9d616"}}></div>
<label className="color-name">Pantone 109</label>
<label className="color-shade">C: 0 M: 14 Y: 91 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#d8b511" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d8b511")}>
<div className="color_sample" style={{backgroundColor: "#d8b511"}}></div>
<label className="color-name">Pantone 110</label>
<label className="color-shade">C: 0 M: 16 Y: 92 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#aa930a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aa930a")}>
<div className="color_sample" style={{backgroundColor: "#aa930a"}}></div>
<label className="color-name">Pantone 111</label>
<label className="color-shade">C: 0 M: 14 Y: 94 K: 33</label>
</button>
<button className="child" style={{border: selectedColor === "#99840a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#99840a")}>
<div className="color_sample" style={{backgroundColor: "#99840a"}}></div>
<label className="color-name">Pantone 112</label>
<label className="color-shade">C: 0 M: 14 Y: 93 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#f9e55b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9e55b")}>
<div className="color_sample" style={{backgroundColor: "#f9e55b"}}></div>
<label className="color-name">Pantone 113</label>
<label className="color-shade">C: 0 M: 8 Y: 63 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f9e24c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9e24c")}>
<div className="color_sample" style={{backgroundColor: "#f9e24c"}}></div>
<label className="color-name">Pantone 114</label>
<label className="color-shade">C: 0 M: 9 Y: 69 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f9e04c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9e04c")}>
<div className="color_sample" style={{backgroundColor: "#f9e04c"}}></div>
<label className="color-name">Pantone 115</label>
<label className="color-shade">C: 0 M: 10 Y: 69 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#fcd116" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fcd116")}>
<div className="color_sample" style={{backgroundColor: "#fcd116"}}></div>
<label className="color-name">Pantone 116</label>
<label className="color-shade">C: 0 M: 17 Y: 91 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#c6a00c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c6a00c")}>
<div className="color_sample" style={{backgroundColor: "#c6a00c"}}></div>
<label className="color-name">Pantone 117</label>
<label className="color-shade">C: 0 M: 19 Y: 94 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#aa8e0a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aa8e0a")}>
<div className="color_sample" style={{backgroundColor: "#aa8e0a"}}></div>
<label className="color-name">Pantone 118</label>
<label className="color-shade">C: 0 M: 16 Y: 94 K: 33</label>
</button>
<button className="child" style={{border: selectedColor === "#897719" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#897719")}>
<div className="color_sample" style={{backgroundColor: "#897719"}}></div>
<label className="color-name">Pantone 119</label>
<label className="color-shade">C: 0 M: 13 Y: 82 K: 46</label>
</button>
<button className="child" style={{border: selectedColor === "#f9e27f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9e27f")}>
<div className="color_sample" style={{backgroundColor: "#f9e27f"}}></div>
<label className="color-name">Pantone 120</label>
<label className="color-shade">C: 0 M: 9 Y: 49 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f9e070" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9e070")}>
<div className="color_sample" style={{backgroundColor: "#f9e070"}}></div>
<label className="color-name">Pantone 121</label>
<label className="color-shade">C: 0 M: 10 Y: 55 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#fcd856" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fcd856")}>
<div className="color_sample" style={{backgroundColor: "#fcd856"}}></div>
<label className="color-name">Pantone 122</label>
<label className="color-shade">C: 0 M: 14 Y: 66 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#ffc61e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffc61e")}>
<div className="color_sample" style={{backgroundColor: "#ffc61e"}}></div>
<label className="color-name">Pantone 123</label>
<label className="color-shade">C: 0 M: 22 Y: 88 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#e0aa0f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e0aa0f")}>
<div className="color_sample" style={{backgroundColor: "#e0aa0f"}}></div>
<label className="color-name">Pantone 124</label>
<label className="color-shade">C: 0 M: 24 Y: 93 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#b58c0a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b58c0a")}>
<div className="color_sample" style={{backgroundColor: "#b58c0a"}}></div>
<label className="color-name">Pantone 125</label>
<label className="color-shade">C: 0 M: 23 Y: 94 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#a38205" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a38205")}>
<div className="color_sample" style={{backgroundColor: "#a38205"}}></div>
<label className="color-name">Pantone 126</label>
<label className="color-shade">C: 0 M: 20 Y: 97 K: 36</label>
</button>
<button className="child" style={{border: selectedColor === "#f4e287" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4e287")}>
<div className="color_sample" style={{backgroundColor: "#f4e287"}}></div>
<label className="color-name">Pantone 127</label>
<label className="color-shade">C: 0 M: 7 Y: 45 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#f4db60" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4db60")}>
<div className="color_sample" style={{backgroundColor: "#f4db60"}}></div>
<label className="color-name">Pantone 128</label>
<label className="color-shade">C: 0 M: 10 Y: 61 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#f2d13d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2d13d")}>
<div className="color_sample" style={{backgroundColor: "#f2d13d"}}></div>
<label className="color-name">Pantone 129</label>
<label className="color-shade">C: 0 M: 14 Y: 75 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#eaaf0f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#eaaf0f")}>
<div className="color_sample" style={{backgroundColor: "#eaaf0f"}}></div>
<label className="color-name">Pantone 130</label>
<label className="color-shade">C: 0 M: 25 Y: 94 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#c6930a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c6930a")}>
<div className="color_sample" style={{backgroundColor: "#c6930a"}}></div>
<label className="color-name">Pantone 131</label>
<label className="color-shade">C: 0 M: 26 Y: 95 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#9e7c0a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9e7c0a")}>
<div className="color_sample" style={{backgroundColor: "#9e7c0a"}}></div>
<label className="color-name">Pantone 132</label>
<label className="color-shade">C: 0 M: 22 Y: 94 K: 38</label>
</button>
<button className="child" style={{border: selectedColor === "#705b0a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#705b0a")}>
<div className="color_sample" style={{backgroundColor: "#705b0a"}}></div>
<label className="color-name">Pantone 133</label>
<label className="color-shade">C: 0 M: 19 Y: 91 K: 56</label>
</button>
<button className="child" style={{border: selectedColor === "#ffd87f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffd87f")}>
<div className="color_sample" style={{backgroundColor: "#ffd87f"}}></div>
<label className="color-name">Pantone 134</label>
<label className="color-shade">C: 0 M: 15 Y: 50 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#fcc963" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fcc963")}>
<div className="color_sample" style={{backgroundColor: "#fcc963"}}></div>
<label className="color-name">Pantone 135</label>
<label className="color-shade">C: 0 M: 20 Y: 61 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#fcbf49" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fcbf49")}>
<div className="color_sample" style={{backgroundColor: "#fcbf49"}}></div>
<label className="color-name">Pantone 136</label>
<label className="color-shade">C: 0 M: 24 Y: 71 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#fca311" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fca311")}>
<div className="color_sample" style={{backgroundColor: "#fca311"}}></div>
<label className="color-name">Pantone 137</label>
<label className="color-shade">C: 0 M: 35 Y: 93 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#d88c02" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d88c02")}>
<div className="color_sample" style={{backgroundColor: "#d88c02"}}></div>
<label className="color-name">Pantone 138</label>
<label className="color-shade">C: 0 M: 35 Y: 99 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#af7505" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#af7505")}>
<div className="color_sample" style={{backgroundColor: "#af7505"}}></div>
<label className="color-name">Pantone 139</label>
<label className="color-shade">C: 0 M: 33 Y: 97 K: 31</label>
</button>
<button className="child" style={{border: selectedColor === "#7a5b11" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7a5b11")}>
<div className="color_sample" style={{backgroundColor: "#7a5b11"}}></div>
<label className="color-name">Pantone 140</label>
<label className="color-shade">C: 0 M: 25 Y: 86 K: 52</label>
</button>
<button className="child" style={{border: selectedColor === "#f2ce68" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2ce68")}>
<div className="color_sample" style={{backgroundColor: "#f2ce68"}}></div>
<label className="color-name">Pantone 141</label>
<label className="color-shade">C: 0 M: 15 Y: 57 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#f2bf49" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2bf49")}>
<div className="color_sample" style={{backgroundColor: "#f2bf49"}}></div>
<label className="color-name">Pantone 142</label>
<label className="color-shade">C: 0 M: 21 Y: 70 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#efb22d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#efb22d")}>
<div className="color_sample" style={{backgroundColor: "#efb22d"}}></div>
<label className="color-name">Pantone 143</label>
<label className="color-shade">C: 0 M: 26 Y: 81 K: 6</label>
</button>
<button className="child" style={{border: selectedColor === "#e28c05" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e28c05")}>
<div className="color_sample" style={{backgroundColor: "#e28c05"}}></div>
<label className="color-name">Pantone 144</label>
<label className="color-shade">C: 0 M: 38 Y: 98 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#c67f07" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c67f07")}>
<div className="color_sample" style={{backgroundColor: "#c67f07"}}></div>
<label className="color-name">Pantone 145</label>
<label className="color-shade">C: 0 M: 36 Y: 96 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#9e6b05" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9e6b05")}>
<div className="color_sample" style={{backgroundColor: "#9e6b05"}}></div>
<label className="color-name">Pantone 146</label>
<label className="color-shade">C: 0 M: 32 Y: 97 K: 38</label>
</button>
<button className="child" style={{border: selectedColor === "#725e26" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#725e26")}>
<div className="color_sample" style={{backgroundColor: "#725e26"}}></div>
<label className="color-name">Pantone 147</label>
<label className="color-shade">C: 0 M: 18 Y: 67 K: 55</label>
</button>
<button className="child" style={{border: selectedColor === "#ffd69b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffd69b")}>
<div className="color_sample" style={{backgroundColor: "#ffd69b"}}></div>
<label className="color-name">Pantone 148</label>
<label className="color-shade">C: 0 M: 16 Y: 39 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#fccc93" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fccc93")}>
<div className="color_sample" style={{backgroundColor: "#fccc93"}}></div>
<label className="color-name">Pantone 149</label>
<label className="color-shade">C: 0 M: 19 Y: 42 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#fcad56" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fcad56")}>
<div className="color_sample" style={{backgroundColor: "#fcad56"}}></div>
<label className="color-name">Pantone 150</label>
<label className="color-shade">C: 0 M: 31 Y: 66 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#f77f00" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f77f00")}>
<div className="color_sample" style={{backgroundColor: "#f77f00"}}></div>
<label className="color-name">Pantone 151</label>
<label className="color-shade">C: 0 M: 49 Y: 100 K: 3</label>
</button>
<button className="child" style={{border: selectedColor === "#dd7500" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#dd7500")}>
<div className="color_sample" style={{backgroundColor: "#dd7500"}}></div>
<label className="color-name">Pantone 152</label>
<label className="color-shade">C: 0 M: 47 Y: 100 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#bc6d0a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bc6d0a")}>
<div className="color_sample" style={{backgroundColor: "#bc6d0a"}}></div>
<label className="color-name">Pantone 153</label>
<label className="color-shade">C: 0 M: 42 Y: 95 K: 26</label>
</button>
<button className="child" style={{border: selectedColor === "#995905" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#995905")}>
<div className="color_sample" style={{backgroundColor: "#995905"}}></div>
<label className="color-name">Pantone 154</label>
<label className="color-shade">C: 0 M: 42 Y: 97 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#f4dbaa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4dbaa")}>
<div className="color_sample" style={{backgroundColor: "#f4dbaa"}}></div>
<label className="color-name">Pantone 155</label>
<label className="color-shade">C: 0 M: 10 Y: 30 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#f2c68c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2c68c")}>
<div className="color_sample" style={{backgroundColor: "#f2c68c"}}></div>
<label className="color-name">Pantone 156</label>
<label className="color-shade">C: 0 M: 18 Y: 42 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#eda04f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#eda04f")}>
<div className="color_sample" style={{backgroundColor: "#eda04f"}}></div>
<label className="color-name">Pantone 157</label>
<label className="color-shade">C: 0 M: 32 Y: 67 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#e87511" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e87511")}>
<div className="color_sample" style={{backgroundColor: "#e87511"}}></div>
<label className="color-name">Pantone 158</label>
<label className="color-shade">C: 0 M: 50 Y: 93 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#c66005" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c66005")}>
<div className="color_sample" style={{backgroundColor: "#c66005"}}></div>
<label className="color-name">Pantone 159</label>
<label className="color-shade">C: 0 M: 52 Y: 97 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#9e540a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9e540a")}>
<div className="color_sample" style={{backgroundColor: "#9e540a"}}></div>
<label className="color-name">Pantone 160</label>
<label className="color-shade">C: 0 M: 47 Y: 94 K: 38</label>
</button>
<button className="child" style={{border: selectedColor === "#633a11" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#633a11")}>
<div className="color_sample" style={{backgroundColor: "#633a11"}}></div>
<label className="color-name">Pantone 161</label>
<label className="color-shade">C: 0 M: 41 Y: 83 K: 61</label>
</button>
<button className="child" style={{border: selectedColor === "#f9c6aa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9c6aa")}>
<div className="color_sample" style={{backgroundColor: "#f9c6aa"}}></div>
<label className="color-name">Pantone 162</label>
<label className="color-shade">C: 0 M: 20 Y: 32 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#fc9e70" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fc9e70")}>
<div className="color_sample" style={{backgroundColor: "#fc9e70"}}></div>
<label className="color-name">Pantone 163</label>
<label className="color-shade">C: 0 M: 37 Y: 56 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#fc7f3f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fc7f3f")}>
<div className="color_sample" style={{backgroundColor: "#fc7f3f"}}></div>
<label className="color-name">Pantone 164</label>
<label className="color-shade">C: 0 M: 50 Y: 75 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#f96302" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f96302")}>
<div className="color_sample" style={{backgroundColor: "#f96302"}}></div>
<label className="color-name">Pantone 165</label>
<label className="color-shade">C: 0 M: 60 Y: 99 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#dd5900" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#dd5900")}>
<div className="color_sample" style={{backgroundColor: "#dd5900"}}></div>
<label className="color-name">Pantone 166</label>
<label className="color-shade">C: 0 M: 60 Y: 100 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#bc4f07" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bc4f07")}>
<div className="color_sample" style={{backgroundColor: "#bc4f07"}}></div>
<label className="color-name">Pantone 167</label>
<label className="color-shade">C: 0 M: 58 Y: 96 K: 26</label>
</button>
<button className="child" style={{border: selectedColor === "#6d3011" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6d3011")}>
<div className="color_sample" style={{backgroundColor: "#6d3011"}}></div>
<label className="color-name">Pantone 168</label>
<label className="color-shade">C: 0 M: 56 Y: 84 K: 57</label>
</button>
<button className="child" style={{border: selectedColor === "#f9baaa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9baaa")}>
<div className="color_sample" style={{backgroundColor: "#f9baaa"}}></div>
<label className="color-name">Pantone 169</label>
<label className="color-shade">C: 0 M: 25 Y: 32 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f98972" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f98972")}>
<div className="color_sample" style={{backgroundColor: "#f98972"}}></div>
<label className="color-name">Pantone 170</label>
<label className="color-shade">C: 0 M: 45 Y: 54 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f9603a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9603a")}>
<div className="color_sample" style={{backgroundColor: "#f9603a"}}></div>
<label className="color-name">Pantone 171</label>
<label className="color-shade">C: 0 M: 61 Y: 77 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f74902" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f74902")}>
<div className="color_sample" style={{backgroundColor: "#f74902"}}></div>
<label className="color-name">Pantone 172</label>
<label className="color-shade">C: 0 M: 70 Y: 99 K: 3</label>
</button>
<button className="child" style={{border: selectedColor === "#d14414" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d14414")}>
<div className="color_sample" style={{backgroundColor: "#d14414"}}></div>
<label className="color-name">Pantone 173</label>
<label className="color-shade">C: 0 M: 67 Y: 90 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#933311" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#933311")}>
<div className="color_sample" style={{backgroundColor: "#933311"}}></div>
<label className="color-name">Pantone 174</label>
<label className="color-shade">C: 0 M: 65 Y: 88 K: 42</label>
</button>
<button className="child" style={{border: selectedColor === "#6d3321" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6d3321")}>
<div className="color_sample" style={{backgroundColor: "#6d3321"}}></div>
<label className="color-name">Pantone 175</label>
<label className="color-shade">C: 0 M: 53 Y: 70 K: 57</label>
</button>
<button className="child" style={{border: selectedColor === "#f9afad" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9afad")}>
<div className="color_sample" style={{backgroundColor: "#f9afad"}}></div>
<label className="color-name">Pantone 176</label>
<label className="color-shade">C: 0 M: 30 Y: 31 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f9827f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9827f")}>
<div className="color_sample" style={{backgroundColor: "#f9827f"}}></div>
<label className="color-name">Pantone 177</label>
<label className="color-shade">C: 0 M: 48 Y: 49 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f95e59" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f95e59")}>
<div className="color_sample" style={{backgroundColor: "#f95e59"}}></div>
<label className="color-name">Pantone 178</label>
<label className="color-shade">C: 0 M: 62 Y: 64 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#e23d28" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e23d28")}>
<div className="color_sample" style={{backgroundColor: "#e23d28"}}></div>
<label className="color-name">Pantone 179</label>
<label className="color-shade">C: 0 M: 73 Y: 82 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#c13828" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c13828")}>
<div className="color_sample" style={{backgroundColor: "#c13828"}}></div>
<label className="color-name">Pantone 180</label>
<label className="color-shade">C: 0 M: 71 Y: 79 K: 24</label>
</button>
<button className="child" style={{border: selectedColor === "#7c2d23" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7c2d23")}>
<div className="color_sample" style={{backgroundColor: "#7c2d23"}}></div>
<label className="color-name">Pantone 181</label>
<label className="color-shade">C: 0 M: 64 Y: 72 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#f9bfc1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9bfc1")}>
<div className="color_sample" style={{backgroundColor: "#f9bfc1"}}></div>
<label className="color-name">Pantone 182</label>
<label className="color-shade">C: 0 M: 23 Y: 22 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#fc8c99" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fc8c99")}>
<div className="color_sample" style={{backgroundColor: "#fc8c99"}}></div>
<label className="color-name">Pantone 183</label>
<label className="color-shade">C: 0 M: 44 Y: 39 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#fc5e72" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fc5e72")}>
<div className="color_sample" style={{backgroundColor: "#fc5e72"}}></div>
<label className="color-name">Pantone 184</label>
<label className="color-shade">C: 0 M: 63 Y: 55 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#e8112d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e8112d")}>
<div className="color_sample" style={{backgroundColor: "#e8112d"}}></div>
<label className="color-name">Pantone 185</label>
<label className="color-shade">C: 0 M: 93 Y: 81 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#ce1126" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ce1126")}>
<div className="color_sample" style={{backgroundColor: "#ce1126"}}></div>
<label className="color-name">Pantone 186</label>
<label className="color-shade">C: 0 M: 92 Y: 82 K: 19</label>
</button>
<button className="child" style={{border: selectedColor === "#af1e2d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#af1e2d")}>
<div className="color_sample" style={{backgroundColor: "#af1e2d"}}></div>
<label className="color-name">Pantone 187</label>
<label className="color-shade">C: 0 M: 83 Y: 74 K: 31</label>
</button>
<button className="child" style={{border: selectedColor === "#7c2128" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7c2128")}>
<div className="color_sample" style={{backgroundColor: "#7c2128"}}></div>
<label className="color-name">Pantone 188</label>
<label className="color-shade">C: 0 M: 73 Y: 68 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#ffa3b2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffa3b2")}>
<div className="color_sample" style={{backgroundColor: "#ffa3b2"}}></div>
<label className="color-name">Pantone 189</label>
<label className="color-shade">C: 0 M: 36 Y: 30 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#fc758e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fc758e")}>
<div className="color_sample" style={{backgroundColor: "#fc758e"}}></div>
<label className="color-name">Pantone 190</label>
<label className="color-shade">C: 0 M: 54 Y: 44 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#f4476b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4476b")}>
<div className="color_sample" style={{backgroundColor: "#f4476b"}}></div>
<label className="color-name">Pantone 191</label>
<label className="color-shade">C: 0 M: 71 Y: 56 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#e5053a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e5053a")}>
<div className="color_sample" style={{backgroundColor: "#e5053a"}}></div>
<label className="color-name">Pantone 192</label>
<label className="color-shade">C: 0 M: 98 Y: 75 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#db828c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#db828c")}>
<div className="color_sample" style={{backgroundColor: "#db828c"}}></div>
<label className="color-name">Pantone 193</label>
<label className="color-shade">C: 0 M: 41 Y: 36 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#992135" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#992135")}>
<div className="color_sample" style={{backgroundColor: "#992135"}}></div>
<label className="color-name">Pantone 194</label>
<label className="color-shade">C: 0 M: 78 Y: 65 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#f4c9c9" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4c9c9")}>
<div className="color_sample" style={{backgroundColor: "#f4c9c9"}}></div>
<label className="color-name">Pantone 196</label>
<label className="color-shade">C: 0 M: 18 Y: 18 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#ef99a3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ef99a3")}>
<div className="color_sample" style={{backgroundColor: "#ef99a3"}}></div>
<label className="color-name">Pantone 197</label>
<label className="color-shade">C: 0 M: 36 Y: 32 K: 6</label>
</button>
<button className="child" style={{border: selectedColor === "#772d35" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#772d35")}>
<div className="color_sample" style={{backgroundColor: "#772d35"}}></div>
<label className="color-name">Pantone 198</label>
<label className="color-shade">C: 0 M: 62 Y: 55 K: 53</label>
</button>
<button className="child" style={{border: selectedColor === "#d81c3f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d81c3f")}>
<div className="color_sample" style={{backgroundColor: "#d81c3f"}}></div>
<label className="color-name">Pantone 199</label>
<label className="color-shade">C: 0 M: 87 Y: 71 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#c41e3a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c41e3a")}>
<div className="color_sample" style={{backgroundColor: "#c41e3a"}}></div>
<label className="color-name">Pantone 200</label>
<label className="color-shade">C: 0 M: 85 Y: 70 K: 23</label>
</button>
<button className="child" style={{border: selectedColor === "#a32638" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a32638")}>
<div className="color_sample" style={{backgroundColor: "#a32638"}}></div>
<label className="color-name">Pantone 201</label>
<label className="color-shade">C: 0 M: 77 Y: 66 K: 36</label>
</button>
<button className="child" style={{border: selectedColor === "#8c2633" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8c2633")}>
<div className="color_sample" style={{backgroundColor: "#8c2633"}}></div>
<label className="color-name">Pantone 202</label>
<label className="color-shade">C: 0 M: 73 Y: 64 K: 45</label>
</button>
<button className="child" style={{border: selectedColor === "#f2afc1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2afc1")}>
<div className="color_sample" style={{backgroundColor: "#f2afc1"}}></div>
<label className="color-name">Pantone 203</label>
<label className="color-shade">C: 0 M: 28 Y: 20 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#ed7a9e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ed7a9e")}>
<div className="color_sample" style={{backgroundColor: "#ed7a9e"}}></div>
<label className="color-name">Pantone 204</label>
<label className="color-shade">C: 0 M: 49 Y: 33 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#e54c7c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e54c7c")}>
<div className="color_sample" style={{backgroundColor: "#e54c7c"}}></div>
<label className="color-name">Pantone 205</label>
<label className="color-shade">C: 0 M: 67 Y: 46 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#d30547" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d30547")}>
<div className="color_sample" style={{backgroundColor: "#d30547"}}></div>
<label className="color-name">Pantone 206</label>
<label className="color-shade">C: 0 M: 98 Y: 66 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#baaa9e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#baaa9e")}>
<div className="color_sample" style={{backgroundColor: "#baaa9e"}}></div>
<label className="color-name">Pantone 207</label>
<label className="color-shade">C: 0 M: 9 Y: 15 K: 27</label>
</button>
<button className="child" style={{border: selectedColor === "#8e2344" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8e2344")}>
<div className="color_sample" style={{backgroundColor: "#8e2344"}}></div>
<label className="color-name">Pantone 208</label>
<label className="color-shade">C: 0 M: 75 Y: 52 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#75263d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#75263d")}>
<div className="color_sample" style={{backgroundColor: "#75263d"}}></div>
<label className="color-name">Pantone 209</label>
<label className="color-shade">C: 0 M: 68 Y: 48 K: 54</label>
</button>
<button className="child" style={{border: selectedColor === "#ffa0bf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffa0bf")}>
<div className="color_sample" style={{backgroundColor: "#ffa0bf"}}></div>
<label className="color-name">Pantone 210</label>
<label className="color-shade">C: 0 M: 37 Y: 25 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#ff77a8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ff77a8")}>
<div className="color_sample" style={{backgroundColor: "#ff77a8"}}></div>
<label className="color-name">Pantone 211</label>
<label className="color-shade">C: 0 M: 53 Y: 34 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#f94f8e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f94f8e")}>
<div className="color_sample" style={{backgroundColor: "#f94f8e"}}></div>
<label className="color-name">Pantone 212</label>
<label className="color-shade">C: 0 M: 68 Y: 43 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#ea0f6b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ea0f6b")}>
<div className="color_sample" style={{backgroundColor: "#ea0f6b"}}></div>
<label className="color-name">Pantone 213</label>
<label className="color-shade">C: 0 M: 94 Y: 54 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#cc0256" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#cc0256")}>
<div className="color_sample" style={{backgroundColor: "#cc0256"}}></div>
<label className="color-name">Pantone 214</label>
<label className="color-shade">C: 0 M: 99 Y: 58 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#a50544" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a50544")}>
<div className="color_sample" style={{backgroundColor: "#a50544"}}></div>
<label className="color-name">Pantone 215</label>
<label className="color-shade">C: 0 M: 97 Y: 59 K: 35</label>
</button>
<button className="child" style={{border: selectedColor === "#7c1e3f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7c1e3f")}>
<div className="color_sample" style={{backgroundColor: "#7c1e3f"}}></div>
<label className="color-name">Pantone 216</label>
<label className="color-shade">C: 0 M: 76 Y: 49 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#f4bfd1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4bfd1")}>
<div className="color_sample" style={{backgroundColor: "#f4bfd1"}}></div>
<label className="color-name">Pantone 217</label>
<label className="color-shade">C: 0 M: 22 Y: 14 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#ed72aa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ed72aa")}>
<div className="color_sample" style={{backgroundColor: "#ed72aa"}}></div>
<label className="color-name">Pantone 218</label>
<label className="color-shade">C: 0 M: 52 Y: 28 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#e22882" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e22882")}>
<div className="color_sample" style={{backgroundColor: "#e22882"}}></div>
<label className="color-name">Pantone 219</label>
<label className="color-shade">C: 0 M: 82 Y: 42 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#aa004f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aa004f")}>
<div className="color_sample" style={{backgroundColor: "#aa004f"}}></div>
<label className="color-name">Pantone 220</label>
<label className="color-shade">C: 0 M: 100 Y: 54 K: 33</label>
</button>
<button className="child" style={{border: selectedColor === "#930042" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#930042")}>
<div className="color_sample" style={{backgroundColor: "#930042"}}></div>
<label className="color-name">Pantone 221</label>
<label className="color-shade">C: 0 M: 100 Y: 55 K: 42</label>
</button>
<button className="child" style={{border: selectedColor === "#70193d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#70193d")}>
<div className="color_sample" style={{backgroundColor: "#70193d"}}></div>
<label className="color-name">Pantone 222</label>
<label className="color-shade">C: 0 M: 78 Y: 46 K: 56</label>
</button>
<button className="child" style={{border: selectedColor === "#f993c4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f993c4")}>
<div className="color_sample" style={{backgroundColor: "#f993c4"}}></div>
<label className="color-name">Pantone 223</label>
<label className="color-shade">C: 0 M: 41 Y: 21 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f46baf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f46baf")}>
<div className="color_sample" style={{backgroundColor: "#f46baf"}}></div>
<label className="color-name">Pantone 224</label>
<label className="color-shade">C: 0 M: 56 Y: 28 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#ed2893" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ed2893")}>
<div className="color_sample" style={{backgroundColor: "#ed2893"}}></div>
<label className="color-name">Pantone 225</label>
<label className="color-shade">C: 0 M: 83 Y: 38 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#d60270" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d60270")}>
<div className="color_sample" style={{backgroundColor: "#d60270"}}></div>
<label className="color-name">Pantone 226</label>
<label className="color-shade">C: 0 M: 99 Y: 48 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#ad005b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ad005b")}>
<div className="color_sample" style={{backgroundColor: "#ad005b"}}></div>
<label className="color-name">Pantone 227</label>
<label className="color-shade">C: 0 M: 100 Y: 47 K: 32</label>
</button>
<button className="child" style={{border: selectedColor === "#8c004c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8c004c")}>
<div className="color_sample" style={{backgroundColor: "#8c004c"}}></div>
<label className="color-name">Pantone 228</label>
<label className="color-shade">C: 0 M: 100 Y: 46 K: 45</label>
</button>
<button className="child" style={{border: selectedColor === "#6d213f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6d213f")}>
<div className="color_sample" style={{backgroundColor: "#6d213f"}}></div>
<label className="color-name">Pantone 229</label>
<label className="color-shade">C: 0 M: 70 Y: 42 K: 57</label>
</button>
<button className="child" style={{border: selectedColor === "#ffa0cc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffa0cc")}>
<div className="color_sample" style={{backgroundColor: "#ffa0cc"}}></div>
<label className="color-name">Pantone 230</label>
<label className="color-shade">C: 0 M: 37 Y: 20 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#fc70ba" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fc70ba")}>
<div className="color_sample" style={{backgroundColor: "#fc70ba"}}></div>
<label className="color-name">Pantone 231</label>
<label className="color-shade">C: 0 M: 56 Y: 26 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#f43fa5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f43fa5")}>
<div className="color_sample" style={{backgroundColor: "#f43fa5"}}></div>
<label className="color-name">Pantone 232</label>
<label className="color-shade">C: 0 M: 74 Y: 32 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#ce007c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ce007c")}>
<div className="color_sample" style={{backgroundColor: "#ce007c"}}></div>
<label className="color-name">Pantone 233</label>
<label className="color-shade">C: 0 M: 100 Y: 40 K: 19</label>
</button>
<button className="child" style={{border: selectedColor === "#aa0066" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aa0066")}>
<div className="color_sample" style={{backgroundColor: "#aa0066"}}></div>
<label className="color-name">Pantone 234</label>
<label className="color-shade">C: 0 M: 100 Y: 40 K: 33</label>
</button>
<button className="child" style={{border: selectedColor === "#8e0554" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8e0554")}>
<div className="color_sample" style={{backgroundColor: "#8e0554"}}></div>
<label className="color-name">Pantone 235</label>
<label className="color-shade">C: 0 M: 96 Y: 41 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#f9afd3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9afd3")}>
<div className="color_sample" style={{backgroundColor: "#f9afd3"}}></div>
<label className="color-name">Pantone 236</label>
<label className="color-shade">C: 0 M: 30 Y: 15 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f484c4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f484c4")}>
<div className="color_sample" style={{backgroundColor: "#f484c4"}}></div>
<label className="color-name">Pantone 237</label>
<label className="color-shade">C: 0 M: 46 Y: 20 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#ed4faf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ed4faf")}>
<div className="color_sample" style={{backgroundColor: "#ed4faf"}}></div>
<label className="color-name">Pantone 238</label>
<label className="color-shade">C: 0 M: 67 Y: 26 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#e0219e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e0219e")}>
<div className="color_sample" style={{backgroundColor: "#e0219e"}}></div>
<label className="color-name">Pantone 239</label>
<label className="color-shade">C: 0 M: 85 Y: 29 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#c40f89" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c40f89")}>
<div className="color_sample" style={{backgroundColor: "#c40f89"}}></div>
<label className="color-name">Pantone 240</label>
<label className="color-shade">C: 0 M: 92 Y: 30 K: 23</label>
</button>
<button className="child" style={{border: selectedColor === "#ad0075" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ad0075")}>
<div className="color_sample" style={{backgroundColor: "#ad0075"}}></div>
<label className="color-name">Pantone 241</label>
<label className="color-shade">C: 0 M: 100 Y: 32 K: 32</label>
</button>
<button className="child" style={{border: selectedColor === "#7c1c51" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7c1c51")}>
<div className="color_sample" style={{backgroundColor: "#7c1c51"}}></div>
<label className="color-name">Pantone 242</label>
<label className="color-shade">C: 0 M: 77 Y: 35 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#f2bad8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2bad8")}>
<div className="color_sample" style={{backgroundColor: "#f2bad8"}}></div>
<label className="color-name">Pantone 243</label>
<label className="color-shade">C: 0 M: 23 Y: 11 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#eda0d3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#eda0d3")}>
<div className="color_sample" style={{backgroundColor: "#eda0d3"}}></div>
<label className="color-name">Pantone 244</label>
<label className="color-shade">C: 0 M: 32 Y: 11 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#e87fc9" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e87fc9")}>
<div className="color_sample" style={{backgroundColor: "#e87fc9"}}></div>
<label className="color-name">Pantone 245</label>
<label className="color-shade">C: 0 M: 45 Y: 13 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#cc00a0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#cc00a0")}>
<div className="color_sample" style={{backgroundColor: "#cc00a0"}}></div>
<label className="color-name">Pantone 246</label>
<label className="color-shade">C: 0 M: 100 Y: 22 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#b7008e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b7008e")}>
<div className="color_sample" style={{backgroundColor: "#b7008e"}}></div>
<label className="color-name">Pantone 247</label>
<label className="color-shade">C: 0 M: 100 Y: 22 K: 28</label>
</button>
<button className="child" style={{border: selectedColor === "#a3057f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a3057f")}>
<div className="color_sample" style={{backgroundColor: "#a3057f"}}></div>
<label className="color-name">Pantone 248</label>
<label className="color-shade">C: 0 M: 97 Y: 22 K: 36</label>
</button>
<button className="child" style={{border: selectedColor === "#7f2860" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7f2860")}>
<div className="color_sample" style={{backgroundColor: "#7f2860"}}></div>
<label className="color-name">Pantone 249</label>
<label className="color-shade">C: 0 M: 69 Y: 24 K: 50</label>
</button>
<button className="child" style={{border: selectedColor === "#edc4dd" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#edc4dd")}>
<div className="color_sample" style={{backgroundColor: "#edc4dd"}}></div>
<label className="color-name">Pantone 250</label>
<label className="color-shade">C: 0 M: 17 Y: 7 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#e29ed6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e29ed6")}>
<div className="color_sample" style={{backgroundColor: "#e29ed6"}}></div>
<label className="color-name">Pantone 251</label>
<label className="color-shade">C: 0 M: 30 Y: 5 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#d36bc6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d36bc6")}>
<div className="color_sample" style={{backgroundColor: "#d36bc6"}}></div>
<label className="color-name">Pantone 252</label>
<label className="color-shade">C: 0 M: 49 Y: 6 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#af23a5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#af23a5")}>
<div className="color_sample" style={{backgroundColor: "#af23a5"}}></div>
<label className="color-name">Pantone 253</label>
<label className="color-shade">C: 0 M: 80 Y: 6 K: 31</label>
</button>
<button className="child" style={{border: selectedColor === "#a02d96" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a02d96")}>
<div className="color_sample" style={{backgroundColor: "#a02d96"}}></div>
<label className="color-name">Pantone 254</label>
<label className="color-shade">C: 0 M: 72 Y: 6 K: 37</label>
</button>
<button className="child" style={{border: selectedColor === "#772d6b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#772d6b")}>
<div className="color_sample" style={{backgroundColor: "#772d6b"}}></div>
<label className="color-name">Pantone 255</label>
<label className="color-shade">C: 0 M: 62 Y: 10 K: 53</label>
</button>
<button className="child" style={{border: selectedColor === "#e5c4d6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e5c4d6")}>
<div className="color_sample" style={{backgroundColor: "#e5c4d6"}}></div>
<label className="color-name">Pantone 256</label>
<label className="color-shade">C: 0 M: 14 Y: 7 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#d3a5c9" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d3a5c9")}>
<div className="color_sample" style={{backgroundColor: "#d3a5c9"}}></div>
<label className="color-name">Pantone 257</label>
<label className="color-shade">C: 0 M: 22 Y: 5 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#9b4f96" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9b4f96")}>
<div className="color_sample" style={{backgroundColor: "#9b4f96"}}></div>
<label className="color-name">Pantone 258</label>
<label className="color-shade">C: 0 M: 49 Y: 3 K: 39</label>
</button>
<button className="child" style={{border: selectedColor === "#72166b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#72166b")}>
<div className="color_sample" style={{backgroundColor: "#72166b"}}></div>
<label className="color-name">Pantone 259</label>
<label className="color-shade">C: 0 M: 81 Y: 6 K: 55</label>
</button>
<button className="child" style={{border: selectedColor === "#681e5b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#681e5b")}>
<div className="color_sample" style={{backgroundColor: "#681e5b"}}></div>
<label className="color-name">Pantone 260</label>
<label className="color-shade">C: 0 M: 71 Y: 12 K: 59</label>
</button>
<button className="child" style={{border: selectedColor === "#5e2154" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5e2154")}>
<div className="color_sample" style={{backgroundColor: "#5e2154"}}></div>
<label className="color-name">Pantone 261</label>
<label className="color-shade">C: 0 M: 65 Y: 11 K: 63</label>
</button>
<button className="child" style={{border: selectedColor === "#542344" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#542344")}>
<div className="color_sample" style={{backgroundColor: "#542344"}}></div>
<label className="color-name">Pantone 262</label>
<label className="color-shade">C: 0 M: 58 Y: 19 K: 67</label>
</button>
<button className="child" style={{border: selectedColor === "#e0cee0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e0cee0")}>
<div className="color_sample" style={{backgroundColor: "#e0cee0"}}></div>
<label className="color-name">Pantone 263</label>
<label className="color-shade">C: 0 M: 8 Y: 0 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#c6aadb" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c6aadb")}>
<div className="color_sample" style={{backgroundColor: "#c6aadb"}}></div>
<label className="color-name">Pantone 264</label>
<label className="color-shade">C: 10 M: 22 Y: 0 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#9663c4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9663c4")}>
<div className="color_sample" style={{backgroundColor: "#9663c4"}}></div>
<label className="color-name">Pantone 265</label>
<label className="color-shade">C: 23 M: 49 Y: 0 K: 23</label>
</button>
<button className="child" style={{border: selectedColor === "#6d28aa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6d28aa")}>
<div className="color_sample" style={{backgroundColor: "#6d28aa"}}></div>
<label className="color-name">Pantone 266</label>
<label className="color-shade">C: 36 M: 76 Y: 0 K: 33</label>
</button>
<button className="child" style={{border: selectedColor === "#59118e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#59118e")}>
<div className="color_sample" style={{backgroundColor: "#59118e"}}></div>
<label className="color-name">Pantone 267</label>
<label className="color-shade">C: 37 M: 88 Y: 0 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#4f2170" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#4f2170")}>
<div className="color_sample" style={{backgroundColor: "#4f2170"}}></div>
<label className="color-name">Pantone 268</label>
<label className="color-shade">C: 29 M: 71 Y: 0 K: 56</label>
</button>
<button className="child" style={{border: selectedColor === "#442359" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#442359")}>
<div className="color_sample" style={{backgroundColor: "#442359"}}></div>
<label className="color-name">Pantone 269</label>
<label className="color-shade">C: 24 M: 61 Y: 0 K: 65</label>
</button>
<button className="child" style={{border: selectedColor === "#baafd3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#baafd3")}>
<div className="color_sample" style={{backgroundColor: "#baafd3"}}></div>
<label className="color-name">Pantone 270</label>
<label className="color-shade">C: 12 M: 17 Y: 0 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#9e91c6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9e91c6")}>
<div className="color_sample" style={{backgroundColor: "#9e91c6"}}></div>
<label className="color-name">Pantone 271</label>
<label className="color-shade">C: 20 M: 27 Y: 0 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#8977ba" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8977ba")}>
<div className="color_sample" style={{backgroundColor: "#8977ba"}}></div>
<label className="color-name">Pantone 272</label>
<label className="color-shade">C: 26 M: 36 Y: 0 K: 27</label>
</button>
<button className="child" style={{border: selectedColor === "#38197a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#38197a")}>
<div className="color_sample" style={{backgroundColor: "#38197a"}}></div>
<label className="color-name">Pantone 273</label>
<label className="color-shade">C: 54 M: 80 Y: 0 K: 52</label>
</button>
<button className="child" style={{border: selectedColor === "#2b1166" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#2b1166")}>
<div className="color_sample" style={{backgroundColor: "#2b1166"}}></div>
<label className="color-name">Pantone 274</label>
<label className="color-shade">C: 58 M: 83 Y: 0 K: 60</label>
</button>
<button className="child" style={{border: selectedColor === "#260f54" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#260f54")}>
<div className="color_sample" style={{backgroundColor: "#260f54"}}></div>
<label className="color-name">Pantone 275</label>
<label className="color-shade">C: 55 M: 82 Y: 0 K: 67</label>
</button>
<button className="child" style={{border: selectedColor === "#2b2147" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#2b2147")}>
<div className="color_sample" style={{backgroundColor: "#2b2147"}}></div>
<label className="color-name">Pantone 276</label>
<label className="color-shade">C: 39 M: 54 Y: 0 K: 72</label>
</button>
<button className="child" style={{border: selectedColor === "#b5d1e8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b5d1e8")}>
<div className="color_sample" style={{backgroundColor: "#b5d1e8"}}></div>
<label className="color-name">Pantone 277</label>
<label className="color-shade">C: 22 M: 10 Y: 0 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#99badd" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#99badd")}>
<div className="color_sample" style={{backgroundColor: "#99badd"}}></div>
<label className="color-name">Pantone 278</label>
<label className="color-shade">C: 31 M: 16 Y: 0 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#6689cc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6689cc")}>
<div className="color_sample" style={{backgroundColor: "#6689cc"}}></div>
<label className="color-name">Pantone 279</label>
<label className="color-shade">C: 50 M: 33 Y: 0 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#002b7f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#002b7f")}>
<div className="color_sample" style={{backgroundColor: "#002b7f"}}></div>
<label className="color-name">Pantone 280</label>
<label className="color-shade">C: 100 M: 66 Y: 0 K: 50</label>
</button>
<button className="child" style={{border: selectedColor === "#002868" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#002868")}>
<div className="color_sample" style={{backgroundColor: "#002868"}}></div>
<label className="color-name">Pantone 281</label>
<label className="color-shade">C: 100 M: 62 Y: 0 K: 59</label>
</button>
<button className="child" style={{border: selectedColor === "#002654" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#002654")}>
<div className="color_sample" style={{backgroundColor: "#002654"}}></div>
<label className="color-name">Pantone 282</label>
<label className="color-shade">C: 100 M: 55 Y: 0 K: 67</label>
</button>
<button className="child" style={{border: selectedColor === "#9bc4e2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9bc4e2")}>
<div className="color_sample" style={{backgroundColor: "#9bc4e2"}}></div>
<label className="color-name">Pantone 283</label>
<label className="color-shade">C: 31 M: 13 Y: 0 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#75aadb" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#75aadb")}>
<div className="color_sample" style={{backgroundColor: "#75aadb"}}></div>
<label className="color-name">Pantone 284</label>
<label className="color-shade">C: 47 M: 22 Y: 0 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#3a75c4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#3a75c4")}>
<div className="color_sample" style={{backgroundColor: "#3a75c4"}}></div>
<label className="color-name">Pantone 285</label>
<label className="color-shade">C: 70 M: 40 Y: 0 K: 23</label>
</button>
<button className="child" style={{border: selectedColor === "#0038a8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#0038a8")}>
<div className="color_sample" style={{backgroundColor: "#0038a8"}}></div>
<label className="color-name">Pantone 286</label>
<label className="color-shade">C: 100 M: 67 Y: 0 K: 34</label>
</button>
<button className="child" style={{border: selectedColor === "#003893" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#003893")}>
<div className="color_sample" style={{backgroundColor: "#003893"}}></div>
<label className="color-name">Pantone 287</label>
<label className="color-shade">C: 100 M: 62 Y: 0 K: 42</label>
</button>
<button className="child" style={{border: selectedColor === "#00337f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00337f")}>
<div className="color_sample" style={{backgroundColor: "#00337f"}}></div>
<label className="color-name">Pantone 288</label>
<label className="color-shade">C: 100 M: 60 Y: 0 K: 50</label>
</button>
<button className="child" style={{border: selectedColor === "#002649" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#002649")}>
<div className="color_sample" style={{backgroundColor: "#002649"}}></div>
<label className="color-name">Pantone 289</label>
<label className="color-shade">C: 100 M: 48 Y: 0 K: 71</label>
</button>
<button className="child" style={{border: selectedColor === "#c4d8e2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c4d8e2")}>
<div className="color_sample" style={{backgroundColor: "#c4d8e2"}}></div>
<label className="color-name">Pantone 290</label>
<label className="color-shade">C: 13 M: 4 Y: 0 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#a8cee2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a8cee2")}>
<div className="color_sample" style={{backgroundColor: "#a8cee2"}}></div>
<label className="color-name">Pantone 291</label>
<label className="color-shade">C: 26 M: 9 Y: 0 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#75b2dd" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#75b2dd")}>
<div className="color_sample" style={{backgroundColor: "#75b2dd"}}></div>
<label className="color-name">Pantone 292</label>
<label className="color-shade">C: 47 M: 19 Y: 0 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#0051ba" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#0051ba")}>
<div className="color_sample" style={{backgroundColor: "#0051ba"}}></div>
<label className="color-name">Pantone 293</label>
<label className="color-shade">C: 100 M: 56 Y: 0 K: 27</label>
</button>
<button className="child" style={{border: selectedColor === "#003f87" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#003f87")}>
<div className="color_sample" style={{backgroundColor: "#003f87"}}></div>
<label className="color-name">Pantone 294</label>
<label className="color-shade">C: 100 M: 53 Y: 0 K: 47</label>
</button>
<button className="child" style={{border: selectedColor === "#00386b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00386b")}>
<div className="color_sample" style={{backgroundColor: "#00386b"}}></div>
<label className="color-name">Pantone 295</label>
<label className="color-shade">C: 100 M: 48 Y: 0 K: 58</label>
</button>
<button className="child" style={{border: selectedColor === "#002d47" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#002d47")}>
<div className="color_sample" style={{backgroundColor: "#002d47"}}></div>
<label className="color-name">Pantone 296</label>
<label className="color-shade">C: 100 M: 37 Y: 0 K: 72</label>
</button>
<button className="child" style={{border: selectedColor === "#82c6e2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#82c6e2")}>
<div className="color_sample" style={{backgroundColor: "#82c6e2"}}></div>
<label className="color-name">Pantone 297</label>
<label className="color-shade">C: 42 M: 12 Y: 0 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#51b5e0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#51b5e0")}>
<div className="color_sample" style={{backgroundColor: "#51b5e0"}}></div>
<label className="color-name">Pantone 298</label>
<label className="color-shade">C: 64 M: 19 Y: 0 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#00a3dd" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00a3dd")}>
<div className="color_sample" style={{backgroundColor: "#00a3dd"}}></div>
<label className="color-name">Pantone 299</label>
<label className="color-shade">C: 100 M: 26 Y: 0 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#0072c6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#0072c6")}>
<div className="color_sample" style={{backgroundColor: "#0072c6"}}></div>
<label className="color-name">Pantone 300</label>
<label className="color-shade">C: 100 M: 42 Y: 0 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#005b99" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#005b99")}>
<div className="color_sample" style={{backgroundColor: "#005b99"}}></div>
<label className="color-name">Pantone 301</label>
<label className="color-shade">C: 100 M: 41 Y: 0 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#004f6d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#004f6d")}>
<div className="color_sample" style={{backgroundColor: "#004f6d"}}></div>
<label className="color-name">Pantone 302</label>
<label className="color-shade">C: 100 M: 28 Y: 0 K: 57</label>
</button>
<button className="child" style={{border: selectedColor === "#003f54" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#003f54")}>
<div className="color_sample" style={{backgroundColor: "#003f54"}}></div>
<label className="color-name">Pantone 303</label>
<label className="color-shade">C: 100 M: 25 Y: 0 K: 67</label>
</button>
<button className="child" style={{border: selectedColor === "#a5dde2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a5dde2")}>
<div className="color_sample" style={{backgroundColor: "#a5dde2"}}></div>
<label className="color-name">Pantone 304</label>
<label className="color-shade">C: 27 M: 2 Y: 0 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#70cee2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#70cee2")}>
<div className="color_sample" style={{backgroundColor: "#70cee2"}}></div>
<label className="color-name">Pantone 305</label>
<label className="color-shade">C: 50 M: 9 Y: 0 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#00bce2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00bce2")}>
<div className="color_sample" style={{backgroundColor: "#00bce2"}}></div>
<label className="color-name">Pantone 306</label>
<label className="color-shade">C: 100 M: 17 Y: 0 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#007aa5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#007aa5")}>
<div className="color_sample" style={{backgroundColor: "#007aa5"}}></div>
<label className="color-name">Pantone 307</label>
<label className="color-shade">C: 100 M: 26 Y: 0 K: 35</label>
</button>
<button className="child" style={{border: selectedColor === "#00607c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00607c")}>
<div className="color_sample" style={{backgroundColor: "#00607c"}}></div>
<label className="color-name">Pantone 308</label>
<label className="color-shade">C: 100 M: 23 Y: 0 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#003f49" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#003f49")}>
<div className="color_sample" style={{backgroundColor: "#003f49"}}></div>
<label className="color-name">Pantone 309</label>
<label className="color-shade">C: 100 M: 14 Y: 0 K: 71</label>
</button>
<button className="child" style={{border: selectedColor === "#72d1dd" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#72d1dd")}>
<div className="color_sample" style={{backgroundColor: "#72d1dd"}}></div>
<label className="color-name">Pantone 310</label>
<label className="color-shade">C: 48 M: 5 Y: 0 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#28c4d8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#28c4d8")}>
<div className="color_sample" style={{backgroundColor: "#28c4d8"}}></div>
<label className="color-name">Pantone 311</label>
<label className="color-shade">C: 81 M: 9 Y: 0 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#00adc6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00adc6")}>
<div className="color_sample" style={{backgroundColor: "#00adc6"}}></div>
<label className="color-name">Pantone 312</label>
<label className="color-shade">C: 100 M: 13 Y: 0 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#0099b5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#0099b5")}>
<div className="color_sample" style={{backgroundColor: "#0099b5"}}></div>
<label className="color-name">Pantone 313</label>
<label className="color-shade">C: 100 M: 15 Y: 0 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#00829b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00829b")}>
<div className="color_sample" style={{backgroundColor: "#00829b"}}></div>
<label className="color-name">Pantone 314</label>
<label className="color-shade">C: 100 M: 16 Y: 0 K: 39</label>
</button>
<button className="child" style={{border: selectedColor === "#006b77" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#006b77")}>
<div className="color_sample" style={{backgroundColor: "#006b77"}}></div>
<label className="color-name">Pantone 315</label>
<label className="color-shade">C: 100 M: 10 Y: 0 K: 53</label>
</button>
<button className="child" style={{border: selectedColor === "#00494f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00494f")}>
<div className="color_sample" style={{backgroundColor: "#00494f"}}></div>
<label className="color-name">Pantone 316</label>
<label className="color-shade">C: 100 M: 8 Y: 0 K: 69</label>
</button>
<button className="child" style={{border: selectedColor === "#c9e8dd" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c9e8dd")}>
<div className="color_sample" style={{backgroundColor: "#c9e8dd"}}></div>
<label className="color-name">Pantone 317</label>
<label className="color-shade">C: 13 M: 0 Y: 5 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#93dddb" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#93dddb")}>
<div className="color_sample" style={{backgroundColor: "#93dddb"}}></div>
<label className="color-name">Pantone 318</label>
<label className="color-shade">C: 33 M: 0 Y: 1 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#4cced1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#4cced1")}>
<div className="color_sample" style={{backgroundColor: "#4cced1"}}></div>
<label className="color-name">Pantone 319</label>
<label className="color-shade">C: 64 M: 1 Y: 0 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#009ea0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#009ea0")}>
<div className="color_sample" style={{backgroundColor: "#009ea0"}}></div>
<label className="color-name">Pantone 320</label>
<label className="color-shade">C: 100 M: 1 Y: 0 K: 37</label>
</button>
<button className="child" style={{border: selectedColor === "#008789" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#008789")}>
<div className="color_sample" style={{backgroundColor: "#008789"}}></div>
<label className="color-name">Pantone 321</label>
<label className="color-shade">C: 100 M: 1 Y: 0 K: 46</label>
</button>
<button className="child" style={{border: selectedColor === "#007272" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#007272")}>
<div className="color_sample" style={{backgroundColor: "#007272"}}></div>
<label className="color-name">Pantone 322</label>
<label className="color-shade">C: 100 M: 0 Y: 0 K: 55</label>
</button>
<button className="child" style={{border: selectedColor === "#006663" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#006663")}>
<div className="color_sample" style={{backgroundColor: "#006663"}}></div>
<label className="color-name">Pantone 323</label>
<label className="color-shade">C: 100 M: 0 Y: 3 K: 60</label>
</button>
<button className="child" style={{border: selectedColor === "#aaddd6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aaddd6")}>
<div className="color_sample" style={{backgroundColor: "#aaddd6"}}></div>
<label className="color-name">Pantone 324</label>
<label className="color-shade">C: 23 M: 0 Y: 3 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#56c9c1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#56c9c1")}>
<div className="color_sample" style={{backgroundColor: "#56c9c1"}}></div>
<label className="color-name">Pantone 325</label>
<label className="color-shade">C: 57 M: 0 Y: 4 K: 21</label>
</button>
<button className="child" style={{border: selectedColor === "#00b2aa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00b2aa")}>
<div className="color_sample" style={{backgroundColor: "#00b2aa"}}></div>
<label className="color-name">Pantone 326</label>
<label className="color-shade">C: 100 M: 0 Y: 4 K: 30</label>
</button>
<button className="child" style={{border: selectedColor === "#008c82" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#008c82")}>
<div className="color_sample" style={{backgroundColor: "#008c82"}}></div>
<label className="color-name">Pantone 327</label>
<label className="color-shade">C: 100 M: 0 Y: 7 K: 45</label>
</button>
<button className="child" style={{border: selectedColor === "#007770" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#007770")}>
<div className="color_sample" style={{backgroundColor: "#007770"}}></div>
<label className="color-name">Pantone 328</label>
<label className="color-shade">C: 100 M: 0 Y: 6 K: 53</label>
</button>
<button className="child" style={{border: selectedColor === "#006d66" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#006d66")}>
<div className="color_sample" style={{backgroundColor: "#006d66"}}></div>
<label className="color-name">Pantone 329</label>
<label className="color-shade">C: 100 M: 0 Y: 6 K: 57</label>
</button>
<button className="child" style={{border: selectedColor === "#005951" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#005951")}>
<div className="color_sample" style={{backgroundColor: "#005951"}}></div>
<label className="color-name">Pantone 330</label>
<label className="color-shade">C: 100 M: 0 Y: 9 K: 65</label>
</button>
<button className="child" style={{border: selectedColor === "#baead6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#baead6")}>
<div className="color_sample" style={{backgroundColor: "#baead6"}}></div>
<label className="color-name">Pantone 331</label>
<label className="color-shade">C: 21 M: 0 Y: 9 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#a0e5ce" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a0e5ce")}>
<div className="color_sample" style={{backgroundColor: "#a0e5ce"}}></div>
<label className="color-name">Pantone 332</label>
<label className="color-shade">C: 30 M: 0 Y: 10 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#5eddc1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5eddc1")}>
<div className="color_sample" style={{backgroundColor: "#5eddc1"}}></div>
<label className="color-name">Pantone 333</label>
<label className="color-shade">C: 57 M: 0 Y: 13 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#00997c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00997c")}>
<div className="color_sample" style={{backgroundColor: "#00997c"}}></div>
<label className="color-name">Pantone 334</label>
<label className="color-shade">C: 100 M: 0 Y: 19 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#007c66" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#007c66")}>
<div className="color_sample" style={{backgroundColor: "#007c66"}}></div>
<label className="color-name">Pantone 335</label>
<label className="color-shade">C: 100 M: 0 Y: 18 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#006854" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#006854")}>
<div className="color_sample" style={{backgroundColor: "#006854"}}></div>
<label className="color-name">Pantone 336</label>
<label className="color-shade">C: 100 M: 0 Y: 19 K: 59</label>
</button>
<button className="child" style={{border: selectedColor === "#9bdbc1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9bdbc1")}>
<div className="color_sample" style={{backgroundColor: "#9bdbc1"}}></div>
<label className="color-name">Pantone 337</label>
<label className="color-shade">C: 29 M: 0 Y: 12 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#7ad1b5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7ad1b5")}>
<div className="color_sample" style={{backgroundColor: "#7ad1b5"}}></div>
<label className="color-name">Pantone 338</label>
<label className="color-shade">C: 42 M: 0 Y: 13 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#00b28c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00b28c")}>
<div className="color_sample" style={{backgroundColor: "#00b28c"}}></div>
<label className="color-name">Pantone 339</label>
<label className="color-shade">C: 100 M: 0 Y: 21 K: 30</label>
</button>
<button className="child" style={{border: selectedColor === "#009977" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#009977")}>
<div className="color_sample" style={{backgroundColor: "#009977"}}></div>
<label className="color-name">Pantone 340</label>
<label className="color-shade">C: 100 M: 0 Y: 22 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#007a5e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#007a5e")}>
<div className="color_sample" style={{backgroundColor: "#007a5e"}}></div>
<label className="color-name">Pantone 341</label>
<label className="color-shade">C: 100 M: 0 Y: 23 K: 52</label>
</button>
<button className="child" style={{border: selectedColor === "#006b54" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#006b54")}>
<div className="color_sample" style={{backgroundColor: "#006b54"}}></div>
<label className="color-name">Pantone 342</label>
<label className="color-shade">C: 100 M: 0 Y: 21 K: 58</label>
</button>
<button className="child" style={{border: selectedColor === "#00563f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00563f")}>
<div className="color_sample" style={{backgroundColor: "#00563f"}}></div>
<label className="color-name">Pantone 343</label>
<label className="color-shade">C: 100 M: 0 Y: 27 K: 66</label>
</button>
<button className="child" style={{border: selectedColor === "#b5e2bf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b5e2bf")}>
<div className="color_sample" style={{backgroundColor: "#b5e2bf"}}></div>
<label className="color-name">Pantone 344</label>
<label className="color-shade">C: 20 M: 0 Y: 15 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#96d8af" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#96d8af")}>
<div className="color_sample" style={{backgroundColor: "#96d8af"}}></div>
<label className="color-name">Pantone 345</label>
<label className="color-shade">C: 31 M: 0 Y: 19 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#70ce9b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#70ce9b")}>
<div className="color_sample" style={{backgroundColor: "#70ce9b"}}></div>
<label className="color-name">Pantone 346</label>
<label className="color-shade">C: 46 M: 0 Y: 25 K: 19</label>
</button>
<button className="child" style={{border: selectedColor === "#009e60" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#009e60")}>
<div className="color_sample" style={{backgroundColor: "#009e60"}}></div>
<label className="color-name">Pantone 347</label>
<label className="color-shade">C: 100 M: 0 Y: 39 K: 38</label>
</button>
<button className="child" style={{border: selectedColor === "#008751" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#008751")}>
<div className="color_sample" style={{backgroundColor: "#008751"}}></div>
<label className="color-name">Pantone 348</label>
<label className="color-shade">C: 100 M: 0 Y: 40 K: 47</label>
</button>
<button className="child" style={{border: selectedColor === "#006b3f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#006b3f")}>
<div className="color_sample" style={{backgroundColor: "#006b3f"}}></div>
<label className="color-name">Pantone 349</label>
<label className="color-shade">C: 100 M: 0 Y: 41 K: 58</label>
</button>
<button className="child" style={{border: selectedColor === "#234f33" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#234f33")}>
<div className="color_sample" style={{backgroundColor: "#234f33"}}></div>
<label className="color-name">Pantone 350</label>
<label className="color-shade">C: 56 M: 0 Y: 35 K: 69</label>
</button>
<button className="child" style={{border: selectedColor === "#b5e8bf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b5e8bf")}>
<div className="color_sample" style={{backgroundColor: "#b5e8bf"}}></div>
<label className="color-name">Pantone 351</label>
<label className="color-shade">C: 22 M: 0 Y: 18 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#99e5b2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#99e5b2")}>
<div className="color_sample" style={{backgroundColor: "#99e5b2"}}></div>
<label className="color-name">Pantone 352</label>
<label className="color-shade">C: 33 M: 0 Y: 22 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#84e2a8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#84e2a8")}>
<div className="color_sample" style={{backgroundColor: "#84e2a8"}}></div>
<label className="color-name">Pantone 353</label>
<label className="color-shade">C: 42 M: 0 Y: 26 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#00b760" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00b760")}>
<div className="color_sample" style={{backgroundColor: "#00b760"}}></div>
<label className="color-name">Pantone 354</label>
<label className="color-shade">C: 100 M: 0 Y: 48 K: 28</label>
</button>
<button className="child" style={{border: selectedColor === "#009e49" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#009e49")}>
<div className="color_sample" style={{backgroundColor: "#009e49"}}></div>
<label className="color-name">Pantone 355</label>
<label className="color-shade">C: 100 M: 0 Y: 54 K: 38</label>
</button>
<button className="child" style={{border: selectedColor === "#007a3d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#007a3d")}>
<div className="color_sample" style={{backgroundColor: "#007a3d"}}></div>
<label className="color-name">Pantone 356</label>
<label className="color-shade">C: 100 M: 0 Y: 50 K: 52</label>
</button>
<button className="child" style={{border: selectedColor === "#215b33" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#215b33")}>
<div className="color_sample" style={{backgroundColor: "#215b33"}}></div>
<label className="color-name">Pantone 357</label>
<label className="color-shade">C: 64 M: 0 Y: 44 K: 64</label>
</button>
<button className="child" style={{border: selectedColor === "#aadd96" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aadd96")}>
<div className="color_sample" style={{backgroundColor: "#aadd96"}}></div>
<label className="color-name">Pantone 358</label>
<label className="color-shade">C: 23 M: 0 Y: 32 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#a0db8e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a0db8e")}>
<div className="color_sample" style={{backgroundColor: "#a0db8e"}}></div>
<label className="color-name">Pantone 359</label>
<label className="color-shade">C: 27 M: 0 Y: 35 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#60c659" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#60c659")}>
<div className="color_sample" style={{backgroundColor: "#60c659"}}></div>
<label className="color-name">Pantone 360</label>
<label className="color-shade">C: 52 M: 0 Y: 55 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#1eb53a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#1eb53a")}>
<div className="color_sample" style={{backgroundColor: "#1eb53a"}}></div>
<label className="color-name">Pantone 361</label>
<label className="color-shade">C: 83 M: 0 Y: 68 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#339e35" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#339e35")}>
<div className="color_sample" style={{backgroundColor: "#339e35"}}></div>
<label className="color-name">Pantone 362</label>
<label className="color-shade">C: 68 M: 0 Y: 66 K: 38</label>
</button>
<button className="child" style={{border: selectedColor === "#3d8e33" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#3d8e33")}>
<div className="color_sample" style={{backgroundColor: "#3d8e33"}}></div>
<label className="color-name">Pantone 363</label>
<label className="color-shade">C: 57 M: 0 Y: 64 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#3a7728" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#3a7728")}>
<div className="color_sample" style={{backgroundColor: "#3a7728"}}></div>
<label className="color-name">Pantone 364</label>
<label className="color-shade">C: 51 M: 0 Y: 66 K: 53</label>
</button>
<button className="child" style={{border: selectedColor === "#d3e8a3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d3e8a3")}>
<div className="color_sample" style={{backgroundColor: "#d3e8a3"}}></div>
<label className="color-name">Pantone 365</label>
<label className="color-shade">C: 9 M: 0 Y: 30 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#c4e58e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c4e58e")}>
<div className="color_sample" style={{backgroundColor: "#c4e58e"}}></div>
<label className="color-name">Pantone 366</label>
<label className="color-shade">C: 14 M: 0 Y: 38 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#aadd6d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aadd6d")}>
<div className="color_sample" style={{backgroundColor: "#aadd6d"}}></div>
<label className="color-name">Pantone 367</label>
<label className="color-shade">C: 23 M: 0 Y: 51 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#5bbf21" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5bbf21")}>
<div className="color_sample" style={{backgroundColor: "#5bbf21"}}></div>
<label className="color-name">Pantone 368</label>
<label className="color-shade">C: 52 M: 0 Y: 83 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#56aa1c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#56aa1c")}>
<div className="color_sample" style={{backgroundColor: "#56aa1c"}}></div>
<label className="color-name">Pantone 369</label>
<label className="color-shade">C: 49 M: 0 Y: 84 K: 33</label>
</button>
<button className="child" style={{border: selectedColor === "#568e14" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#568e14")}>
<div className="color_sample" style={{backgroundColor: "#568e14"}}></div>
<label className="color-name">Pantone 370</label>
<label className="color-shade">C: 39 M: 0 Y: 86 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#566b21" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#566b21")}>
<div className="color_sample" style={{backgroundColor: "#566b21"}}></div>
<label className="color-name">Pantone 371</label>
<label className="color-shade">C: 20 M: 0 Y: 69 K: 58</label>
</button>
<button className="child" style={{border: selectedColor === "#d8ed96" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d8ed96")}>
<div className="color_sample" style={{backgroundColor: "#d8ed96"}}></div>
<label className="color-name">Pantone 372</label>
<label className="color-shade">C: 9 M: 0 Y: 37 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#ceea82" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ceea82")}>
<div className="color_sample" style={{backgroundColor: "#ceea82"}}></div>
<label className="color-name">Pantone 373</label>
<label className="color-shade">C: 12 M: 0 Y: 44 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#bae860" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bae860")}>
<div className="color_sample" style={{backgroundColor: "#bae860"}}></div>
<label className="color-name">Pantone 374</label>
<label className="color-shade">C: 20 M: 0 Y: 59 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#8cd600" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8cd600")}>
<div className="color_sample" style={{backgroundColor: "#8cd600"}}></div>
<label className="color-name">Pantone 375</label>
<label className="color-shade">C: 35 M: 0 Y: 100 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#7fba00" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7fba00")}>
<div className="color_sample" style={{backgroundColor: "#7fba00"}}></div>
<label className="color-name">Pantone 376</label>
<label className="color-shade">C: 32 M: 0 Y: 100 K: 27</label>
</button>
<button className="child" style={{border: selectedColor === "#709302" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#709302")}>
<div className="color_sample" style={{backgroundColor: "#709302"}}></div>
<label className="color-name">Pantone 377</label>
<label className="color-shade">C: 24 M: 0 Y: 99 K: 42</label>
</button>
<button className="child" style={{border: selectedColor === "#566314" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#566314")}>
<div className="color_sample" style={{backgroundColor: "#566314"}}></div>
<label className="color-name">Pantone 378</label>
<label className="color-shade">C: 13 M: 0 Y: 80 K: 61</label>
</button>
<button className="child" style={{border: selectedColor === "#e0ea68" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e0ea68")}>
<div className="color_sample" style={{backgroundColor: "#e0ea68"}}></div>
<label className="color-name">Pantone 379</label>
<label className="color-shade">C: 4 M: 0 Y: 56 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#d6e542" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6e542")}>
<div className="color_sample" style={{backgroundColor: "#d6e542"}}></div>
<label className="color-name">Pantone 380</label>
<label className="color-shade">C: 7 M: 0 Y: 71 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#cce226" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#cce226")}>
<div className="color_sample" style={{backgroundColor: "#cce226"}}></div>
<label className="color-name">Pantone 381</label>
<label className="color-shade">C: 10 M: 0 Y: 83 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#bad80a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bad80a")}>
<div className="color_sample" style={{backgroundColor: "#bad80a"}}></div>
<label className="color-name">Pantone 382</label>
<label className="color-shade">C: 14 M: 0 Y: 95 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#a3af07" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a3af07")}>
<div className="color_sample" style={{backgroundColor: "#a3af07"}}></div>
<label className="color-name">Pantone 383</label>
<label className="color-shade">C: 7 M: 0 Y: 96 K: 31</label>
</button>
<button className="child" style={{border: selectedColor === "#939905" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#939905")}>
<div className="color_sample" style={{backgroundColor: "#939905"}}></div>
<label className="color-name">Pantone 384</label>
<label className="color-shade">C: 4 M: 0 Y: 97 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#707014" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#707014")}>
<div className="color_sample" style={{backgroundColor: "#707014"}}></div>
<label className="color-name">Pantone 385</label>
<label className="color-shade">C: 0 M: 0 Y: 82 K: 56</label>
</button>
<button className="child" style={{border: selectedColor === "#e8ed60" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e8ed60")}>
<div className="color_sample" style={{backgroundColor: "#e8ed60"}}></div>
<label className="color-name">Pantone 386</label>
<label className="color-shade">C: 2 M: 0 Y: 59 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#e0ed44" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e0ed44")}>
<div className="color_sample" style={{backgroundColor: "#e0ed44"}}></div>
<label className="color-name">Pantone 387</label>
<label className="color-shade">C: 5 M: 0 Y: 71 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#d6e80f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6e80f")}>
<div className="color_sample" style={{backgroundColor: "#d6e80f"}}></div>
<label className="color-name">Pantone 388</label>
<label className="color-shade">C: 8 M: 0 Y: 94 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#cee007" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#cee007")}>
<div className="color_sample" style={{backgroundColor: "#cee007"}}></div>
<label className="color-name">Pantone 389</label>
<label className="color-shade">C: 8 M: 0 Y: 97 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#bac405" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bac405")}>
<div className="color_sample" style={{backgroundColor: "#bac405"}}></div>
<label className="color-name">Pantone 390</label>
<label className="color-shade">C: 5 M: 0 Y: 97 K: 23</label>
</button>
<button className="child" style={{border: selectedColor === "#9e9e07" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9e9e07")}>
<div className="color_sample" style={{backgroundColor: "#9e9e07"}}></div>
<label className="color-name">Pantone 391</label>
<label className="color-shade">C: 0 M: 0 Y: 96 K: 38</label>
</button>
<button className="child" style={{border: selectedColor === "#848205" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#848205")}>
<div className="color_sample" style={{backgroundColor: "#848205"}}></div>
<label className="color-name">Pantone 392</label>
<label className="color-shade">C: 0 M: 2 Y: 96 K: 48</label>
</button>
<button className="child" style={{border: selectedColor === "#f2ef87" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2ef87")}>
<div className="color_sample" style={{backgroundColor: "#f2ef87"}}></div>
<label className="color-name">Pantone 393</label>
<label className="color-shade">C: 0 M: 1 Y: 44 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#eaed35" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#eaed35")}>
<div className="color_sample" style={{backgroundColor: "#eaed35"}}></div>
<label className="color-name">Pantone 394</label>
<label className="color-shade">C: 1 M: 0 Y: 78 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#e5e811" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e5e811")}>
<div className="color_sample" style={{backgroundColor: "#e5e811"}}></div>
<label className="color-name">Pantone 395</label>
<label className="color-shade">C: 1 M: 0 Y: 93 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#e0e20c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e0e20c")}>
<div className="color_sample" style={{backgroundColor: "#e0e20c"}}></div>
<label className="color-name">Pantone 396</label>
<label className="color-shade">C: 1 M: 0 Y: 95 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#c1bf0a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c1bf0a")}>
<div className="color_sample" style={{backgroundColor: "#c1bf0a"}}></div>
<label className="color-name">Pantone 397</label>
<label className="color-shade">C: 0 M: 1 Y: 95 K: 24</label>
</button>
<button className="child" style={{border: selectedColor === "#afa80a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#afa80a")}>
<div className="color_sample" style={{backgroundColor: "#afa80a"}}></div>
<label className="color-name">Pantone 398</label>
<label className="color-shade">C: 0 M: 4 Y: 94 K: 31</label>
</button>
<button className="child" style={{border: selectedColor === "#998e07" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#998e07")}>
<div className="color_sample" style={{backgroundColor: "#998e07"}}></div>
<label className="color-name">Pantone 399</label>
<label className="color-shade">C: 0 M: 7 Y: 95 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#d1c6b5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d1c6b5")}>
<div className="color_sample" style={{backgroundColor: "#d1c6b5"}}></div>
<label className="color-name">Pantone 400</label>
<label className="color-shade">C: 0 M: 5 Y: 13 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#c1b5a5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c1b5a5")}>
<div className="color_sample" style={{backgroundColor: "#c1b5a5"}}></div>
<label className="color-name">Pantone 401</label>
<label className="color-shade">C: 0 M: 6 Y: 15 K: 24</label>
</button>
<button className="child" style={{border: selectedColor === "#afa593" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#afa593")}>
<div className="color_sample" style={{backgroundColor: "#afa593"}}></div>
<label className="color-name">Pantone 402</label>
<label className="color-shade">C: 0 M: 6 Y: 16 K: 31</label>
</button>
<button className="child" style={{border: selectedColor === "#998c7c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#998c7c")}>
<div className="color_sample" style={{backgroundColor: "#998c7c"}}></div>
<label className="color-name">Pantone 403</label>
<label className="color-shade">C: 0 M: 8 Y: 19 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#827566" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#827566")}>
<div className="color_sample" style={{backgroundColor: "#827566"}}></div>
<label className="color-name">Pantone 404</label>
<label className="color-shade">C: 0 M: 10 Y: 22 K: 49</label>
</button>
<button className="child" style={{border: selectedColor === "#6b5e4f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6b5e4f")}>
<div className="color_sample" style={{backgroundColor: "#6b5e4f"}}></div>
<label className="color-name">Pantone 405</label>
<label className="color-shade">C: 0 M: 12 Y: 26 K: 58</label>
</button>
<button className="child" style={{border: selectedColor === "#cec1b5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#cec1b5")}>
<div className="color_sample" style={{backgroundColor: "#cec1b5"}}></div>
<label className="color-name">Pantone 406</label>
<label className="color-shade">C: 0 M: 6 Y: 12 K: 19</label>
</button>
<button className="child" style={{border: selectedColor === "#a8998c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a8998c")}>
<div className="color_sample" style={{backgroundColor: "#a8998c"}}></div>
<label className="color-name">Pantone 408</label>
<label className="color-shade">C: 0 M: 9 Y: 17 K: 34</label>
</button>
<button className="child" style={{border: selectedColor === "#99897c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#99897c")}>
<div className="color_sample" style={{backgroundColor: "#99897c"}}></div>
<label className="color-name">Pantone 409</label>
<label className="color-shade">C: 0 M: 10 Y: 19 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#7c6d63" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7c6d63")}>
<div className="color_sample" style={{backgroundColor: "#7c6d63"}}></div>
<label className="color-name">Pantone 410</label>
<label className="color-shade">C: 0 M: 12 Y: 20 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#66594c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#66594c")}>
<div className="color_sample" style={{backgroundColor: "#66594c"}}></div>
<label className="color-name">Pantone 411</label>
<label className="color-shade">C: 0 M: 13 Y: 25 K: 60</label>
</button>
<button className="child" style={{border: selectedColor === "#3d3028" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#3d3028")}>
<div className="color_sample" style={{backgroundColor: "#3d3028"}}></div>
<label className="color-name">Pantone 412</label>
<label className="color-shade">C: 0 M: 21 Y: 34 K: 76</label>
</button>
<button className="child" style={{border: selectedColor === "#c6c1b2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c6c1b2")}>
<div className="color_sample" style={{backgroundColor: "#c6c1b2"}}></div>
<label className="color-name">Pantone 413</label>
<label className="color-shade">C: 0 M: 3 Y: 10 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#b5afa0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b5afa0")}>
<div className="color_sample" style={{backgroundColor: "#b5afa0"}}></div>
<label className="color-name">Pantone 414</label>
<label className="color-shade">C: 0 M: 3 Y: 12 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#a39e8c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a39e8c")}>
<div className="color_sample" style={{backgroundColor: "#a39e8c"}}></div>
<label className="color-name">Pantone 415</label>
<label className="color-shade">C: 0 M: 3 Y: 14 K: 36</label>
</button>
<button className="child" style={{border: selectedColor === "#8e8c7a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8e8c7a")}>
<div className="color_sample" style={{backgroundColor: "#8e8c7a"}}></div>
<label className="color-name">Pantone 416</label>
<label className="color-shade">C: 0 M: 1 Y: 14 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#777263" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#777263")}>
<div className="color_sample" style={{backgroundColor: "#777263"}}></div>
<label className="color-name">Pantone 417</label>
<label className="color-shade">C: 0 M: 4 Y: 17 K: 53</label>
</button>
<button className="child" style={{border: selectedColor === "#605e4f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#605e4f")}>
<div className="color_sample" style={{backgroundColor: "#605e4f"}}></div>
<label className="color-name">Pantone 418</label>
<label className="color-shade">C: 0 M: 2 Y: 18 K: 62</label>
</button>
<button className="child" style={{border: selectedColor === "#282821" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#282821")}>
<div className="color_sample" style={{backgroundColor: "#282821"}}></div>
<label className="color-name">Pantone 419</label>
<label className="color-shade">C: 0 M: 0 Y: 18 K: 84</label>
</button>
<button className="child" style={{border: selectedColor === "#d1ccbf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d1ccbf")}>
<div className="color_sample" style={{backgroundColor: "#d1ccbf"}}></div>
<label className="color-name">Pantone 420</label>
<label className="color-shade">C: 0 M: 2 Y: 9 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#bfbaaf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bfbaaf")}>
<div className="color_sample" style={{backgroundColor: "#bfbaaf"}}></div>
<label className="color-name">Pantone 421</label>
<label className="color-shade">C: 0 M: 3 Y: 8 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#afaaa3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#afaaa3")}>
<div className="color_sample" style={{backgroundColor: "#afaaa3"}}></div>
<label className="color-name">Pantone 422</label>
<label className="color-shade">C: 0 M: 3 Y: 7 K: 31</label>
</button>
<button className="child" style={{border: selectedColor === "#96938e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#96938e")}>
<div className="color_sample" style={{backgroundColor: "#96938e"}}></div>
<label className="color-name">Pantone 423</label>
<label className="color-shade">C: 0 M: 2 Y: 5 K: 41</label>
</button>
<button className="child" style={{border: selectedColor === "#827f77" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#827f77")}>
<div className="color_sample" style={{backgroundColor: "#827f77"}}></div>
<label className="color-name">Pantone 424</label>
<label className="color-shade">C: 0 M: 2 Y: 8 K: 49</label>
</button>
<button className="child" style={{border: selectedColor === "#60605b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#60605b")}>
<div className="color_sample" style={{backgroundColor: "#60605b"}}></div>
<label className="color-name">Pantone 425</label>
<label className="color-shade">C: 0 M: 0 Y: 5 K: 62</label>
</button>
<button className="child" style={{border: selectedColor === "#2b2b28" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#2b2b28")}>
<div className="color_sample" style={{backgroundColor: "#2b2b28"}}></div>
<label className="color-name">Pantone 426</label>
<label className="color-shade">C: 0 M: 0 Y: 7 K: 83</label>
</button>
<button className="child" style={{border: selectedColor === "#dddbd1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#dddbd1")}>
<div className="color_sample" style={{backgroundColor: "#dddbd1"}}></div>
<label className="color-name">Pantone 427</label>
<label className="color-shade">C: 0 M: 1 Y: 5 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#d1cec6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d1cec6")}>
<div className="color_sample" style={{backgroundColor: "#d1cec6"}}></div>
<label className="color-name">Pantone 428</label>
<label className="color-shade">C: 0 M: 1 Y: 5 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#adafaa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#adafaa")}>
<div className="color_sample" style={{backgroundColor: "#adafaa"}}></div>
<label className="color-name">Pantone 429</label>
<label className="color-shade">C: 1 M: 0 Y: 3 K: 31</label>
</button>
<button className="child" style={{border: selectedColor === "#919693" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#919693")}>
<div className="color_sample" style={{backgroundColor: "#919693"}}></div>
<label className="color-name">Pantone 430</label>
<label className="color-shade">C: 3 M: 0 Y: 2 K: 41</label>
</button>
<button className="child" style={{border: selectedColor === "#666d70" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#666d70")}>
<div className="color_sample" style={{backgroundColor: "#666d70"}}></div>
<label className="color-name">Pantone 431</label>
<label className="color-shade">C: 9 M: 3 Y: 0 K: 56</label>
</button>
<button className="child" style={{border: selectedColor === "#444f51" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#444f51")}>
<div className="color_sample" style={{backgroundColor: "#444f51"}}></div>
<label className="color-name">Pantone 432</label>
<label className="color-shade">C: 16 M: 2 Y: 0 K: 68</label>
</button>
<button className="child" style={{border: selectedColor === "#30383a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#30383a")}>
<div className="color_sample" style={{backgroundColor: "#30383a"}}></div>
<label className="color-name">Pantone 433</label>
<label className="color-shade">C: 17 M: 3 Y: 0 K: 77</label>
</button>
<button className="child" style={{border: selectedColor === "#e0d1c6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e0d1c6")}>
<div className="color_sample" style={{backgroundColor: "#e0d1c6"}}></div>
<label className="color-name">Pantone 434</label>
<label className="color-shade">C: 0 M: 7 Y: 12 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#d3bfb7" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d3bfb7")}>
<div className="color_sample" style={{backgroundColor: "#d3bfb7"}}></div>
<label className="color-name">Pantone 435</label>
<label className="color-shade">C: 0 M: 9 Y: 13 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#bca59e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bca59e")}>
<div className="color_sample" style={{backgroundColor: "#bca59e"}}></div>
<label className="color-name">Pantone 436</label>
<label className="color-shade">C: 0 M: 12 Y: 16 K: 26</label>
</button>
<button className="child" style={{border: selectedColor === "#8c706b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8c706b")}>
<div className="color_sample" style={{backgroundColor: "#8c706b"}}></div>
<label className="color-name">Pantone 437</label>
<label className="color-shade">C: 0 M: 20 Y: 24 K: 45</label>
</button>
<button className="child" style={{border: selectedColor === "#593f3d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#593f3d")}>
<div className="color_sample" style={{backgroundColor: "#593f3d"}}></div>
<label className="color-name">Pantone 438</label>
<label className="color-shade">C: 0 M: 29 Y: 31 K: 65</label>
</button>
<button className="child" style={{border: selectedColor === "#493533" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#493533")}>
<div className="color_sample" style={{backgroundColor: "#493533"}}></div>
<label className="color-name">Pantone 439</label>
<label className="color-shade">C: 0 M: 27 Y: 30 K: 71</label>
</button>
<button className="child" style={{border: selectedColor === "#3f302b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#3f302b")}>
<div className="color_sample" style={{backgroundColor: "#3f302b"}}></div>
<label className="color-name">Pantone 440</label>
<label className="color-shade">C: 0 M: 24 Y: 32 K: 75</label>
</button>
<button className="child" style={{border: selectedColor === "#d1d1c6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d1d1c6")}>
<div className="color_sample" style={{backgroundColor: "#d1d1c6"}}></div>
<label className="color-name">Pantone 441</label>
<label className="color-shade">C: 0 M: 0 Y: 5 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#babfb7" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#babfb7")}>
<div className="color_sample" style={{backgroundColor: "#babfb7"}}></div>
<label className="color-name">Pantone 442</label>
<label className="color-shade">C: 3 M: 0 Y: 4 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#a3a8a3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a3a8a3")}>
<div className="color_sample" style={{backgroundColor: "#a3a8a3"}}></div>
<label className="color-name">Pantone 443</label>
<label className="color-shade">C: 3 M: 0 Y: 3 K: 34</label>
</button>
<button className="child" style={{border: selectedColor === "#898e8c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#898e8c")}>
<div className="color_sample" style={{backgroundColor: "#898e8c"}}></div>
<label className="color-name">Pantone 444</label>
<label className="color-shade">C: 4 M: 0 Y: 1 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#565959" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#565959")}>
<div className="color_sample" style={{backgroundColor: "#565959"}}></div>
<label className="color-name">Pantone 445</label>
<label className="color-shade">C: 3 M: 0 Y: 0 K: 65</label>
</button>
<button className="child" style={{border: selectedColor === "#494c49" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#494c49")}>
<div className="color_sample" style={{backgroundColor: "#494c49"}}></div>
<label className="color-name">Pantone 446</label>
<label className="color-shade">C: 4 M: 0 Y: 4 K: 70</label>
</button>
<button className="child" style={{border: selectedColor === "#3f3f38" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#3f3f38")}>
<div className="color_sample" style={{backgroundColor: "#3f3f38"}}></div>
<label className="color-name">Pantone 447</label>
<label className="color-shade">C: 0 M: 0 Y: 11 K: 75</label>
</button>
<button className="child" style={{border: selectedColor === "#54472d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#54472d")}>
<div className="color_sample" style={{backgroundColor: "#54472d"}}></div>
<label className="color-name">Pantone 448</label>
<label className="color-shade">C: 0 M: 15 Y: 46 K: 67</label>
</button>
<button className="child" style={{border: selectedColor === "#544726" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#544726")}>
<div className="color_sample" style={{backgroundColor: "#544726"}}></div>
<label className="color-name">Pantone 449</label>
<label className="color-shade">C: 0 M: 15 Y: 55 K: 67</label>
</button>
<button className="child" style={{border: selectedColor === "#60542b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#60542b")}>
<div className="color_sample" style={{backgroundColor: "#60542b"}}></div>
<label className="color-name">Pantone 450</label>
<label className="color-shade">C: 0 M: 13 Y: 55 K: 62</label>
</button>
<button className="child" style={{border: selectedColor === "#ada07a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ada07a")}>
<div className="color_sample" style={{backgroundColor: "#ada07a"}}></div>
<label className="color-name">Pantone 451</label>
<label className="color-shade">C: 0 M: 8 Y: 29 K: 32</label>
</button>
<button className="child" style={{border: selectedColor === "#c4b796" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c4b796")}>
<div className="color_sample" style={{backgroundColor: "#c4b796"}}></div>
<label className="color-name">Pantone 452</label>
<label className="color-shade">C: 0 M: 7 Y: 23 K: 23</label>
</button>
<button className="child" style={{border: selectedColor === "#d6ccaf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6ccaf")}>
<div className="color_sample" style={{backgroundColor: "#d6ccaf"}}></div>
<label className="color-name">Pantone 453</label>
<label className="color-shade">C: 0 M: 5 Y: 18 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#e2d8bf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e2d8bf")}>
<div className="color_sample" style={{backgroundColor: "#e2d8bf"}}></div>
<label className="color-name">Pantone 454</label>
<label className="color-shade">C: 0 M: 4 Y: 15 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#665614" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#665614")}>
<div className="color_sample" style={{backgroundColor: "#665614"}}></div>
<label className="color-name">Pantone 455</label>
<label className="color-shade">C: 0 M: 16 Y: 80 K: 60</label>
</button>
<button className="child" style={{border: selectedColor === "#998714" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#998714")}>
<div className="color_sample" style={{backgroundColor: "#998714"}}></div>
<label className="color-name">Pantone 456</label>
<label className="color-shade">C: 0 M: 12 Y: 87 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#b59b0c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b59b0c")}>
<div className="color_sample" style={{backgroundColor: "#b59b0c"}}></div>
<label className="color-name">Pantone 457</label>
<label className="color-shade">C: 0 M: 14 Y: 93 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#ddcc6b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ddcc6b")}>
<div className="color_sample" style={{backgroundColor: "#ddcc6b"}}></div>
<label className="color-name">Pantone 458</label>
<label className="color-shade">C: 0 M: 8 Y: 52 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#e2d67c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e2d67c")}>
<div className="color_sample" style={{backgroundColor: "#e2d67c"}}></div>
<label className="color-name">Pantone 459</label>
<label className="color-shade">C: 0 M: 5 Y: 45 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#eadd96" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#eadd96")}>
<div className="color_sample" style={{backgroundColor: "#eadd96"}}></div>
<label className="color-name">Pantone 460</label>
<label className="color-shade">C: 0 M: 6 Y: 36 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#ede5ad" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ede5ad")}>
<div className="color_sample" style={{backgroundColor: "#ede5ad"}}></div>
<label className="color-name">Pantone 461</label>
<label className="color-shade">C: 0 M: 3 Y: 27 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#5b4723" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5b4723")}>
<div className="color_sample" style={{backgroundColor: "#5b4723"}}></div>
<label className="color-name">Pantone 462</label>
<label className="color-shade">C: 0 M: 22 Y: 62 K: 64</label>
</button>
<button className="child" style={{border: selectedColor === "#755426" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#755426")}>
<div className="color_sample" style={{backgroundColor: "#755426"}}></div>
<label className="color-name">Pantone 463</label>
<label className="color-shade">C: 0 M: 28 Y: 68 K: 54</label>
</button>
<button className="child" style={{border: selectedColor === "#876028" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#876028")}>
<div className="color_sample" style={{backgroundColor: "#876028"}}></div>
<label className="color-name">Pantone 464</label>
<label className="color-shade">C: 0 M: 29 Y: 70 K: 47</label>
</button>
<button className="child" style={{border: selectedColor === "#c1a875" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c1a875")}>
<div className="color_sample" style={{backgroundColor: "#c1a875"}}></div>
<label className="color-name">Pantone 465</label>
<label className="color-shade">C: 0 M: 13 Y: 39 K: 24</label>
</button>
<button className="child" style={{border: selectedColor === "#d1bf91" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d1bf91")}>
<div className="color_sample" style={{backgroundColor: "#d1bf91"}}></div>
<label className="color-name">Pantone 466</label>
<label className="color-shade">C: 0 M: 9 Y: 31 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#ddcca5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ddcca5")}>
<div className="color_sample" style={{backgroundColor: "#ddcca5"}}></div>
<label className="color-name">Pantone 467</label>
<label className="color-shade">C: 0 M: 8 Y: 25 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#e2d6b5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e2d6b5")}>
<div className="color_sample" style={{backgroundColor: "#e2d6b5"}}></div>
<label className="color-name">Pantone 468</label>
<label className="color-shade">C: 0 M: 5 Y: 20 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#603311" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#603311")}>
<div className="color_sample" style={{backgroundColor: "#603311"}}></div>
<label className="color-name">Pantone 469</label>
<label className="color-shade">C: 0 M: 47 Y: 82 K: 62</label>
</button>
<button className="child" style={{border: selectedColor === "#9b4f19" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9b4f19")}>
<div className="color_sample" style={{backgroundColor: "#9b4f19"}}></div>
<label className="color-name">Pantone 470</label>
<label className="color-shade">C: 0 M: 49 Y: 84 K: 39</label>
</button>
<button className="child" style={{border: selectedColor === "#bc5e1e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bc5e1e")}>
<div className="color_sample" style={{backgroundColor: "#bc5e1e"}}></div>
<label className="color-name">Pantone 471</label>
<label className="color-shade">C: 0 M: 50 Y: 84 K: 26</label>
</button>
<button className="child" style={{border: selectedColor === "#eaaa7a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#eaaa7a")}>
<div className="color_sample" style={{backgroundColor: "#eaaa7a"}}></div>
<label className="color-name">Pantone 472</label>
<label className="color-shade">C: 0 M: 27 Y: 48 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#f4c4a0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4c4a0")}>
<div className="color_sample" style={{backgroundColor: "#f4c4a0"}}></div>
<label className="color-name">Pantone 473</label>
<label className="color-shade">C: 0 M: 20 Y: 34 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#f4ccaa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4ccaa")}>
<div className="color_sample" style={{backgroundColor: "#f4ccaa"}}></div>
<label className="color-name">Pantone 474</label>
<label className="color-shade">C: 0 M: 16 Y: 30 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#f7d3b5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f7d3b5")}>
<div className="color_sample" style={{backgroundColor: "#f7d3b5"}}></div>
<label className="color-name">Pantone 475</label>
<label className="color-shade">C: 0 M: 15 Y: 27 K: 3</label>
</button>
<button className="child" style={{border: selectedColor === "#593d2b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#593d2b")}>
<div className="color_sample" style={{backgroundColor: "#593d2b"}}></div>
<label className="color-name">Pantone 476</label>
<label className="color-shade">C: 0 M: 31 Y: 52 K: 65</label>
</button>
<button className="child" style={{border: selectedColor === "#633826" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#633826")}>
<div className="color_sample" style={{backgroundColor: "#633826"}}></div>
<label className="color-name">Pantone 477</label>
<label className="color-shade">C: 0 M: 43 Y: 62 K: 61</label>
</button>
<button className="child" style={{border: selectedColor === "#7a3f28" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7a3f28")}>
<div className="color_sample" style={{backgroundColor: "#7a3f28"}}></div>
<label className="color-name">Pantone 478</label>
<label className="color-shade">C: 0 M: 48 Y: 67 K: 52</label>
</button>
<button className="child" style={{border: selectedColor === "#af8970" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#af8970")}>
<div className="color_sample" style={{backgroundColor: "#af8970"}}></div>
<label className="color-name">Pantone 479</label>
<label className="color-shade">C: 0 M: 22 Y: 36 K: 31</label>
</button>
<button className="child" style={{border: selectedColor === "#d3b7a3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d3b7a3")}>
<div className="color_sample" style={{backgroundColor: "#d3b7a3"}}></div>
<label className="color-name">Pantone 480</label>
<label className="color-shade">C: 0 M: 13 Y: 23 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#e0ccba" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e0ccba")}>
<div className="color_sample" style={{backgroundColor: "#e0ccba"}}></div>
<label className="color-name">Pantone 481</label>
<label className="color-shade">C: 0 M: 9 Y: 17 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#e5d3c1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e5d3c1")}>
<div className="color_sample" style={{backgroundColor: "#e5d3c1"}}></div>
<label className="color-name">Pantone 482</label>
<label className="color-shade">C: 0 M: 8 Y: 16 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#6b3021" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6b3021")}>
<div className="color_sample" style={{backgroundColor: "#6b3021"}}></div>
<label className="color-name">Pantone 483</label>
<label className="color-shade">C: 0 M: 55 Y: 69 K: 58</label>
</button>
<button className="child" style={{border: selectedColor === "#9b301c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9b301c")}>
<div className="color_sample" style={{backgroundColor: "#9b301c"}}></div>
<label className="color-name">Pantone 484</label>
<label className="color-shade">C: 0 M: 69 Y: 82 K: 39</label>
</button>
<button className="child" style={{border: selectedColor === "#d81e05" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d81e05")}>
<div className="color_sample" style={{backgroundColor: "#d81e05"}}></div>
<label className="color-name">Pantone 485</label>
<label className="color-shade">C: 0 M: 86 Y: 98 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#ed9e84" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ed9e84")}>
<div className="color_sample" style={{backgroundColor: "#ed9e84"}}></div>
<label className="color-name">Pantone 486</label>
<label className="color-shade">C: 0 M: 33 Y: 44 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#efb5a0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#efb5a0")}>
<div className="color_sample" style={{backgroundColor: "#efb5a0"}}></div>
<label className="color-name">Pantone 487</label>
<label className="color-shade">C: 0 M: 24 Y: 33 K: 6</label>
</button>
<button className="child" style={{border: selectedColor === "#f2c4af" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2c4af")}>
<div className="color_sample" style={{backgroundColor: "#f2c4af"}}></div>
<label className="color-name">Pantone 488</label>
<label className="color-shade">C: 0 M: 19 Y: 28 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#f2d1bf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2d1bf")}>
<div className="color_sample" style={{backgroundColor: "#f2d1bf"}}></div>
<label className="color-name">Pantone 489</label>
<label className="color-shade">C: 0 M: 14 Y: 21 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#5b2626" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5b2626")}>
<div className="color_sample" style={{backgroundColor: "#5b2626"}}></div>
<label className="color-name">Pantone 490</label>
<label className="color-shade">C: 0 M: 58 Y: 58 K: 64</label>
</button>
<button className="child" style={{border: selectedColor === "#752828" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#752828")}>
<div className="color_sample" style={{backgroundColor: "#752828"}}></div>
<label className="color-name">Pantone 491</label>
<label className="color-shade">C: 0 M: 66 Y: 66 K: 54</label>
</button>
<button className="child" style={{border: selectedColor === "#913338" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#913338")}>
<div className="color_sample" style={{backgroundColor: "#913338"}}></div>
<label className="color-name">Pantone 492</label>
<label className="color-shade">C: 0 M: 65 Y: 61 K: 43</label>
</button>
<button className="child" style={{border: selectedColor === "#f2adb2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2adb2")}>
<div className="color_sample" style={{backgroundColor: "#f2adb2"}}></div>
<label className="color-name">Pantone 494</label>
<label className="color-shade">C: 0 M: 29 Y: 26 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#f4bcbf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4bcbf")}>
<div className="color_sample" style={{backgroundColor: "#f4bcbf"}}></div>
<label className="color-name">Pantone 495</label>
<label className="color-shade">C: 0 M: 23 Y: 22 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#f7c9c6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f7c9c6")}>
<div className="color_sample" style={{backgroundColor: "#f7c9c6"}}></div>
<label className="color-name">Pantone 496</label>
<label className="color-shade">C: 0 M: 19 Y: 20 K: 3</label>
</button>
<button className="child" style={{border: selectedColor === "#512826" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#512826")}>
<div className="color_sample" style={{backgroundColor: "#512826"}}></div>
<label className="color-name">Pantone 497</label>
<label className="color-shade">C: 0 M: 51 Y: 53 K: 68</label>
</button>
<button className="child" style={{border: selectedColor === "#6d332b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6d332b")}>
<div className="color_sample" style={{backgroundColor: "#6d332b"}}></div>
<label className="color-name">Pantone 498</label>
<label className="color-shade">C: 0 M: 53 Y: 61 K: 57</label>
</button>
<button className="child" style={{border: selectedColor === "#7a382d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7a382d")}>
<div className="color_sample" style={{backgroundColor: "#7a382d"}}></div>
<label className="color-name">Pantone 499</label>
<label className="color-shade">C: 0 M: 54 Y: 63 K: 52</label>
</button>
<button className="child" style={{border: selectedColor === "#ce898c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ce898c")}>
<div className="color_sample" style={{backgroundColor: "#ce898c"}}></div>
<label className="color-name">Pantone 500</label>
<label className="color-shade">C: 0 M: 33 Y: 32 K: 19</label>
</button>
<button className="child" style={{border: selectedColor === "#eab2b2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#eab2b2")}>
<div className="color_sample" style={{backgroundColor: "#eab2b2"}}></div>
<label className="color-name">Pantone 501</label>
<label className="color-shade">C: 0 M: 24 Y: 24 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#f2c6c4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2c6c4")}>
<div className="color_sample" style={{backgroundColor: "#f2c6c4"}}></div>
<label className="color-name">Pantone 502</label>
<label className="color-shade">C: 0 M: 18 Y: 19 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#f4d1cc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4d1cc")}>
<div className="color_sample" style={{backgroundColor: "#f4d1cc"}}></div>
<label className="color-name">Pantone 503</label>
<label className="color-shade">C: 0 M: 14 Y: 16 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#511e26" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#511e26")}>
<div className="color_sample" style={{backgroundColor: "#511e26"}}></div>
<label className="color-name">Pantone 504</label>
<label className="color-shade">C: 0 M: 63 Y: 53 K: 68</label>
</button>
<button className="child" style={{border: selectedColor === "#661e2b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#661e2b")}>
<div className="color_sample" style={{backgroundColor: "#661e2b"}}></div>
<label className="color-name">Pantone 505</label>
<label className="color-shade">C: 0 M: 71 Y: 58 K: 60</label>
</button>
<button className="child" style={{border: selectedColor === "#7a2638" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7a2638")}>
<div className="color_sample" style={{backgroundColor: "#7a2638"}}></div>
<label className="color-name">Pantone 506</label>
<label className="color-shade">C: 0 M: 69 Y: 54 K: 52</label>
</button>
<button className="child" style={{border: selectedColor === "#d8899b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d8899b")}>
<div className="color_sample" style={{backgroundColor: "#d8899b"}}></div>
<label className="color-name">Pantone 507</label>
<label className="color-shade">C: 0 M: 37 Y: 28 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#e8a5af" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e8a5af")}>
<div className="color_sample" style={{backgroundColor: "#e8a5af"}}></div>
<label className="color-name">Pantone 508</label>
<label className="color-shade">C: 0 M: 29 Y: 25 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#f2babf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2babf")}>
<div className="color_sample" style={{backgroundColor: "#f2babf"}}></div>
<label className="color-name">Pantone 509</label>
<label className="color-shade">C: 0 M: 23 Y: 21 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#f4c6c9" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4c6c9")}>
<div className="color_sample" style={{backgroundColor: "#f4c6c9"}}></div>
<label className="color-name">Pantone 510</label>
<label className="color-shade">C: 0 M: 19 Y: 18 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#602144" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#602144")}>
<div className="color_sample" style={{backgroundColor: "#602144"}}></div>
<label className="color-name">Pantone 511</label>
<label className="color-shade">C: 0 M: 66 Y: 29 K: 62</label>
</button>
<button className="child" style={{border: selectedColor === "#84216b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#84216b")}>
<div className="color_sample" style={{backgroundColor: "#84216b"}}></div>
<label className="color-name">Pantone 512</label>
<label className="color-shade">C: 0 M: 75 Y: 19 K: 48</label>
</button>
<button className="child" style={{border: selectedColor === "#9e2387" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9e2387")}>
<div className="color_sample" style={{backgroundColor: "#9e2387"}}></div>
<label className="color-name">Pantone 513</label>
<label className="color-shade">C: 0 M: 78 Y: 15 K: 38</label>
</button>
<button className="child" style={{border: selectedColor === "#d884bc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d884bc")}>
<div className="color_sample" style={{backgroundColor: "#d884bc"}}></div>
<label className="color-name">Pantone 514</label>
<label className="color-shade">C: 0 M: 39 Y: 13 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#e8a3c9" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e8a3c9")}>
<div className="color_sample" style={{backgroundColor: "#e8a3c9"}}></div>
<label className="color-name">Pantone 515</label>
<label className="color-shade">C: 0 M: 30 Y: 13 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#f2bad3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2bad3")}>
<div className="color_sample" style={{backgroundColor: "#f2bad3"}}></div>
<label className="color-name">Pantone 516</label>
<label className="color-shade">C: 0 M: 23 Y: 13 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#f4ccd8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4ccd8")}>
<div className="color_sample" style={{backgroundColor: "#f4ccd8"}}></div>
<label className="color-name">Pantone 517</label>
<label className="color-shade">C: 0 M: 16 Y: 11 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#512d44" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#512d44")}>
<div className="color_sample" style={{backgroundColor: "#512d44"}}></div>
<label className="color-name">Pantone 518</label>
<label className="color-shade">C: 0 M: 44 Y: 16 K: 68</label>
</button>
<button className="child" style={{border: selectedColor === "#63305e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#63305e")}>
<div className="color_sample" style={{backgroundColor: "#63305e"}}></div>
<label className="color-name">Pantone 519</label>
<label className="color-shade">C: 0 M: 52 Y: 5 K: 61</label>
</button>
<button className="child" style={{border: selectedColor === "#703572" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#703572")}>
<div className="color_sample" style={{backgroundColor: "#703572"}}></div>
<label className="color-name">Pantone 520</label>
<label className="color-shade">C: 2 M: 54 Y: 0 K: 55</label>
</button>
<button className="child" style={{border: selectedColor === "#b58cb2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b58cb2")}>
<div className="color_sample" style={{backgroundColor: "#b58cb2"}}></div>
<label className="color-name">Pantone 521</label>
<label className="color-shade">C: 0 M: 23 Y: 2 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#c6a3c1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c6a3c1")}>
<div className="color_sample" style={{backgroundColor: "#c6a3c1"}}></div>
<label className="color-name">Pantone 522</label>
<label className="color-shade">C: 0 M: 18 Y: 3 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#d3b7cc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d3b7cc")}>
<div className="color_sample" style={{backgroundColor: "#d3b7cc"}}></div>
<label className="color-name">Pantone 523</label>
<label className="color-shade">C: 0 M: 13 Y: 3 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#e2ccd3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e2ccd3")}>
<div className="color_sample" style={{backgroundColor: "#e2ccd3"}}></div>
<label className="color-name">Pantone 524</label>
<label className="color-shade">C: 0 M: 10 Y: 7 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#512654" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#512654")}>
<div className="color_sample" style={{backgroundColor: "#512654"}}></div>
<label className="color-name">Pantone 525</label>
<label className="color-shade">C: 4 M: 55 Y: 0 K: 67</label>
</button>
<button className="child" style={{border: selectedColor === "#68217a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#68217a")}>
<div className="color_sample" style={{backgroundColor: "#68217a"}}></div>
<label className="color-name">Pantone 526</label>
<label className="color-shade">C: 15 M: 73 Y: 0 K: 52</label>
</button>
<button className="child" style={{border: selectedColor === "#7a1e99" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7a1e99")}>
<div className="color_sample" style={{backgroundColor: "#7a1e99"}}></div>
<label className="color-name">Pantone 527</label>
<label className="color-shade">C: 20 M: 80 Y: 0 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#af72c1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#af72c1")}>
<div className="color_sample" style={{backgroundColor: "#af72c1"}}></div>
<label className="color-name">Pantone 528</label>
<label className="color-shade">C: 9 M: 41 Y: 0 K: 24</label>
</button>
<button className="child" style={{border: selectedColor === "#cea3d3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#cea3d3")}>
<div className="color_sample" style={{backgroundColor: "#cea3d3"}}></div>
<label className="color-name">Pantone 529</label>
<label className="color-shade">C: 2 M: 23 Y: 0 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#d6afd6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6afd6")}>
<div className="color_sample" style={{backgroundColor: "#d6afd6"}}></div>
<label className="color-name">Pantone 530</label>
<label className="color-shade">C: 0 M: 18 Y: 0 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#e5c6db" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e5c6db")}>
<div className="color_sample" style={{backgroundColor: "#e5c6db"}}></div>
<label className="color-name">Pantone 531</label>
<label className="color-shade">C: 0 M: 14 Y: 4 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#353842" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#353842")}>
<div className="color_sample" style={{backgroundColor: "#353842"}}></div>
<label className="color-name">Pantone 532</label>
<label className="color-shade">C: 20 M: 15 Y: 0 K: 74</label>
</button>
<button className="child" style={{border: selectedColor === "#353f5b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#353f5b")}>
<div className="color_sample" style={{backgroundColor: "#353f5b"}}></div>
<label className="color-name">Pantone 533</label>
<label className="color-shade">C: 42 M: 31 Y: 0 K: 64</label>
</button>
<button className="child" style={{border: selectedColor === "#3a4972" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#3a4972")}>
<div className="color_sample" style={{backgroundColor: "#3a4972"}}></div>
<label className="color-name">Pantone 534</label>
<label className="color-shade">C: 49 M: 36 Y: 0 K: 55</label>
</button>
<button className="child" style={{border: selectedColor === "#9ba3b7" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9ba3b7")}>
<div className="color_sample" style={{backgroundColor: "#9ba3b7"}}></div>
<label className="color-name">Pantone 535</label>
<label className="color-shade">C: 15 M: 11 Y: 0 K: 28</label>
</button>
<button className="child" style={{border: selectedColor === "#adb2c1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#adb2c1")}>
<div className="color_sample" style={{backgroundColor: "#adb2c1"}}></div>
<label className="color-name">Pantone 536</label>
<label className="color-shade">C: 10 M: 8 Y: 0 K: 24</label>
</button>
<button className="child" style={{border: selectedColor === "#c4c6ce" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c4c6ce")}>
<div className="color_sample" style={{backgroundColor: "#c4c6ce"}}></div>
<label className="color-name">Pantone 537</label>
<label className="color-shade">C: 5 M: 4 Y: 0 K: 19</label>
</button>
<button className="child" style={{border: selectedColor === "#d6d3d6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6d3d6")}>
<div className="color_sample" style={{backgroundColor: "#d6d3d6"}}></div>
<label className="color-name">Pantone 538</label>
<label className="color-shade">C: 0 M: 1 Y: 0 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#003049" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#003049")}>
<div className="color_sample" style={{backgroundColor: "#003049"}}></div>
<label className="color-name">Pantone 539</label>
<label className="color-shade">C: 100 M: 34 Y: 0 K: 71</label>
</button>
<button className="child" style={{border: selectedColor === "#00335b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00335b")}>
<div className="color_sample" style={{backgroundColor: "#00335b"}}></div>
<label className="color-name">Pantone 540</label>
<label className="color-shade">C: 100 M: 44 Y: 0 K: 64</label>
</button>
<button className="child" style={{border: selectedColor === "#003f77" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#003f77")}>
<div className="color_sample" style={{backgroundColor: "#003f77"}}></div>
<label className="color-name">Pantone 541</label>
<label className="color-shade">C: 100 M: 47 Y: 0 K: 53</label>
</button>
<button className="child" style={{border: selectedColor === "#6693bc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6693bc")}>
<div className="color_sample" style={{backgroundColor: "#6693bc"}}></div>
<label className="color-name">Pantone 542</label>
<label className="color-shade">C: 46 M: 22 Y: 0 K: 26</label>
</button>
<button className="child" style={{border: selectedColor === "#93b7d1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#93b7d1")}>
<div className="color_sample" style={{backgroundColor: "#93b7d1"}}></div>
<label className="color-name">Pantone 543</label>
<label className="color-shade">C: 30 M: 12 Y: 0 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#b7ccdb" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b7ccdb")}>
<div className="color_sample" style={{backgroundColor: "#b7ccdb"}}></div>
<label className="color-name">Pantone 544</label>
<label className="color-shade">C: 16 M: 7 Y: 0 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#c4d3dd" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c4d3dd")}>
<div className="color_sample" style={{backgroundColor: "#c4d3dd"}}></div>
<label className="color-name">Pantone 545</label>
<label className="color-shade">C: 11 M: 5 Y: 0 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#0c3844" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#0c3844")}>
<div className="color_sample" style={{backgroundColor: "#0c3844"}}></div>
<label className="color-name">Pantone 546</label>
<label className="color-shade">C: 82 M: 18 Y: 0 K: 73</label>
</button>
<button className="child" style={{border: selectedColor === "#003f54" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#003f54")}>
<div className="color_sample" style={{backgroundColor: "#003f54"}}></div>
<label className="color-name">Pantone 547</label>
<label className="color-shade">C: 100 M: 25 Y: 0 K: 67</label>
</button>
<button className="child" style={{border: selectedColor === "#004459" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#004459")}>
<div className="color_sample" style={{backgroundColor: "#004459"}}></div>
<label className="color-name">Pantone 548</label>
<label className="color-shade">C: 100 M: 24 Y: 0 K: 65</label>
</button>
<button className="child" style={{border: selectedColor === "#5e99aa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5e99aa")}>
<div className="color_sample" style={{backgroundColor: "#5e99aa"}}></div>
<label className="color-name">Pantone 549</label>
<label className="color-shade">C: 45 M: 10 Y: 0 K: 33</label>
</button>
<button className="child" style={{border: selectedColor === "#87afbf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#87afbf")}>
<div className="color_sample" style={{backgroundColor: "#87afbf"}}></div>
<label className="color-name">Pantone 550</label>
<label className="color-shade">C: 29 M: 8 Y: 0 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#a3c1c9" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a3c1c9")}>
<div className="color_sample" style={{backgroundColor: "#a3c1c9"}}></div>
<label className="color-name">Pantone 551</label>
<label className="color-shade">C: 19 M: 4 Y: 0 K: 21</label>
</button>
<button className="child" style={{border: selectedColor === "#c4d6d6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c4d6d6")}>
<div className="color_sample" style={{backgroundColor: "#c4d6d6"}}></div>
<label className="color-name">Pantone 552</label>
<label className="color-shade">C: 8 M: 0 Y: 0 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#234435" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#234435")}>
<div className="color_sample" style={{backgroundColor: "#234435"}}></div>
<label className="color-name">Pantone 553</label>
<label className="color-shade">C: 49 M: 0 Y: 22 K: 73</label>
</button>
<button className="child" style={{border: selectedColor === "#195e47" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#195e47")}>
<div className="color_sample" style={{backgroundColor: "#195e47"}}></div>
<label className="color-name">Pantone 554</label>
<label className="color-shade">C: 73 M: 0 Y: 24 K: 63</label>
</button>
<button className="child" style={{border: selectedColor === "#076d54" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#076d54")}>
<div className="color_sample" style={{backgroundColor: "#076d54"}}></div>
<label className="color-name">Pantone 555</label>
<label className="color-shade">C: 94 M: 0 Y: 23 K: 57</label>
</button>
<button className="child" style={{border: selectedColor === "#7aa891" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7aa891")}>
<div className="color_sample" style={{backgroundColor: "#7aa891"}}></div>
<label className="color-name">Pantone 556</label>
<label className="color-shade">C: 27 M: 0 Y: 14 K: 34</label>
</button>
<button className="child" style={{border: selectedColor === "#a3c1ad" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a3c1ad")}>
<div className="color_sample" style={{backgroundColor: "#a3c1ad"}}></div>
<label className="color-name">Pantone 557</label>
<label className="color-shade">C: 16 M: 0 Y: 10 K: 24</label>
</button>
<button className="child" style={{border: selectedColor === "#b7cebc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b7cebc")}>
<div className="color_sample" style={{backgroundColor: "#b7cebc"}}></div>
<label className="color-name">Pantone 558</label>
<label className="color-shade">C: 11 M: 0 Y: 9 K: 19</label>
</button>
<button className="child" style={{border: selectedColor === "#c6d6c4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c6d6c4")}>
<div className="color_sample" style={{backgroundColor: "#c6d6c4"}}></div>
<label className="color-name">Pantone 559</label>
<label className="color-shade">C: 7 M: 0 Y: 8 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#2b4c3f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#2b4c3f")}>
<div className="color_sample" style={{backgroundColor: "#2b4c3f"}}></div>
<label className="color-name">Pantone 560</label>
<label className="color-shade">C: 43 M: 0 Y: 17 K: 70</label>
</button>
<button className="child" style={{border: selectedColor === "#266659" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#266659")}>
<div className="color_sample" style={{backgroundColor: "#266659"}}></div>
<label className="color-name">Pantone 561</label>
<label className="color-shade">C: 63 M: 0 Y: 13 K: 60</label>
</button>
<button className="child" style={{border: selectedColor === "#1e7a6d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#1e7a6d")}>
<div className="color_sample" style={{backgroundColor: "#1e7a6d"}}></div>
<label className="color-name">Pantone 562</label>
<label className="color-shade">C: 75 M: 0 Y: 11 K: 52</label>
</button>
<button className="child" style={{border: selectedColor === "#7fbcaa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7fbcaa")}>
<div className="color_sample" style={{backgroundColor: "#7fbcaa"}}></div>
<label className="color-name">Pantone 563</label>
<label className="color-shade">C: 32 M: 0 Y: 10 K: 26</label>
</button>
<button className="child" style={{border: selectedColor === "#05705e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#05705e")}>
<div className="color_sample" style={{backgroundColor: "#05705e"}}></div>
<label className="color-name">Pantone 564</label>
<label className="color-shade">C: 96 M: 0 Y: 16 K: 56</label>
</button>
<button className="child" style={{border: selectedColor === "#bcdbcc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bcdbcc")}>
<div className="color_sample" style={{backgroundColor: "#bcdbcc"}}></div>
<label className="color-name">Pantone 565</label>
<label className="color-shade">C: 14 M: 0 Y: 7 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#d1e2d3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d1e2d3")}>
<div className="color_sample" style={{backgroundColor: "#d1e2d3"}}></div>
<label className="color-name">Pantone 566</label>
<label className="color-shade">C: 8 M: 0 Y: 7 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#265142" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#265142")}>
<div className="color_sample" style={{backgroundColor: "#265142"}}></div>
<label className="color-name">Pantone 567</label>
<label className="color-shade">C: 53 M: 0 Y: 19 K: 68</label>
</button>
<button className="child" style={{border: selectedColor === "#008772" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#008772")}>
<div className="color_sample" style={{backgroundColor: "#008772"}}></div>
<label className="color-name">Pantone 569</label>
<label className="color-shade">C: 100 M: 0 Y: 16 K: 47</label>
</button>
<button className="child" style={{border: selectedColor === "#7fc6b2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7fc6b2")}>
<div className="color_sample" style={{backgroundColor: "#7fc6b2"}}></div>
<label className="color-name">Pantone 570</label>
<label className="color-shade">C: 36 M: 0 Y: 10 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#aadbc6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aadbc6")}>
<div className="color_sample" style={{backgroundColor: "#aadbc6"}}></div>
<label className="color-name">Pantone 571</label>
<label className="color-shade">C: 22 M: 0 Y: 10 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#bce2ce" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bce2ce")}>
<div className="color_sample" style={{backgroundColor: "#bce2ce"}}></div>
<label className="color-name">Pantone 572</label>
<label className="color-shade">C: 17 M: 0 Y: 9 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#cce5d6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#cce5d6")}>
<div className="color_sample" style={{backgroundColor: "#cce5d6"}}></div>
<label className="color-name">Pantone 573</label>
<label className="color-shade">C: 11 M: 0 Y: 7 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#495928" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#495928")}>
<div className="color_sample" style={{backgroundColor: "#495928"}}></div>
<label className="color-name">Pantone 574</label>
<label className="color-shade">C: 18 M: 0 Y: 55 K: 65</label>
</button>
<button className="child" style={{border: selectedColor === "#547730" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#547730")}>
<div className="color_sample" style={{backgroundColor: "#547730"}}></div>
<label className="color-name">Pantone 575</label>
<label className="color-shade">C: 29 M: 0 Y: 60 K: 53</label>
</button>
<button className="child" style={{border: selectedColor === "#608e3a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#608e3a")}>
<div className="color_sample" style={{backgroundColor: "#608e3a"}}></div>
<label className="color-name">Pantone 576</label>
<label className="color-shade">C: 32 M: 0 Y: 59 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#b5cc8e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b5cc8e")}>
<div className="color_sample" style={{backgroundColor: "#b5cc8e"}}></div>
<label className="color-name">Pantone 577</label>
<label className="color-shade">C: 11 M: 0 Y: 30 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#c6d6a0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c6d6a0")}>
<div className="color_sample" style={{backgroundColor: "#c6d6a0"}}></div>
<label className="color-name">Pantone 578</label>
<label className="color-shade">C: 7 M: 0 Y: 25 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#c9d6a3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c9d6a3")}>
<div className="color_sample" style={{backgroundColor: "#c9d6a3"}}></div>
<label className="color-name">Pantone 579</label>
<label className="color-shade">C: 6 M: 0 Y: 24 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#d8ddb5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d8ddb5")}>
<div className="color_sample" style={{backgroundColor: "#d8ddb5"}}></div>
<label className="color-name">Pantone 580</label>
<label className="color-shade">C: 2 M: 0 Y: 18 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#605e11" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#605e11")}>
<div className="color_sample" style={{backgroundColor: "#605e11"}}></div>
<label className="color-name">Pantone 581</label>
<label className="color-shade">C: 0 M: 2 Y: 82 K: 62</label>
</button>
<button className="child" style={{border: selectedColor === "#878905" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#878905")}>
<div className="color_sample" style={{backgroundColor: "#878905"}}></div>
<label className="color-name">Pantone 582</label>
<label className="color-shade">C: 1 M: 0 Y: 96 K: 46</label>
</button>
<button className="child" style={{border: selectedColor === "#aaba0a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aaba0a")}>
<div className="color_sample" style={{backgroundColor: "#aaba0a"}}></div>
<label className="color-name">Pantone 583</label>
<label className="color-shade">C: 9 M: 0 Y: 95 K: 27</label>
</button>
<button className="child" style={{border: selectedColor === "#ced649" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ced649")}>
<div className="color_sample" style={{backgroundColor: "#ced649"}}></div>
<label className="color-name">Pantone 584</label>
<label className="color-shade">C: 4 M: 0 Y: 66 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#dbe06b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#dbe06b")}>
<div className="color_sample" style={{backgroundColor: "#dbe06b"}}></div>
<label className="color-name">Pantone 585</label>
<label className="color-shade">C: 2 M: 0 Y: 52 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#e2e584" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e2e584")}>
<div className="color_sample" style={{backgroundColor: "#e2e584"}}></div>
<label className="color-name">Pantone 586</label>
<label className="color-shade">C: 1 M: 0 Y: 42 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#e8e89b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e8e89b")}>
<div className="color_sample" style={{backgroundColor: "#e8e89b"}}></div>
<label className="color-name">Pantone 587</label>
<label className="color-shade">C: 0 M: 0 Y: 33 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#f4edaf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4edaf")}>
<div className="color_sample" style={{backgroundColor: "#f4edaf"}}></div>
<label className="color-name">Pantone 600</label>
<label className="color-shade">C: 0 M: 3 Y: 28 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#f2ed9e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2ed9e")}>
<div className="color_sample" style={{backgroundColor: "#f2ed9e"}}></div>
<label className="color-name">Pantone 601</label>
<label className="color-shade">C: 0 M: 2 Y: 35 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#f2ea87" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2ea87")}>
<div className="color_sample" style={{backgroundColor: "#f2ea87"}}></div>
<label className="color-name">Pantone 602</label>
<label className="color-shade">C: 0 M: 3 Y: 44 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#ede85b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ede85b")}>
<div className="color_sample" style={{backgroundColor: "#ede85b"}}></div>
<label className="color-name">Pantone 603</label>
<label className="color-shade">C: 0 M: 2 Y: 62 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#e8dd21" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e8dd21")}>
<div className="color_sample" style={{backgroundColor: "#e8dd21"}}></div>
<label className="color-name">Pantone 604</label>
<label className="color-shade">C: 0 M: 5 Y: 86 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#ddce11" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ddce11")}>
<div className="color_sample" style={{backgroundColor: "#ddce11"}}></div>
<label className="color-name">Pantone 605</label>
<label className="color-shade">C: 0 M: 7 Y: 92 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#d3bf11" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d3bf11")}>
<div className="color_sample" style={{backgroundColor: "#d3bf11"}}></div>
<label className="color-name">Pantone 606</label>
<label className="color-shade">C: 0 M: 9 Y: 92 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#f2eabc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2eabc")}>
<div className="color_sample" style={{backgroundColor: "#f2eabc"}}></div>
<label className="color-name">Pantone 607</label>
<label className="color-shade">C: 0 M: 3 Y: 22 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#efe8ad" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#efe8ad")}>
<div className="color_sample" style={{backgroundColor: "#efe8ad"}}></div>
<label className="color-name">Pantone 608</label>
<label className="color-shade">C: 0 M: 3 Y: 28 K: 6</label>
</button>
<button className="child" style={{border: selectedColor === "#eae596" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#eae596")}>
<div className="color_sample" style={{backgroundColor: "#eae596"}}></div>
<label className="color-name">Pantone 609</label>
<label className="color-shade">C: 0 M: 2 Y: 36 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#e2db72" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e2db72")}>
<div className="color_sample" style={{backgroundColor: "#e2db72"}}></div>
<label className="color-name">Pantone 610</label>
<label className="color-shade">C: 0 M: 3 Y: 50 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#d6ce49" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6ce49")}>
<div className="color_sample" style={{backgroundColor: "#d6ce49"}}></div>
<label className="color-name">Pantone 611</label>
<label className="color-shade">C: 0 M: 4 Y: 66 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#c4ba00" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c4ba00")}>
<div className="color_sample" style={{backgroundColor: "#c4ba00"}}></div>
<label className="color-name">Pantone 612</label>
<label className="color-shade">C: 0 M: 5 Y: 100 K: 23</label>
</button>
<button className="child" style={{border: selectedColor === "#afa00c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#afa00c")}>
<div className="color_sample" style={{backgroundColor: "#afa00c"}}></div>
<label className="color-name">Pantone 613</label>
<label className="color-shade">C: 0 M: 9 Y: 93 K: 31</label>
</button>
<button className="child" style={{border: selectedColor === "#eae2b7" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#eae2b7")}>
<div className="color_sample" style={{backgroundColor: "#eae2b7"}}></div>
<label className="color-name">Pantone 614</label>
<label className="color-shade">C: 0 M: 3 Y: 22 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#e2dbaa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e2dbaa")}>
<div className="color_sample" style={{backgroundColor: "#e2dbaa"}}></div>
<label className="color-name">Pantone 615</label>
<label className="color-shade">C: 0 M: 3 Y: 25 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#ddd69b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ddd69b")}>
<div className="color_sample" style={{backgroundColor: "#ddd69b"}}></div>
<label className="color-name">Pantone 616</label>
<label className="color-shade">C: 0 M: 3 Y: 30 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#ccc47c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ccc47c")}>
<div className="color_sample" style={{backgroundColor: "#ccc47c"}}></div>
<label className="color-name">Pantone 617</label>
<label className="color-shade">C: 0 M: 4 Y: 39 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#b5aa59" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b5aa59")}>
<div className="color_sample" style={{backgroundColor: "#b5aa59"}}></div>
<label className="color-name">Pantone 618</label>
<label className="color-shade">C: 0 M: 6 Y: 51 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#968c28" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#968c28")}>
<div className="color_sample" style={{backgroundColor: "#968c28"}}></div>
<label className="color-name">Pantone 619</label>
<label className="color-shade">C: 0 M: 7 Y: 73 K: 41</label>
</button>
<button className="child" style={{border: selectedColor === "#847711" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#847711")}>
<div className="color_sample" style={{backgroundColor: "#847711"}}></div>
<label className="color-name">Pantone 620</label>
<label className="color-shade">C: 0 M: 10 Y: 87 K: 48</label>
</button>
<button className="child" style={{border: selectedColor === "#d8ddce" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d8ddce")}>
<div className="color_sample" style={{backgroundColor: "#d8ddce"}}></div>
<label className="color-name">Pantone 621</label>
<label className="color-shade">C: 2 M: 0 Y: 7 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#c1d1bf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c1d1bf")}>
<div className="color_sample" style={{backgroundColor: "#c1d1bf"}}></div>
<label className="color-name">Pantone 622</label>
<label className="color-shade">C: 8 M: 0 Y: 9 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#a5bfaa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a5bfaa")}>
<div className="color_sample" style={{backgroundColor: "#a5bfaa"}}></div>
<label className="color-name">Pantone 623</label>
<label className="color-shade">C: 14 M: 0 Y: 11 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#7fa08c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7fa08c")}>
<div className="color_sample" style={{backgroundColor: "#7fa08c"}}></div>
<label className="color-name">Pantone 624</label>
<label className="color-shade">C: 21 M: 0 Y: 12 K: 37</label>
</button>
<button className="child" style={{border: selectedColor === "#5b8772" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5b8772")}>
<div className="color_sample" style={{backgroundColor: "#5b8772"}}></div>
<label className="color-name">Pantone 625</label>
<label className="color-shade">C: 33 M: 0 Y: 16 K: 47</label>
</button>
<button className="child" style={{border: selectedColor === "#21543f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#21543f")}>
<div className="color_sample" style={{backgroundColor: "#21543f"}}></div>
<label className="color-name">Pantone 626</label>
<label className="color-shade">C: 61 M: 0 Y: 25 K: 67</label>
</button>
<button className="child" style={{border: selectedColor === "#0c3026" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#0c3026")}>
<div className="color_sample" style={{backgroundColor: "#0c3026"}}></div>
<label className="color-name">Pantone 627</label>
<label className="color-shade">C: 75 M: 0 Y: 21 K: 81</label>
</button>
<button className="child" style={{border: selectedColor === "#cce2dd" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#cce2dd")}>
<div className="color_sample" style={{backgroundColor: "#cce2dd"}}></div>
<label className="color-name">Pantone 628</label>
<label className="color-shade">C: 10 M: 0 Y: 2 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#b2d8d8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b2d8d8")}>
<div className="color_sample" style={{backgroundColor: "#b2d8d8"}}></div>
<label className="color-name">Pantone 629</label>
<label className="color-shade">C: 18 M: 0 Y: 0 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#8cccd3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8cccd3")}>
<div className="color_sample" style={{backgroundColor: "#8cccd3"}}></div>
<label className="color-name">Pantone 630</label>
<label className="color-shade">C: 34 M: 3 Y: 0 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#54b7c6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#54b7c6")}>
<div className="color_sample" style={{backgroundColor: "#54b7c6"}}></div>
<label className="color-name">Pantone 631</label>
<label className="color-shade">C: 58 M: 8 Y: 0 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#00a0ba" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00a0ba")}>
<div className="color_sample" style={{backgroundColor: "#00a0ba"}}></div>
<label className="color-name">Pantone 632</label>
<label className="color-shade">C: 100 M: 14 Y: 0 K: 27</label>
</button>
<button className="child" style={{border: selectedColor === "#007f99" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#007f99")}>
<div className="color_sample" style={{backgroundColor: "#007f99"}}></div>
<label className="color-name">Pantone 633</label>
<label className="color-shade">C: 100 M: 17 Y: 0 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#00667f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00667f")}>
<div className="color_sample" style={{backgroundColor: "#00667f"}}></div>
<label className="color-name">Pantone 634</label>
<label className="color-shade">C: 100 M: 20 Y: 0 K: 50</label>
</button>
<button className="child" style={{border: selectedColor === "#bae0e0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bae0e0")}>
<div className="color_sample" style={{backgroundColor: "#bae0e0"}}></div>
<label className="color-name">Pantone 635</label>
<label className="color-shade">C: 17 M: 0 Y: 0 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#99d6dd" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#99d6dd")}>
<div className="color_sample" style={{backgroundColor: "#99d6dd"}}></div>
<label className="color-name">Pantone 636</label>
<label className="color-shade">C: 31 M: 3 Y: 0 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#6bc9db" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6bc9db")}>
<div className="color_sample" style={{backgroundColor: "#6bc9db"}}></div>
<label className="color-name">Pantone 637</label>
<label className="color-shade">C: 51 M: 8 Y: 0 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#000000" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#000000")}>
<div className="color_sample" style={{backgroundColor: "#000000"}}></div>
<label className="color-name">Pantone 638</label>
<label className="color-shade">C: 0 M: 0 Y: 0 K: 100</label>
</button>
<button className="child" style={{border: selectedColor === "#00a0c4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00a0c4")}>
<div className="color_sample" style={{backgroundColor: "#00a0c4"}}></div>
<label className="color-name">Pantone 639</label>
<label className="color-shade">C: 100 M: 18 Y: 0 K: 23</label>
</button>
<button className="child" style={{border: selectedColor === "#008cb2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#008cb2")}>
<div className="color_sample" style={{backgroundColor: "#008cb2"}}></div>
<label className="color-name">Pantone 640</label>
<label className="color-shade">C: 100 M: 21 Y: 0 K: 30</label>
</button>
<button className="child" style={{border: selectedColor === "#007aa5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#007aa5")}>
<div className="color_sample" style={{backgroundColor: "#007aa5"}}></div>
<label className="color-name">Pantone 641</label>
<label className="color-shade">C: 100 M: 26 Y: 0 K: 35</label>
</button>
<button className="child" style={{border: selectedColor === "#d1d8d8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d1d8d8")}>
<div className="color_sample" style={{backgroundColor: "#d1d8d8"}}></div>
<label className="color-name">Pantone 642</label>
<label className="color-shade">C: 3 M: 0 Y: 0 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#c6d1d6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c6d1d6")}>
<div className="color_sample" style={{backgroundColor: "#c6d1d6"}}></div>
<label className="color-name">Pantone 643</label>
<label className="color-shade">C: 7 M: 2 Y: 0 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#9bafc4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9bafc4")}>
<div className="color_sample" style={{backgroundColor: "#9bafc4"}}></div>
<label className="color-name">Pantone 644</label>
<label className="color-shade">C: 21 M: 11 Y: 0 K: 23</label>
</button>
<button className="child" style={{border: selectedColor === "#7796b2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7796b2")}>
<div className="color_sample" style={{backgroundColor: "#7796b2"}}></div>
<label className="color-name">Pantone 645</label>
<label className="color-shade">C: 33 M: 16 Y: 0 K: 30</label>
</button>
<button className="child" style={{border: selectedColor === "#5e82a3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5e82a3")}>
<div className="color_sample" style={{backgroundColor: "#5e82a3"}}></div>
<label className="color-name">Pantone 646</label>
<label className="color-shade">C: 42 M: 20 Y: 0 K: 36</label>
</button>
<button className="child" style={{border: selectedColor === "#26547c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#26547c")}>
<div className="color_sample" style={{backgroundColor: "#26547c"}}></div>
<label className="color-name">Pantone 647</label>
<label className="color-shade">C: 69 M: 32 Y: 0 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#00305e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00305e")}>
<div className="color_sample" style={{backgroundColor: "#00305e"}}></div>
<label className="color-name">Pantone 648</label>
<label className="color-shade">C: 100 M: 49 Y: 0 K: 63</label>
</button>
<button className="child" style={{border: selectedColor === "#d6d6d8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6d6d8")}>
<div className="color_sample" style={{backgroundColor: "#d6d6d8"}}></div>
<label className="color-name">Pantone 649</label>
<label className="color-shade">C: 1 M: 1 Y: 0 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#bfc6d1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bfc6d1")}>
<div className="color_sample" style={{backgroundColor: "#bfc6d1"}}></div>
<label className="color-name">Pantone 650</label>
<label className="color-shade">C: 9 M: 5 Y: 0 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#9baabf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9baabf")}>
<div className="color_sample" style={{backgroundColor: "#9baabf"}}></div>
<label className="color-name">Pantone 651</label>
<label className="color-shade">C: 19 M: 11 Y: 0 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#6d87a8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6d87a8")}>
<div className="color_sample" style={{backgroundColor: "#6d87a8"}}></div>
<label className="color-name">Pantone 652</label>
<label className="color-shade">C: 35 M: 20 Y: 0 K: 34</label>
</button>
<button className="child" style={{border: selectedColor === "#335687" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#335687")}>
<div className="color_sample" style={{backgroundColor: "#335687"}}></div>
<label className="color-name">Pantone 653</label>
<label className="color-shade">C: 62 M: 36 Y: 0 K: 47</label>
</button>
<button className="child" style={{border: selectedColor === "#0f2b5b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#0f2b5b")}>
<div className="color_sample" style={{backgroundColor: "#0f2b5b"}}></div>
<label className="color-name">Pantone 654</label>
<label className="color-shade">C: 84 M: 53 Y: 0 K: 64</label>
</button>
<button className="child" style={{border: selectedColor === "#0c1c47" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#0c1c47")}>
<div className="color_sample" style={{backgroundColor: "#0c1c47"}}></div>
<label className="color-name">Pantone 655</label>
<label className="color-shade">C: 83 M: 61 Y: 0 K: 72</label>
</button>
<button className="child" style={{border: selectedColor === "#d6dbe0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6dbe0")}>
<div className="color_sample" style={{backgroundColor: "#d6dbe0"}}></div>
<label className="color-name">Pantone 656</label>
<label className="color-shade">C: 4 M: 2 Y: 0 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#c1c9dd" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c1c9dd")}>
<div className="color_sample" style={{backgroundColor: "#c1c9dd"}}></div>
<label className="color-name">Pantone 657</label>
<label className="color-shade">C: 13 M: 9 Y: 0 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#a5afd6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a5afd6")}>
<div className="color_sample" style={{backgroundColor: "#a5afd6"}}></div>
<label className="color-name">Pantone 658</label>
<label className="color-shade">C: 23 M: 18 Y: 0 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#7f8cbf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7f8cbf")}>
<div className="color_sample" style={{backgroundColor: "#7f8cbf"}}></div>
<label className="color-name">Pantone 659</label>
<label className="color-shade">C: 34 M: 27 Y: 0 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#5960a8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5960a8")}>
<div className="color_sample" style={{backgroundColor: "#5960a8"}}></div>
<label className="color-name">Pantone 660</label>
<label className="color-shade">C: 47 M: 43 Y: 0 K: 34</label>
</button>
<button className="child" style={{border: selectedColor === "#2d338e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#2d338e")}>
<div className="color_sample" style={{backgroundColor: "#2d338e"}}></div>
<label className="color-name">Pantone 661</label>
<label className="color-shade">C: 68 M: 64 Y: 0 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#0c1975" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#0c1975")}>
<div className="color_sample" style={{backgroundColor: "#0c1975"}}></div>
<label className="color-name">Pantone 662</label>
<label className="color-shade">C: 90 M: 79 Y: 0 K: 54</label>
</button>
<button className="child" style={{border: selectedColor === "#e2d3d6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e2d3d6")}>
<div className="color_sample" style={{backgroundColor: "#e2d3d6"}}></div>
<label className="color-name">Pantone 663</label>
<label className="color-shade">C: 0 M: 7 Y: 5 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#d8ccd1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d8ccd1")}>
<div className="color_sample" style={{backgroundColor: "#d8ccd1"}}></div>
<label className="color-name">Pantone 664</label>
<label className="color-shade">C: 0 M: 6 Y: 3 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#c6b5c4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c6b5c4")}>
<div className="color_sample" style={{backgroundColor: "#c6b5c4"}}></div>
<label className="color-name">Pantone 665</label>
<label className="color-shade">C: 0 M: 9 Y: 1 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#a893ad" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a893ad")}>
<div className="color_sample" style={{backgroundColor: "#a893ad"}}></div>
<label className="color-name">Pantone 666</label>
<label className="color-shade">C: 3 M: 15 Y: 0 K: 32</label>
</button>
<button className="child" style={{border: selectedColor === "#7f6689" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7f6689")}>
<div className="color_sample" style={{backgroundColor: "#7f6689"}}></div>
<label className="color-name">Pantone 667</label>
<label className="color-shade">C: 7 M: 26 Y: 0 K: 46</label>
</button>
<button className="child" style={{border: selectedColor === "#664975" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#664975")}>
<div className="color_sample" style={{backgroundColor: "#664975"}}></div>
<label className="color-name">Pantone 668</label>
<label className="color-shade">C: 13 M: 38 Y: 0 K: 54</label>
</button>
<button className="child" style={{border: selectedColor === "#472b59" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#472b59")}>
<div className="color_sample" style={{backgroundColor: "#472b59"}}></div>
<label className="color-name">Pantone 669</label>
<label className="color-shade">C: 20 M: 52 Y: 0 K: 65</label>
</button>
<button className="child" style={{border: selectedColor === "#f2d6d8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2d6d8")}>
<div className="color_sample" style={{backgroundColor: "#f2d6d8"}}></div>
<label className="color-name">Pantone 670</label>
<label className="color-shade">C: 0 M: 12 Y: 11 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#efc6d3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#efc6d3")}>
<div className="color_sample" style={{backgroundColor: "#efc6d3"}}></div>
<label className="color-name">Pantone 671</label>
<label className="color-shade">C: 0 M: 17 Y: 12 K: 6</label>
</button>
<button className="child" style={{border: selectedColor === "#eaaac4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#eaaac4")}>
<div className="color_sample" style={{backgroundColor: "#eaaac4"}}></div>
<label className="color-name">Pantone 672</label>
<label className="color-shade">C: 0 M: 27 Y: 16 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#e08cb2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e08cb2")}>
<div className="color_sample" style={{backgroundColor: "#e08cb2"}}></div>
<label className="color-name">Pantone 673</label>
<label className="color-shade">C: 0 M: 37 Y: 21 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#d36b9e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d36b9e")}>
<div className="color_sample" style={{backgroundColor: "#d36b9e"}}></div>
<label className="color-name">Pantone 674</label>
<label className="color-shade">C: 0 M: 49 Y: 25 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#bc3877" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bc3877")}>
<div className="color_sample" style={{backgroundColor: "#bc3877"}}></div>
<label className="color-name">Pantone 675</label>
<label className="color-shade">C: 0 M: 70 Y: 37 K: 26</label>
</button>
<button className="child" style={{border: selectedColor === "#a00054" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a00054")}>
<div className="color_sample" style={{backgroundColor: "#a00054"}}></div>
<label className="color-name">Pantone 676</label>
<label className="color-shade">C: 0 M: 100 Y: 48 K: 37</label>
</button>
<button className="child" style={{border: selectedColor === "#edd6d6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#edd6d6")}>
<div className="color_sample" style={{backgroundColor: "#edd6d6"}}></div>
<label className="color-name">Pantone 677</label>
<label className="color-shade">C: 0 M: 10 Y: 10 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#eaccce" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#eaccce")}>
<div className="color_sample" style={{backgroundColor: "#eaccce"}}></div>
<label className="color-name">Pantone 678</label>
<label className="color-shade">C: 0 M: 13 Y: 12 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#e5bfc6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e5bfc6")}>
<div className="color_sample" style={{backgroundColor: "#e5bfc6"}}></div>
<label className="color-name">Pantone 679</label>
<label className="color-shade">C: 0 M: 17 Y: 14 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#d39eaf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d39eaf")}>
<div className="color_sample" style={{backgroundColor: "#d39eaf"}}></div>
<label className="color-name">Pantone 680</label>
<label className="color-shade">C: 0 M: 25 Y: 17 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#b7728e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b7728e")}>
<div className="color_sample" style={{backgroundColor: "#b7728e"}}></div>
<label className="color-name">Pantone 681</label>
<label className="color-shade">C: 0 M: 38 Y: 22 K: 28</label>
</button>
<button className="child" style={{border: selectedColor === "#a05175" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a05175")}>
<div className="color_sample" style={{backgroundColor: "#a05175"}}></div>
<label className="color-name">Pantone 682</label>
<label className="color-shade">C: 0 M: 49 Y: 27 K: 37</label>
</button>
<button className="child" style={{border: selectedColor === "#7f284f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7f284f")}>
<div className="color_sample" style={{backgroundColor: "#7f284f"}}></div>
<label className="color-name">Pantone 683</label>
<label className="color-shade">C: 0 M: 69 Y: 38 K: 50</label>
</button>
<button className="child" style={{border: selectedColor === "#efccce" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#efccce")}>
<div className="color_sample" style={{backgroundColor: "#efccce"}}></div>
<label className="color-name">Pantone 684</label>
<label className="color-shade">C: 0 M: 15 Y: 14 K: 6</label>
</button>
<button className="child" style={{border: selectedColor === "#eabfc4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#eabfc4")}>
<div className="color_sample" style={{backgroundColor: "#eabfc4"}}></div>
<label className="color-name">Pantone 685</label>
<label className="color-shade">C: 0 M: 18 Y: 16 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#e0aaba" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e0aaba")}>
<div className="color_sample" style={{backgroundColor: "#e0aaba"}}></div>
<label className="color-name">Pantone 686</label>
<label className="color-shade">C: 0 M: 24 Y: 17 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#c9899e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c9899e")}>
<div className="color_sample" style={{backgroundColor: "#c9899e"}}></div>
<label className="color-name">Pantone 687</label>
<label className="color-shade">C: 0 M: 32 Y: 21 K: 21</label>
</button>
<button className="child" style={{border: selectedColor === "#b26684" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b26684")}>
<div className="color_sample" style={{backgroundColor: "#b26684"}}></div>
<label className="color-name">Pantone 688</label>
<label className="color-shade">C: 0 M: 43 Y: 26 K: 30</label>
</button>
<button className="child" style={{border: selectedColor === "#934266" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#934266")}>
<div className="color_sample" style={{backgroundColor: "#934266"}}></div>
<label className="color-name">Pantone 689</label>
<label className="color-shade">C: 0 M: 55 Y: 31 K: 42</label>
</button>
<button className="child" style={{border: selectedColor === "#702342" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#702342")}>
<div className="color_sample" style={{backgroundColor: "#702342"}}></div>
<label className="color-name">Pantone 690</label>
<label className="color-shade">C: 0 M: 69 Y: 41 K: 56</label>
</button>
<button className="child" style={{border: selectedColor === "#efd1c9" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#efd1c9")}>
<div className="color_sample" style={{backgroundColor: "#efd1c9"}}></div>
<label className="color-name">Pantone 691</label>
<label className="color-shade">C: 0 M: 13 Y: 16 K: 6</label>
</button>
<button className="child" style={{border: selectedColor === "#e8bfba" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e8bfba")}>
<div className="color_sample" style={{backgroundColor: "#e8bfba"}}></div>
<label className="color-name">Pantone 692</label>
<label className="color-shade">C: 0 M: 18 Y: 20 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#dba8a5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#dba8a5")}>
<div className="color_sample" style={{backgroundColor: "#dba8a5"}}></div>
<label className="color-name">Pantone 693</label>
<label className="color-shade">C: 0 M: 23 Y: 25 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#c98c8c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c98c8c")}>
<div className="color_sample" style={{backgroundColor: "#c98c8c"}}></div>
<label className="color-name">Pantone 694</label>
<label className="color-shade">C: 0 M: 30 Y: 30 K: 21</label>
</button>
<button className="child" style={{border: selectedColor === "#b26b70" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b26b70")}>
<div className="color_sample" style={{backgroundColor: "#b26b70"}}></div>
<label className="color-name">Pantone 695</label>
<label className="color-shade">C: 0 M: 40 Y: 37 K: 30</label>
</button>
<button className="child" style={{border: selectedColor === "#8e4749" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8e4749")}>
<div className="color_sample" style={{backgroundColor: "#8e4749"}}></div>
<label className="color-name">Pantone 696</label>
<label className="color-shade">C: 0 M: 50 Y: 49 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#7f383a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7f383a")}>
<div className="color_sample" style={{backgroundColor: "#7f383a"}}></div>
<label className="color-name">Pantone 697</label>
<label className="color-shade">C: 0 M: 56 Y: 54 K: 50</label>
</button>
<button className="child" style={{border: selectedColor === "#f7d1cc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f7d1cc")}>
<div className="color_sample" style={{backgroundColor: "#f7d1cc"}}></div>
<label className="color-name">Pantone 698</label>
<label className="color-shade">C: 0 M: 15 Y: 17 K: 3</label>
</button>
<button className="child" style={{border: selectedColor === "#f7bfbf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f7bfbf")}>
<div className="color_sample" style={{backgroundColor: "#f7bfbf"}}></div>
<label className="color-name">Pantone 699</label>
<label className="color-shade">C: 0 M: 23 Y: 23 K: 3</label>
</button>
<button className="child" style={{border: selectedColor === "#f2a5aa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2a5aa")}>
<div className="color_sample" style={{backgroundColor: "#f2a5aa"}}></div>
<label className="color-name">Pantone 700</label>
<label className="color-shade">C: 0 M: 32 Y: 30 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#e8878e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e8878e")}>
<div className="color_sample" style={{backgroundColor: "#e8878e"}}></div>
<label className="color-name">Pantone 701</label>
<label className="color-shade">C: 0 M: 42 Y: 39 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#d6606d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6606d")}>
<div className="color_sample" style={{backgroundColor: "#d6606d"}}></div>
<label className="color-name">Pantone 702</label>
<label className="color-shade">C: 0 M: 55 Y: 49 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#b73844" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b73844")}>
<div className="color_sample" style={{backgroundColor: "#b73844"}}></div>
<label className="color-name">Pantone 703</label>
<label className="color-shade">C: 0 M: 69 Y: 63 K: 28</label>
</button>
<button className="child" style={{border: selectedColor === "#9e2828" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9e2828")}>
<div className="color_sample" style={{backgroundColor: "#9e2828"}}></div>
<label className="color-name">Pantone 704</label>
<label className="color-shade">C: 0 M: 75 Y: 75 K: 38</label>
</button>
<button className="child" style={{border: selectedColor === "#f9ddd6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9ddd6")}>
<div className="color_sample" style={{backgroundColor: "#f9ddd6"}}></div>
<label className="color-name">Pantone 705</label>
<label className="color-shade">C: 0 M: 11 Y: 14 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#fcc9c6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fcc9c6")}>
<div className="color_sample" style={{backgroundColor: "#fcc9c6"}}></div>
<label className="color-name">Pantone 706</label>
<label className="color-shade">C: 0 M: 20 Y: 21 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#fcadaf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fcadaf")}>
<div className="color_sample" style={{backgroundColor: "#fcadaf"}}></div>
<label className="color-name">Pantone 707</label>
<label className="color-shade">C: 0 M: 31 Y: 31 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#f98e99" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f98e99")}>
<div className="color_sample" style={{backgroundColor: "#f98e99"}}></div>
<label className="color-name">Pantone 708</label>
<label className="color-shade">C: 0 M: 43 Y: 39 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f26877" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f26877")}>
<div className="color_sample" style={{backgroundColor: "#f26877"}}></div>
<label className="color-name">Pantone 709</label>
<label className="color-shade">C: 0 M: 57 Y: 51 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#e04251" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e04251")}>
<div className="color_sample" style={{backgroundColor: "#e04251"}}></div>
<label className="color-name">Pantone 710</label>
<label className="color-shade">C: 0 M: 71 Y: 64 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#d12d33" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d12d33")}>
<div className="color_sample" style={{backgroundColor: "#d12d33"}}></div>
<label className="color-name">Pantone 711</label>
<label className="color-shade">C: 0 M: 78 Y: 76 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#ffd3aa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffd3aa")}>
<div className="color_sample" style={{backgroundColor: "#ffd3aa"}}></div>
<label className="color-name">Pantone 712</label>
<label className="color-shade">C: 0 M: 17 Y: 33 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#f9c9a3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9c9a3")}>
<div className="color_sample" style={{backgroundColor: "#f9c9a3"}}></div>
<label className="color-name">Pantone 713</label>
<label className="color-shade">C: 0 M: 19 Y: 35 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f9ba82" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9ba82")}>
<div className="color_sample" style={{backgroundColor: "#f9ba82"}}></div>
<label className="color-name">Pantone 714</label>
<label className="color-shade">C: 0 M: 25 Y: 48 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#fc9e49" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fc9e49")}>
<div className="color_sample" style={{backgroundColor: "#fc9e49"}}></div>
<label className="color-name">Pantone 715</label>
<label className="color-shade">C: 0 M: 37 Y: 71 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#f28411" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f28411")}>
<div className="color_sample" style={{backgroundColor: "#f28411"}}></div>
<label className="color-name">Pantone 716</label>
<label className="color-shade">C: 0 M: 45 Y: 93 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#d36d00" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d36d00")}>
<div className="color_sample" style={{backgroundColor: "#d36d00"}}></div>
<label className="color-name">Pantone 717</label>
<label className="color-shade">C: 0 M: 48 Y: 100 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#bf5b00" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bf5b00")}>
<div className="color_sample" style={{backgroundColor: "#bf5b00"}}></div>
<label className="color-name">Pantone 718</label>
<label className="color-shade">C: 0 M: 52 Y: 100 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#f4d1af" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4d1af")}>
<div className="color_sample" style={{backgroundColor: "#f4d1af"}}></div>
<label className="color-name">Pantone 719</label>
<label className="color-shade">C: 0 M: 14 Y: 28 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#efc49e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#efc49e")}>
<div className="color_sample" style={{backgroundColor: "#efc49e"}}></div>
<label className="color-name">Pantone 720</label>
<label className="color-shade">C: 0 M: 18 Y: 34 K: 6</label>
</button>
<button className="child" style={{border: selectedColor === "#e8b282" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e8b282")}>
<div className="color_sample" style={{backgroundColor: "#e8b282"}}></div>
<label className="color-name">Pantone 721</label>
<label className="color-shade">C: 0 M: 23 Y: 44 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#d18e54" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d18e54")}>
<div className="color_sample" style={{backgroundColor: "#d18e54"}}></div>
<label className="color-name">Pantone 722</label>
<label className="color-shade">C: 0 M: 32 Y: 60 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#ba7530" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ba7530")}>
<div className="color_sample" style={{backgroundColor: "#ba7530"}}></div>
<label className="color-name">Pantone 723</label>
<label className="color-shade">C: 0 M: 37 Y: 74 K: 27</label>
</button>
<button className="child" style={{border: selectedColor === "#8e4905" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8e4905")}>
<div className="color_sample" style={{backgroundColor: "#8e4905"}}></div>
<label className="color-name">Pantone 724</label>
<label className="color-shade">C: 0 M: 49 Y: 96 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#753802" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#753802")}>
<div className="color_sample" style={{backgroundColor: "#753802"}}></div>
<label className="color-name">Pantone 725</label>
<label className="color-shade">C: 0 M: 52 Y: 98 K: 54</label>
</button>
<button className="child" style={{border: selectedColor === "#edd3b5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#edd3b5")}>
<div className="color_sample" style={{backgroundColor: "#edd3b5"}}></div>
<label className="color-name">Pantone 726</label>
<label className="color-shade">C: 0 M: 11 Y: 24 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#e2bf9b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e2bf9b")}>
<div className="color_sample" style={{backgroundColor: "#e2bf9b"}}></div>
<label className="color-name">Pantone 727</label>
<label className="color-shade">C: 0 M: 15 Y: 31 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#d3a87c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d3a87c")}>
<div className="color_sample" style={{backgroundColor: "#d3a87c"}}></div>
<label className="color-name">Pantone 728</label>
<label className="color-shade">C: 0 M: 20 Y: 41 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#c18e60" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c18e60")}>
<div className="color_sample" style={{backgroundColor: "#c18e60"}}></div>
<label className="color-name">Pantone 729</label>
<label className="color-shade">C: 0 M: 26 Y: 50 K: 24</label>
</button>
<button className="child" style={{border: selectedColor === "#aa753f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aa753f")}>
<div className="color_sample" style={{backgroundColor: "#aa753f"}}></div>
<label className="color-name">Pantone 730</label>
<label className="color-shade">C: 0 M: 31 Y: 63 K: 33</label>
</button>
<button className="child" style={{border: selectedColor === "#723f0a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#723f0a")}>
<div className="color_sample" style={{backgroundColor: "#723f0a"}}></div>
<label className="color-name">Pantone 731</label>
<label className="color-shade">C: 0 M: 45 Y: 91 K: 55</label>
</button>
<button className="child" style={{border: selectedColor === "#60330a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#60330a")}>
<div className="color_sample" style={{backgroundColor: "#60330a"}}></div>
<label className="color-name">Pantone 732</label>
<label className="color-shade">C: 0 M: 47 Y: 90 K: 62</label>
</button>
<button className="child" style={{border: selectedColor === "#00aacc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00aacc")}>
<div className="color_sample" style={{backgroundColor: "#00aacc"}}></div>
<label className="color-name">Pantone 801</label>
<label className="color-shade">C: 100 M: 17 Y: 0 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#60dd49" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#60dd49")}>
<div className="color_sample" style={{backgroundColor: "#60dd49"}}></div>
<label className="color-name">Pantone 802</label>
<label className="color-shade">C: 57 M: 0 Y: 67 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#ffed38" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffed38")}>
<div className="color_sample" style={{backgroundColor: "#ffed38"}}></div>
<label className="color-name">Pantone 803</label>
<label className="color-shade">C: 0 M: 7 Y: 78 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#ff9338" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ff9338")}>
<div className="color_sample" style={{backgroundColor: "#ff9338"}}></div>
<label className="color-name">Pantone 804</label>
<label className="color-shade">C: 0 M: 42 Y: 78 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#f95951" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f95951")}>
<div className="color_sample" style={{backgroundColor: "#f95951"}}></div>
<label className="color-name">Pantone 805</label>
<label className="color-shade">C: 0 M: 64 Y: 67 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#ff0093" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ff0093")}>
<div className="color_sample" style={{backgroundColor: "#ff0093"}}></div>
<label className="color-name">Pantone 806</label>
<label className="color-shade">C: 0 M: 100 Y: 42 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#d6009e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6009e")}>
<div className="color_sample" style={{backgroundColor: "#d6009e"}}></div>
<label className="color-name">Pantone 807</label>
<label className="color-shade">C: 0 M: 100 Y: 26 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#00b59b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00b59b")}>
<div className="color_sample" style={{backgroundColor: "#00b59b"}}></div>
<label className="color-name">Pantone 808</label>
<label className="color-shade">C: 100 M: 0 Y: 14 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#dde00f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#dde00f")}>
<div className="color_sample" style={{backgroundColor: "#dde00f"}}></div>
<label className="color-name">Pantone 809</label>
<label className="color-shade">C: 1 M: 0 Y: 93 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#ffcc1e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffcc1e")}>
<div className="color_sample" style={{backgroundColor: "#ffcc1e"}}></div>
<label className="color-name">Pantone 810</label>
<label className="color-shade">C: 0 M: 20 Y: 88 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#ff7247" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ff7247")}>
<div className="color_sample" style={{backgroundColor: "#ff7247"}}></div>
<label className="color-name">Pantone 811</label>
<label className="color-shade">C: 0 M: 55 Y: 72 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#fc2366" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fc2366")}>
<div className="color_sample" style={{backgroundColor: "#fc2366"}}></div>
<label className="color-name">Pantone 812</label>
<label className="color-shade">C: 0 M: 86 Y: 60 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#e50099" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e50099")}>
<div className="color_sample" style={{backgroundColor: "#e50099"}}></div>
<label className="color-name">Pantone 813</label>
<label className="color-shade">C: 0 M: 100 Y: 33 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#8c60c1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8c60c1")}>
<div className="color_sample" style={{backgroundColor: "#8c60c1"}}></div>
<label className="color-name">Pantone 814</label>
<label className="color-shade">C: 27 M: 50 Y: 0 K: 24</label>
</button>
<button className="child" style={{border: selectedColor === "#f7e8aa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f7e8aa")}>
<div className="color_sample" style={{backgroundColor: "#f7e8aa"}}></div>
<label className="color-name">Pantone 1205</label>
<label className="color-shade">C: 0 M: 6 Y: 31 K: 3</label>
</button>
<button className="child" style={{border: selectedColor === "#f9e08c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9e08c")}>
<div className="color_sample" style={{backgroundColor: "#f9e08c"}}></div>
<label className="color-name">Pantone 1215</label>
<label className="color-shade">C: 0 M: 10 Y: 44 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#ffcc49" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffcc49")}>
<div className="color_sample" style={{backgroundColor: "#ffcc49"}}></div>
<label className="color-name">Pantone 1225</label>
<label className="color-shade">C: 0 M: 20 Y: 71 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#fcb514" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fcb514")}>
<div className="color_sample" style={{backgroundColor: "#fcb514"}}></div>
<label className="color-name">Pantone 1235</label>
<label className="color-shade">C: 0 M: 28 Y: 92 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#bf910c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bf910c")}>
<div className="color_sample" style={{backgroundColor: "#bf910c"}}></div>
<label className="color-name">Pantone 1245</label>
<label className="color-shade">C: 0 M: 24 Y: 94 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#a37f14" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a37f14")}>
<div className="color_sample" style={{backgroundColor: "#a37f14"}}></div>
<label className="color-name">Pantone 1255</label>
<label className="color-shade">C: 0 M: 22 Y: 88 K: 36</label>
</button>
<button className="child" style={{border: selectedColor === "#7c6316" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7c6316")}>
<div className="color_sample" style={{backgroundColor: "#7c6316"}}></div>
<label className="color-name">Pantone 1265</label>
<label className="color-shade">C: 0 M: 20 Y: 82 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#ffd691" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffd691")}>
<div className="color_sample" style={{backgroundColor: "#ffd691"}}></div>
<label className="color-name">Pantone 1345</label>
<label className="color-shade">C: 0 M: 16 Y: 43 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#fcce87" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fcce87")}>
<div className="color_sample" style={{backgroundColor: "#fcce87"}}></div>
<label className="color-name">Pantone 1355</label>
<label className="color-shade">C: 0 M: 18 Y: 46 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#fcba5e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fcba5e")}>
<div className="color_sample" style={{backgroundColor: "#fcba5e"}}></div>
<label className="color-name">Pantone 1365</label>
<label className="color-shade">C: 0 M: 26 Y: 63 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#f99b0c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f99b0c")}>
<div className="color_sample" style={{backgroundColor: "#f99b0c"}}></div>
<label className="color-name">Pantone 1375</label>
<label className="color-shade">C: 0 M: 38 Y: 95 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#cc7a02" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#cc7a02")}>
<div className="color_sample" style={{backgroundColor: "#cc7a02"}}></div>
<label className="color-name">Pantone 1385</label>
<label className="color-shade">C: 0 M: 40 Y: 99 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#996007" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#996007")}>
<div className="color_sample" style={{backgroundColor: "#996007"}}></div>
<label className="color-name">Pantone 1395</label>
<label className="color-shade">C: 0 M: 37 Y: 95 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#6b4714" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6b4714")}>
<div className="color_sample" style={{backgroundColor: "#6b4714"}}></div>
<label className="color-name">Pantone 1405</label>
<label className="color-shade">C: 0 M: 34 Y: 81 K: 58</label>
</button>
<button className="child" style={{border: selectedColor === "#ffb777" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ffb777")}>
<div className="color_sample" style={{backgroundColor: "#ffb777"}}></div>
<label className="color-name">Pantone 1485</label>
<label className="color-shade">C: 0 M: 28 Y: 53 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#ff993f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ff993f")}>
<div className="color_sample" style={{backgroundColor: "#ff993f"}}></div>
<label className="color-name">Pantone 1495</label>
<label className="color-shade">C: 0 M: 40 Y: 75 K: 0</label>
</button>
<button className="child" style={{border: selectedColor === "#f47c00" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f47c00")}>
<div className="color_sample" style={{backgroundColor: "#f47c00"}}></div>
<label className="color-name">Pantone 1505</label>
<label className="color-shade">C: 0 M: 49 Y: 100 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#b55400" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b55400")}>
<div className="color_sample" style={{backgroundColor: "#b55400"}}></div>
<label className="color-name">Pantone 1525</label>
<label className="color-shade">C: 0 M: 54 Y: 100 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#8c4400" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8c4400")}>
<div className="color_sample" style={{backgroundColor: "#8c4400"}}></div>
<label className="color-name">Pantone 1535</label>
<label className="color-shade">C: 0 M: 51 Y: 100 K: 45</label>
</button>
<button className="child" style={{border: selectedColor === "#4c280f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#4c280f")}>
<div className="color_sample" style={{backgroundColor: "#4c280f"}}></div>
<label className="color-name">Pantone 1545</label>
<label className="color-shade">C: 0 M: 47 Y: 80 K: 70</label>
</button>
<button className="child" style={{border: selectedColor === "#f9bf9e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9bf9e")}>
<div className="color_sample" style={{backgroundColor: "#f9bf9e"}}></div>
<label className="color-name">Pantone 1555</label>
<label className="color-shade">C: 0 M: 23 Y: 37 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#fca577" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fca577")}>
<div className="color_sample" style={{backgroundColor: "#fca577"}}></div>
<label className="color-name">Pantone 1565</label>
<label className="color-shade">C: 0 M: 35 Y: 53 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#fc8744" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fc8744")}>
<div className="color_sample" style={{backgroundColor: "#fc8744"}}></div>
<label className="color-name">Pantone 1575</label>
<label className="color-shade">C: 0 M: 46 Y: 73 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#f96b07" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f96b07")}>
<div className="color_sample" style={{backgroundColor: "#f96b07"}}></div>
<label className="color-name">Pantone 1585</label>
<label className="color-shade">C: 0 M: 57 Y: 97 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#d15b05" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d15b05")}>
<div className="color_sample" style={{backgroundColor: "#d15b05"}}></div>
<label className="color-name">Pantone 1595</label>
<label className="color-shade">C: 0 M: 56 Y: 98 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#a04f11" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a04f11")}>
<div className="color_sample" style={{backgroundColor: "#a04f11"}}></div>
<label className="color-name">Pantone 1605</label>
<label className="color-shade">C: 0 M: 51 Y: 89 K: 37</label>
</button>
<button className="child" style={{border: selectedColor === "#843f0f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#843f0f")}>
<div className="color_sample" style={{backgroundColor: "#843f0f"}}></div>
<label className="color-name">Pantone 1615</label>
<label className="color-shade">C: 0 M: 52 Y: 89 K: 48</label>
</button>
<button className="child" style={{border: selectedColor === "#f9a58c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9a58c")}>
<div className="color_sample" style={{backgroundColor: "#f9a58c"}}></div>
<label className="color-name">Pantone 1625</label>
<label className="color-shade">C: 0 M: 34 Y: 44 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f98e6d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f98e6d")}>
<div className="color_sample" style={{backgroundColor: "#f98e6d"}}></div>
<label className="color-name">Pantone 1635</label>
<label className="color-shade">C: 0 M: 43 Y: 56 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f97242" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f97242")}>
<div className="color_sample" style={{backgroundColor: "#f97242"}}></div>
<label className="color-name">Pantone 1645</label>
<label className="color-shade">C: 0 M: 54 Y: 73 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f95602" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f95602")}>
<div className="color_sample" style={{backgroundColor: "#f95602"}}></div>
<label className="color-name">Pantone 1655</label>
<label className="color-shade">C: 0 M: 65 Y: 99 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#dd4f05" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#dd4f05")}>
<div className="color_sample" style={{backgroundColor: "#dd4f05"}}></div>
<label className="color-name">Pantone 1665</label>
<label className="color-shade">C: 0 M: 64 Y: 98 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#a53f0f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a53f0f")}>
<div className="color_sample" style={{backgroundColor: "#a53f0f"}}></div>
<label className="color-name">Pantone 1675</label>
<label className="color-shade">C: 0 M: 62 Y: 91 K: 35</label>
</button>
<button className="child" style={{border: selectedColor === "#843511" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#843511")}>
<div className="color_sample" style={{backgroundColor: "#843511"}}></div>
<label className="color-name">Pantone 1685</label>
<label className="color-shade">C: 0 M: 60 Y: 87 K: 48</label>
</button>
<button className="child" style={{border: selectedColor === "#f99ea3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f99ea3")}>
<div className="color_sample" style={{backgroundColor: "#f99ea3"}}></div>
<label className="color-name">Pantone 1765</label>
<label className="color-shade">C: 0 M: 37 Y: 35 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f9b2b7" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9b2b7")}>
<div className="color_sample" style={{backgroundColor: "#f9b2b7"}}></div>
<label className="color-name">Pantone 1767</label>
<label className="color-shade">C: 0 M: 29 Y: 27 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#f9848e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f9848e")}>
<div className="color_sample" style={{backgroundColor: "#f9848e"}}></div>
<label className="color-name">Pantone 1775</label>
<label className="color-shade">C: 0 M: 47 Y: 43 K: 2</label>
</button>
<button className="child" style={{border: selectedColor === "#fc6675" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fc6675")}>
<div className="color_sample" style={{backgroundColor: "#fc6675"}}></div>
<label className="color-name">Pantone 1777</label>
<label className="color-shade">C: 0 M: 60 Y: 54 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#fc4f59" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fc4f59")}>
<div className="color_sample" style={{backgroundColor: "#fc4f59"}}></div>
<label className="color-name">Pantone 1785</label>
<label className="color-shade">C: 0 M: 69 Y: 65 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#f43f4f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f43f4f")}>
<div className="color_sample" style={{backgroundColor: "#f43f4f"}}></div>
<label className="color-name">Pantone 1787</label>
<label className="color-shade">C: 0 M: 74 Y: 68 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#ef2b2d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ef2b2d")}>
<div className="color_sample" style={{backgroundColor: "#ef2b2d"}}></div>
<label className="color-name">Pantone 1788</label>
<label className="color-shade">C: 0 M: 82 Y: 81 K: 6</label>
</button>
<button className="child" style={{border: selectedColor === "#d62828" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d62828")}>
<div className="color_sample" style={{backgroundColor: "#d62828"}}></div>
<label className="color-name">Pantone 1795</label>
<label className="color-shade">C: 0 M: 81 Y: 81 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#cc2d30" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#cc2d30")}>
<div className="color_sample" style={{backgroundColor: "#cc2d30"}}></div>
<label className="color-name">Pantone 1797</label>
<label className="color-shade">C: 0 M: 78 Y: 76 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#af2626" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#af2626")}>
<div className="color_sample" style={{backgroundColor: "#af2626"}}></div>
<label className="color-name">Pantone 1805</label>
<label className="color-shade">C: 0 M: 78 Y: 78 K: 31</label>
</button>
<button className="child" style={{border: selectedColor === "#a03033" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a03033")}>
<div className="color_sample" style={{backgroundColor: "#a03033"}}></div>
<label className="color-name">Pantone 1807</label>
<label className="color-shade">C: 0 M: 70 Y: 68 K: 37</label>
</button>
<button className="child" style={{border: selectedColor === "#7c211e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7c211e")}>
<div className="color_sample" style={{backgroundColor: "#7c211e"}}></div>
<label className="color-name">Pantone 1810</label>
<label className="color-shade">C: 0 M: 73 Y: 76 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#5b2d28" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5b2d28")}>
<div className="color_sample" style={{backgroundColor: "#5b2d28"}}></div>
<label className="color-name">Pantone 1817</label>
<label className="color-shade">C: 0 M: 51 Y: 56 K: 64</label>
</button>
<button className="child" style={{border: selectedColor === "#fcbfc9" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fcbfc9")}>
<div className="color_sample" style={{backgroundColor: "#fcbfc9"}}></div>
<label className="color-name">Pantone 1895</label>
<label className="color-shade">C: 0 M: 24 Y: 20 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#fc9bb2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#fc9bb2")}>
<div className="color_sample" style={{backgroundColor: "#fc9bb2"}}></div>
<label className="color-name">Pantone 1905</label>
<label className="color-shade">C: 0 M: 38 Y: 29 K: 1</label>
</button>
<button className="child" style={{border: selectedColor === "#f4547c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f4547c")}>
<div className="color_sample" style={{backgroundColor: "#f4547c"}}></div>
<label className="color-name">Pantone 1915</label>
<label className="color-shade">C: 0 M: 66 Y: 49 K: 4</label>
</button>
<button className="child" style={{border: selectedColor === "#e00747" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e00747")}>
<div className="color_sample" style={{backgroundColor: "#e00747"}}></div>
<label className="color-name">Pantone 1925</label>
<label className="color-shade">C: 0 M: 97 Y: 68 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#c10538" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c10538")}>
<div className="color_sample" style={{backgroundColor: "#c10538"}}></div>
<label className="color-name">Pantone 1935</label>
<label className="color-shade">C: 0 M: 97 Y: 71 K: 24</label>
</button>
<button className="child" style={{border: selectedColor === "#a80c35" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a80c35")}>
<div className="color_sample" style={{backgroundColor: "#a80c35"}}></div>
<label className="color-name">Pantone 1945</label>
<label className="color-shade">C: 0 M: 93 Y: 68 K: 34</label>
</button>
<button className="child" style={{border: selectedColor === "#931638" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#931638")}>
<div className="color_sample" style={{backgroundColor: "#931638"}}></div>
<label className="color-name">Pantone 1955</label>
<label className="color-shade">C: 0 M: 85 Y: 62 K: 42</label>
</button>
<button className="child" style={{border: selectedColor === "#f7c4d8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f7c4d8")}>
<div className="color_sample" style={{backgroundColor: "#f7c4d8"}}></div>
<label className="color-name">Pantone 2365</label>
<label className="color-shade">C: 0 M: 21 Y: 13 K: 3</label>
</button>
<button className="child" style={{border: selectedColor === "#ea6bbf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ea6bbf")}>
<div className="color_sample" style={{backgroundColor: "#ea6bbf"}}></div>
<label className="color-name">Pantone 2375</label>
<label className="color-shade">C: 0 M: 54 Y: 18 K: 8</label>
</button>
<button className="child" style={{border: selectedColor === "#db28a5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#db28a5")}>
<div className="color_sample" style={{backgroundColor: "#db28a5"}}></div>
<label className="color-name">Pantone 2385</label>
<label className="color-shade">C: 0 M: 82 Y: 25 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#c4008c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c4008c")}>
<div className="color_sample" style={{backgroundColor: "#c4008c"}}></div>
<label className="color-name">Pantone 2395</label>
<label className="color-shade">C: 0 M: 100 Y: 29 K: 23</label>
</button>
<button className="child" style={{border: selectedColor === "#a8007a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a8007a")}>
<div className="color_sample" style={{backgroundColor: "#a8007a"}}></div>
<label className="color-name">Pantone 2405</label>
<label className="color-shade">C: 0 M: 100 Y: 27 K: 34</label>
</button>
<button className="child" style={{border: selectedColor === "#9b0070" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9b0070")}>
<div className="color_sample" style={{backgroundColor: "#9b0070"}}></div>
<label className="color-name">Pantone 2415</label>
<label className="color-shade">C: 0 M: 100 Y: 28 K: 39</label>
</button>
<button className="child" style={{border: selectedColor === "#87005b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#87005b")}>
<div className="color_sample" style={{backgroundColor: "#87005b"}}></div>
<label className="color-name">Pantone 2425</label>
<label className="color-shade">C: 0 M: 100 Y: 33 K: 47</label>
</button>
<button className="child" style={{border: selectedColor === "#d8a8d8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d8a8d8")}>
<div className="color_sample" style={{backgroundColor: "#d8a8d8"}}></div>
<label className="color-name">Pantone 2562</label>
<label className="color-shade">C: 0 M: 22 Y: 0 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#d1a0cc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d1a0cc")}>
<div className="color_sample" style={{backgroundColor: "#d1a0cc"}}></div>
<label className="color-name">Pantone 2563</label>
<label className="color-shade">C: 0 M: 23 Y: 2 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#bf93cc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bf93cc")}>
<div className="color_sample" style={{backgroundColor: "#bf93cc"}}></div>
<label className="color-name">Pantone 2567</label>
<label className="color-shade">C: 6 M: 28 Y: 0 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#c687d1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c687d1")}>
<div className="color_sample" style={{backgroundColor: "#c687d1"}}></div>
<label className="color-name">Pantone 2572</label>
<label className="color-shade">C: 5 M: 35 Y: 0 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#ba7cbc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ba7cbc")}>
<div className="color_sample" style={{backgroundColor: "#ba7cbc"}}></div>
<label className="color-name">Pantone 2573</label>
<label className="color-shade">C: 1 M: 34 Y: 0 K: 26</label>
</button>
<button className="child" style={{border: selectedColor === "#aa72bf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aa72bf")}>
<div className="color_sample" style={{backgroundColor: "#aa72bf"}}></div>
<label className="color-name">Pantone 2577</label>
<label className="color-shade">C: 11 M: 40 Y: 0 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#aa47ba" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aa47ba")}>
<div className="color_sample" style={{backgroundColor: "#aa47ba"}}></div>
<label className="color-name">Pantone 2582</label>
<label className="color-shade">C: 9 M: 62 Y: 0 K: 27</label>
</button>
<button className="child" style={{border: selectedColor === "#9e4fa5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9e4fa5")}>
<div className="color_sample" style={{backgroundColor: "#9e4fa5"}}></div>
<label className="color-name">Pantone 2583</label>
<label className="color-shade">C: 4 M: 52 Y: 0 K: 35</label>
</button>
<button className="child" style={{border: selectedColor === "#8e47ad" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8e47ad")}>
<div className="color_sample" style={{backgroundColor: "#8e47ad"}}></div>
<label className="color-name">Pantone 2587</label>
<label className="color-shade">C: 18 M: 59 Y: 0 K: 32</label>
</button>
<button className="child" style={{border: selectedColor === "#930fa5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#930fa5")}>
<div className="color_sample" style={{backgroundColor: "#930fa5"}}></div>
<label className="color-name">Pantone 2592</label>
<label className="color-shade">C: 11 M: 91 Y: 0 K: 35</label>
</button>
<button className="child" style={{border: selectedColor === "#872b93" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#872b93")}>
<div className="color_sample" style={{backgroundColor: "#872b93"}}></div>
<label className="color-name">Pantone 2593</label>
<label className="color-shade">C: 8 M: 71 Y: 0 K: 42</label>
</button>
<button className="child" style={{border: selectedColor === "#66008c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#66008c")}>
<div className="color_sample" style={{backgroundColor: "#66008c"}}></div>
<label className="color-name">Pantone 2597</label>
<label className="color-shade">C: 27 M: 100 Y: 0 K: 45</label>
</button>
<button className="child" style={{border: selectedColor === "#820c8e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#820c8e")}>
<div className="color_sample" style={{backgroundColor: "#820c8e"}}></div>
<label className="color-name">Pantone 2602</label>
<label className="color-shade">C: 8 M: 92 Y: 0 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#70147a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#70147a")}>
<div className="color_sample" style={{backgroundColor: "#70147a"}}></div>
<label className="color-name">Pantone 2603</label>
<label className="color-shade">C: 8 M: 84 Y: 0 K: 52</label>
</button>
<button className="child" style={{border: selectedColor === "#5b027a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5b027a")}>
<div className="color_sample" style={{backgroundColor: "#5b027a"}}></div>
<label className="color-name">Pantone 2607</label>
<label className="color-shade">C: 25 M: 98 Y: 0 K: 52</label>
</button>
<button className="child" style={{border: selectedColor === "#701e72" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#701e72")}>
<div className="color_sample" style={{backgroundColor: "#701e72"}}></div>
<label className="color-name">Pantone 2612</label>
<label className="color-shade">C: 2 M: 74 Y: 0 K: 55</label>
</button>
<button className="child" style={{border: selectedColor === "#66116d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#66116d")}>
<div className="color_sample" style={{backgroundColor: "#66116d"}}></div>
<label className="color-name">Pantone 2613</label>
<label className="color-shade">C: 6 M: 84 Y: 0 K: 57</label>
</button>
<button className="child" style={{border: selectedColor === "#560c70" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#560c70")}>
<div className="color_sample" style={{backgroundColor: "#560c70"}}></div>
<label className="color-name">Pantone 2617</label>
<label className="color-shade">C: 23 M: 89 Y: 0 K: 56</label>
</button>
<button className="child" style={{border: selectedColor === "#602d59" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#602d59")}>
<div className="color_sample" style={{backgroundColor: "#602d59"}}></div>
<label className="color-name">Pantone 2622</label>
<label className="color-shade">C: 0 M: 53 Y: 7 K: 62</label>
</button>
<button className="child" style={{border: selectedColor === "#5b195e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5b195e")}>
<div className="color_sample" style={{backgroundColor: "#5b195e"}}></div>
<label className="color-name">Pantone 2623</label>
<label className="color-shade">C: 3 M: 73 Y: 0 K: 63</label>
</button>
<button className="child" style={{border: selectedColor === "#4c145e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#4c145e")}>
<div className="color_sample" style={{backgroundColor: "#4c145e"}}></div>
<label className="color-name">Pantone 2627</label>
<label className="color-shade">C: 19 M: 79 Y: 0 K: 63</label>
</button>
<button className="child" style={{border: selectedColor === "#c9add8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c9add8")}>
<div className="color_sample" style={{backgroundColor: "#c9add8"}}></div>
<label className="color-name">Pantone 2635</label>
<label className="color-shade">C: 7 M: 20 Y: 0 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#b591d1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b591d1")}>
<div className="color_sample" style={{backgroundColor: "#b591d1"}}></div>
<label className="color-name">Pantone 2645</label>
<label className="color-shade">C: 13 M: 31 Y: 0 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#9b6dc6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9b6dc6")}>
<div className="color_sample" style={{backgroundColor: "#9b6dc6"}}></div>
<label className="color-name">Pantone 2655</label>
<label className="color-shade">C: 22 M: 45 Y: 0 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#894fbf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#894fbf")}>
<div className="color_sample" style={{backgroundColor: "#894fbf"}}></div>
<label className="color-name">Pantone 2665</label>
<label className="color-shade">C: 28 M: 59 Y: 0 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#56008c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#56008c")}>
<div className="color_sample" style={{backgroundColor: "#56008c"}}></div>
<label className="color-name">Pantone 2685</label>
<label className="color-shade">C: 39 M: 100 Y: 0 K: 45</label>
</button>
<button className="child" style={{border: selectedColor === "#44235e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#44235e")}>
<div className="color_sample" style={{backgroundColor: "#44235e"}}></div>
<label className="color-name">Pantone 2695</label>
<label className="color-shade">C: 28 M: 63 Y: 0 K: 63</label>
</button>
<button className="child" style={{border: selectedColor === "#ad9ed3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ad9ed3")}>
<div className="color_sample" style={{backgroundColor: "#ad9ed3"}}></div>
<label className="color-name">Pantone 2705</label>
<label className="color-shade">C: 18 M: 25 Y: 0 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#d1cedd" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d1cedd")}>
<div className="color_sample" style={{backgroundColor: "#d1cedd"}}></div>
<label className="color-name">Pantone 2706</label>
<label className="color-shade">C: 5 M: 7 Y: 0 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#bfd1e5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bfd1e5")}>
<div className="color_sample" style={{backgroundColor: "#bfd1e5"}}></div>
<label className="color-name">Pantone 2707</label>
<label className="color-shade">C: 17 M: 9 Y: 0 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#afbcdb" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#afbcdb")}>
<div className="color_sample" style={{backgroundColor: "#afbcdb"}}></div>
<label className="color-name">Pantone 2708</label>
<label className="color-shade">C: 20 M: 14 Y: 0 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#937acc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#937acc")}>
<div className="color_sample" style={{backgroundColor: "#937acc"}}></div>
<label className="color-name">Pantone 2715</label>
<label className="color-shade">C: 28 M: 40 Y: 0 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#a5a0d6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a5a0d6")}>
<div className="color_sample" style={{backgroundColor: "#a5a0d6"}}></div>
<label className="color-name">Pantone 2716</label>
<label className="color-shade">C: 23 M: 25 Y: 0 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#a5bae0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a5bae0")}>
<div className="color_sample" style={{backgroundColor: "#a5bae0"}}></div>
<label className="color-name">Pantone 2717</label>
<label className="color-shade">C: 26 M: 17 Y: 0 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#5b77cc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5b77cc")}>
<div className="color_sample" style={{backgroundColor: "#5b77cc"}}></div>
<label className="color-name">Pantone 2718</label>
<label className="color-shade">C: 55 M: 42 Y: 0 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#7251bc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7251bc")}>
<div className="color_sample" style={{backgroundColor: "#7251bc"}}></div>
<label className="color-name">Pantone 2725</label>
<label className="color-shade">C: 39 M: 57 Y: 0 K: 26</label>
</button>
<button className="child" style={{border: selectedColor === "#6656bc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6656bc")}>
<div className="color_sample" style={{backgroundColor: "#6656bc"}}></div>
<label className="color-name">Pantone 2726</label>
<label className="color-shade">C: 46 M: 54 Y: 0 K: 26</label>
</button>
<button className="child" style={{border: selectedColor === "#5e68c4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5e68c4")}>
<div className="color_sample" style={{backgroundColor: "#5e68c4"}}></div>
<label className="color-name">Pantone 2727</label>
<label className="color-shade">C: 52 M: 47 Y: 0 K: 23</label>
</button>
<button className="child" style={{border: selectedColor === "#3044b5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#3044b5")}>
<div className="color_sample" style={{backgroundColor: "#3044b5"}}></div>
<label className="color-name">Pantone 2728</label>
<label className="color-shade">C: 73 M: 62 Y: 0 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#4f0093" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#4f0093")}>
<div className="color_sample" style={{backgroundColor: "#4f0093"}}></div>
<label className="color-name">Pantone 2735</label>
<label className="color-shade">C: 46 M: 100 Y: 0 K: 42</label>
</button>
<button className="child" style={{border: selectedColor === "#4930ad" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#4930ad")}>
<div className="color_sample" style={{backgroundColor: "#4930ad"}}></div>
<label className="color-name">Pantone 2736</label>
<label className="color-shade">C: 58 M: 72 Y: 0 K: 32</label>
</button>
<button className="child" style={{border: selectedColor === "#2d008e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#2d008e")}>
<div className="color_sample" style={{backgroundColor: "#2d008e"}}></div>
<label className="color-name">Pantone 2738</label>
<label className="color-shade">C: 68 M: 100 Y: 0 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#3f0077" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#3f0077")}>
<div className="color_sample" style={{backgroundColor: "#3f0077"}}></div>
<label className="color-name">Pantone 2745</label>
<label className="color-shade">C: 47 M: 100 Y: 0 K: 53</label>
</button>
<button className="child" style={{border: selectedColor === "#3f2893" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#3f2893")}>
<div className="color_sample" style={{backgroundColor: "#3f2893"}}></div>
<label className="color-name">Pantone 2746</label>
<label className="color-shade">C: 57 M: 73 Y: 0 K: 42</label>
</button>
<button className="child" style={{border: selectedColor === "#1c146b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#1c146b")}>
<div className="color_sample" style={{backgroundColor: "#1c146b"}}></div>
<label className="color-name">Pantone 2747</label>
<label className="color-shade">C: 74 M: 81 Y: 0 K: 58</label>
</button>
<button className="child" style={{border: selectedColor === "#1e1c77" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#1e1c77")}>
<div className="color_sample" style={{backgroundColor: "#1e1c77"}}></div>
<label className="color-name">Pantone 2748</label>
<label className="color-shade">C: 75 M: 76 Y: 0 K: 53</label>
</button>
<button className="child" style={{border: selectedColor === "#35006d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#35006d")}>
<div className="color_sample" style={{backgroundColor: "#35006d"}}></div>
<label className="color-name">Pantone 2755</label>
<label className="color-shade">C: 51 M: 100 Y: 0 K: 57</label>
</button>
<button className="child" style={{border: selectedColor === "#332875" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#332875")}>
<div className="color_sample" style={{backgroundColor: "#332875"}}></div>
<label className="color-name">Pantone 2756</label>
<label className="color-shade">C: 56 M: 66 Y: 0 K: 54</label>
</button>
<button className="child" style={{border: selectedColor === "#141654" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#141654")}>
<div className="color_sample" style={{backgroundColor: "#141654"}}></div>
<label className="color-name">Pantone 2757</label>
<label className="color-shade">C: 76 M: 74 Y: 0 K: 67</label>
</button>
<button className="child" style={{border: selectedColor === "#192168" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#192168")}>
<div className="color_sample" style={{backgroundColor: "#192168"}}></div>
<label className="color-name">Pantone 2758</label>
<label className="color-shade">C: 76 M: 68 Y: 0 K: 59</label>
</button>
<button className="child" style={{border: selectedColor === "#2b0c56" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#2b0c56")}>
<div className="color_sample" style={{backgroundColor: "#2b0c56"}}></div>
<label className="color-name">Pantone 2765</label>
<label className="color-shade">C: 50 M: 86 Y: 0 K: 66</label>
</button>
<button className="child" style={{border: selectedColor === "#2b265b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#2b265b")}>
<div className="color_sample" style={{backgroundColor: "#2b265b"}}></div>
<label className="color-name">Pantone 2766</label>
<label className="color-shade">C: 53 M: 58 Y: 0 K: 64</label>
</button>
<button className="child" style={{border: selectedColor === "#14213d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#14213d")}>
<div className="color_sample" style={{backgroundColor: "#14213d"}}></div>
<label className="color-name">Pantone 2767</label>
<label className="color-shade">C: 67 M: 46 Y: 0 K: 76</label>
</button>
<button className="child" style={{border: selectedColor === "#112151" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#112151")}>
<div className="color_sample" style={{backgroundColor: "#112151"}}></div>
<label className="color-name">Pantone 2768</label>
<label className="color-shade">C: 79 M: 59 Y: 0 K: 68</label>
</button>
<button className="child" style={{border: selectedColor === "#93c6e0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#93c6e0")}>
<div className="color_sample" style={{backgroundColor: "#93c6e0"}}></div>
<label className="color-name">Pantone 2905</label>
<label className="color-shade">C: 34 M: 12 Y: 0 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#60afdd" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#60afdd")}>
<div className="color_sample" style={{backgroundColor: "#60afdd"}}></div>
<label className="color-name">Pantone 2915</label>
<label className="color-shade">C: 57 M: 21 Y: 0 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#008ed6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#008ed6")}>
<div className="color_sample" style={{backgroundColor: "#008ed6"}}></div>
<label className="color-name">Pantone 2925</label>
<label className="color-shade">C: 100 M: 34 Y: 0 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#005bbf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#005bbf")}>
<div className="color_sample" style={{backgroundColor: "#005bbf"}}></div>
<label className="color-name">Pantone 2935</label>
<label className="color-shade">C: 100 M: 52 Y: 0 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#0054a0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#0054a0")}>
<div className="color_sample" style={{backgroundColor: "#0054a0"}}></div>
<label className="color-name">Pantone 2945</label>
<label className="color-shade">C: 100 M: 48 Y: 0 K: 37</label>
</button>
<button className="child" style={{border: selectedColor === "#003d6b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#003d6b")}>
<div className="color_sample" style={{backgroundColor: "#003d6b"}}></div>
<label className="color-name">Pantone 2955</label>
<label className="color-shade">C: 100 M: 43 Y: 0 K: 58</label>
</button>
<button className="child" style={{border: selectedColor === "#00334c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00334c")}>
<div className="color_sample" style={{backgroundColor: "#00334c"}}></div>
<label className="color-name">Pantone 2965</label>
<label className="color-shade">C: 100 M: 33 Y: 0 K: 70</label>
</button>
<button className="child" style={{border: selectedColor === "#bae0e2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bae0e2")}>
<div className="color_sample" style={{backgroundColor: "#bae0e2"}}></div>
<label className="color-name">Pantone 2975</label>
<label className="color-shade">C: 18 M: 1 Y: 0 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#51bfe2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#51bfe2")}>
<div className="color_sample" style={{backgroundColor: "#51bfe2"}}></div>
<label className="color-name">Pantone 2985</label>
<label className="color-shade">C: 64 M: 15 Y: 0 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#00a5db" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00a5db")}>
<div className="color_sample" style={{backgroundColor: "#00a5db"}}></div>
<label className="color-name">Pantone 2995</label>
<label className="color-shade">C: 100 M: 25 Y: 0 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#0084c9" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#0084c9")}>
<div className="color_sample" style={{backgroundColor: "#0084c9"}}></div>
<label className="color-name">Pantone 3005</label>
<label className="color-shade">C: 100 M: 34 Y: 0 K: 21</label>
</button>
<button className="child" style={{border: selectedColor === "#00709e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00709e")}>
<div className="color_sample" style={{backgroundColor: "#00709e"}}></div>
<label className="color-name">Pantone 3015</label>
<label className="color-shade">C: 100 M: 29 Y: 0 K: 38</label>
</button>
<button className="child" style={{border: selectedColor === "#00546b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00546b")}>
<div className="color_sample" style={{backgroundColor: "#00546b"}}></div>
<label className="color-name">Pantone 3025</label>
<label className="color-shade">C: 100 M: 21 Y: 0 K: 58</label>
</button>
<button className="child" style={{border: selectedColor === "#004454" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#004454")}>
<div className="color_sample" style={{backgroundColor: "#004454"}}></div>
<label className="color-name">Pantone 3035</label>
<label className="color-shade">C: 100 M: 19 Y: 0 K: 67</label>
</button>
<button className="child" style={{border: selectedColor === "#7fd6db" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7fd6db")}>
<div className="color_sample" style={{backgroundColor: "#7fd6db"}}></div>
<label className="color-name">Pantone 3105</label>
<label className="color-shade">C: 42 M: 2 Y: 0 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#2dc6d6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#2dc6d6")}>
<div className="color_sample" style={{backgroundColor: "#2dc6d6"}}></div>
<label className="color-name">Pantone 3115</label>
<label className="color-shade">C: 79 M: 7 Y: 0 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#00b7c6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00b7c6")}>
<div className="color_sample" style={{backgroundColor: "#00b7c6"}}></div>
<label className="color-name">Pantone 3125</label>
<label className="color-shade">C: 100 M: 8 Y: 0 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#009baa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#009baa")}>
<div className="color_sample" style={{backgroundColor: "#009baa"}}></div>
<label className="color-name">Pantone 3135</label>
<label className="color-shade">C: 100 M: 9 Y: 0 K: 33</label>
</button>
<button className="child" style={{border: selectedColor === "#00848e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00848e")}>
<div className="color_sample" style={{backgroundColor: "#00848e"}}></div>
<label className="color-name">Pantone 3145</label>
<label className="color-shade">C: 100 M: 7 Y: 0 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#006d75" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#006d75")}>
<div className="color_sample" style={{backgroundColor: "#006d75"}}></div>
<label className="color-name">Pantone 3155</label>
<label className="color-shade">C: 100 M: 7 Y: 0 K: 54</label>
</button>
<button className="child" style={{border: selectedColor === "#00565b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00565b")}>
<div className="color_sample" style={{backgroundColor: "#00565b"}}></div>
<label className="color-name">Pantone 3165</label>
<label className="color-shade">C: 100 M: 5 Y: 0 K: 64</label>
</button>
<button className="child" style={{border: selectedColor === "#87ddd1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#87ddd1")}>
<div className="color_sample" style={{backgroundColor: "#87ddd1"}}></div>
<label className="color-name">Pantone 3242</label>
<label className="color-shade">C: 39 M: 0 Y: 5 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#8ce0d1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8ce0d1")}>
<div className="color_sample" style={{backgroundColor: "#8ce0d1"}}></div>
<label className="color-name">Pantone 3245</label>
<label className="color-shade">C: 37 M: 0 Y: 7 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#7ad3c1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7ad3c1")}>
<div className="color_sample" style={{backgroundColor: "#7ad3c1"}}></div>
<label className="color-name">Pantone 3248</label>
<label className="color-shade">C: 42 M: 0 Y: 9 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#000000" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#000000")}>
<div className="color_sample" style={{backgroundColor: "#000000"}}></div>
<label className="color-name">Pantone 3252</label>
<label className="color-shade">C: 0 M: 0 Y: 0 K: 100</label>
</button>
<button className="child" style={{border: selectedColor === "#000000" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#000000")}>
<div className="color_sample" style={{backgroundColor: "#000000"}}></div>
<label className="color-name">Pantone 3255</label>
<label className="color-shade">C: 0 M: 0 Y: 0 K: 100</label>
</button>
<button className="child" style={{border: selectedColor === "#000000" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#000000")}>
<div className="color_sample" style={{backgroundColor: "#000000"}}></div>
<label className="color-name">Pantone 3258</label>
<label className="color-shade">C: 0 M: 0 Y: 0 K: 100</label>
</button>
<button className="child" style={{border: selectedColor === "#000000" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#000000")}>
<div className="color_sample" style={{backgroundColor: "#000000"}}></div>
<label className="color-name">Pantone 3262</label>
<label className="color-shade">C: 0 M: 0 Y: 0 K: 100</label>
</button>
<button className="child" style={{border: selectedColor === "#000000" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#000000")}>
<div className="color_sample" style={{backgroundColor: "#000000"}}></div>
<label className="color-name">Pantone 3265</label>
<label className="color-shade">C: 0 M: 0 Y: 0 K: 100</label>
</button>
<button className="child" style={{border: selectedColor === "#000000" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#000000")}>
<div className="color_sample" style={{backgroundColor: "#000000"}}></div>
<label className="color-name">Pantone 3268</label>
<label className="color-shade">C: 0 M: 0 Y: 0 K: 100</label>
</button>
<button className="child" style={{border: selectedColor === "#00aa9e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00aa9e")}>
<div className="color_sample" style={{backgroundColor: "#00aa9e"}}></div>
<label className="color-name">Pantone 3272</label>
<label className="color-shade">C: 100 M: 0 Y: 7 K: 33</label>
</button>
<button className="child" style={{border: selectedColor === "#00b2a0" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00b2a0")}>
<div className="color_sample" style={{backgroundColor: "#00b2a0"}}></div>
<label className="color-name">Pantone 3275</label>
<label className="color-shade">C: 100 M: 0 Y: 10 K: 30</label>
</button>
<button className="child" style={{border: selectedColor === "#009b84" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#009b84")}>
<div className="color_sample" style={{backgroundColor: "#009b84"}}></div>
<label className="color-name">Pantone 3278</label>
<label className="color-shade">C: 100 M: 0 Y: 15 K: 39</label>
</button>
<button className="child" style={{border: selectedColor === "#008c82" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#008c82")}>
<div className="color_sample" style={{backgroundColor: "#008c82"}}></div>
<label className="color-name">Pantone 3282</label>
<label className="color-shade">C: 100 M: 0 Y: 7 K: 45</label>
</button>
<button className="child" style={{border: selectedColor === "#009987" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#009987")}>
<div className="color_sample" style={{backgroundColor: "#009987"}}></div>
<label className="color-name">Pantone 3285</label>
<label className="color-shade">C: 100 M: 0 Y: 12 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#008270" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#008270")}>
<div className="color_sample" style={{backgroundColor: "#008270"}}></div>
<label className="color-name">Pantone 3288</label>
<label className="color-shade">C: 100 M: 0 Y: 14 K: 49</label>
</button>
<button className="child" style={{border: selectedColor === "#006056" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#006056")}>
<div className="color_sample" style={{backgroundColor: "#006056"}}></div>
<label className="color-name">Pantone 3292</label>
<label className="color-shade">C: 100 M: 0 Y: 10 K: 62</label>
</button>
<button className="child" style={{border: selectedColor === "#008272" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#008272")}>
<div className="color_sample" style={{backgroundColor: "#008272"}}></div>
<label className="color-name">Pantone 3295</label>
<label className="color-shade">C: 100 M: 0 Y: 12 K: 49</label>
</button>
<button className="child" style={{border: selectedColor === "#006b5b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#006b5b")}>
<div className="color_sample" style={{backgroundColor: "#006b5b"}}></div>
<label className="color-name">Pantone 3298</label>
<label className="color-shade">C: 100 M: 0 Y: 15 K: 58</label>
</button>
<button className="child" style={{border: selectedColor === "#00493f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00493f")}>
<div className="color_sample" style={{backgroundColor: "#00493f"}}></div>
<label className="color-name">Pantone 3302</label>
<label className="color-shade">C: 100 M: 0 Y: 14 K: 71</label>
</button>
<button className="child" style={{border: selectedColor === "#004f42" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#004f42")}>
<div className="color_sample" style={{backgroundColor: "#004f42"}}></div>
<label className="color-name">Pantone 3305</label>
<label className="color-shade">C: 100 M: 0 Y: 16 K: 69</label>
</button>
<button className="child" style={{border: selectedColor === "#004438" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#004438")}>
<div className="color_sample" style={{backgroundColor: "#004438"}}></div>
<label className="color-name">Pantone 3308</label>
<label className="color-shade">C: 100 M: 0 Y: 18 K: 73</label>
</button>
<button className="child" style={{border: selectedColor === "#8ee2bc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8ee2bc")}>
<div className="color_sample" style={{backgroundColor: "#8ee2bc"}}></div>
<label className="color-name">Pantone 3375</label>
<label className="color-shade">C: 37 M: 0 Y: 17 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#54d8a8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#54d8a8")}>
<div className="color_sample" style={{backgroundColor: "#54d8a8"}}></div>
<label className="color-name">Pantone 3385</label>
<label className="color-shade">C: 61 M: 0 Y: 22 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#00c993" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00c993")}>
<div className="color_sample" style={{backgroundColor: "#00c993"}}></div>
<label className="color-name">Pantone 3395</label>
<label className="color-shade">C: 100 M: 0 Y: 27 K: 21</label>
</button>
<button className="child" style={{border: selectedColor === "#00b27a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00b27a")}>
<div className="color_sample" style={{backgroundColor: "#00b27a"}}></div>
<label className="color-name">Pantone 3405</label>
<label className="color-shade">C: 100 M: 0 Y: 31 K: 30</label>
</button>
<button className="child" style={{border: selectedColor === "#007c59" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#007c59")}>
<div className="color_sample" style={{backgroundColor: "#007c59"}}></div>
<label className="color-name">Pantone 3415</label>
<label className="color-shade">C: 100 M: 0 Y: 28 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#006847" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#006847")}>
<div className="color_sample" style={{backgroundColor: "#006847"}}></div>
<label className="color-name">Pantone 3425</label>
<label className="color-shade">C: 100 M: 0 Y: 32 K: 59</label>
</button>
<button className="child" style={{border: selectedColor === "#024930" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#024930")}>
<div className="color_sample" style={{backgroundColor: "#024930"}}></div>
<label className="color-name">Pantone 3435</label>
<label className="color-shade">C: 97 M: 0 Y: 34 K: 71</label>
</button>
<button className="child" style={{border: selectedColor === "#f2ed6d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#f2ed6d")}>
<div className="color_sample" style={{backgroundColor: "#f2ed6d"}}></div>
<label className="color-name">Pantone 3935</label>
<label className="color-shade">C: 0 M: 2 Y: 55 K: 5</label>
</button>
<button className="child" style={{border: selectedColor === "#efea07" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#efea07")}>
<div className="color_sample" style={{backgroundColor: "#efea07"}}></div>
<label className="color-name">Pantone 3945</label>
<label className="color-shade">C: 0 M: 2 Y: 97 K: 6</label>
</button>
<button className="child" style={{border: selectedColor === "#ede211" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ede211")}>
<div className="color_sample" style={{backgroundColor: "#ede211"}}></div>
<label className="color-name">Pantone 3955</label>
<label className="color-shade">C: 0 M: 5 Y: 93 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#e8dd11" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e8dd11")}>
<div className="color_sample" style={{backgroundColor: "#e8dd11"}}></div>
<label className="color-name">Pantone 3965</label>
<label className="color-shade">C: 0 M: 5 Y: 93 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#b5a80c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b5a80c")}>
<div className="color_sample" style={{backgroundColor: "#b5a80c"}}></div>
<label className="color-name">Pantone 3975</label>
<label className="color-shade">C: 0 M: 7 Y: 93 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#998c0a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#998c0a")}>
<div className="color_sample" style={{backgroundColor: "#998c0a"}}></div>
<label className="color-name">Pantone 3985</label>
<label className="color-shade">C: 0 M: 8 Y: 93 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#6d6002" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6d6002")}>
<div className="color_sample" style={{backgroundColor: "#6d6002"}}></div>
<label className="color-name">Pantone 3995</label>
<label className="color-shade">C: 0 M: 12 Y: 98 K: 57</label>
</button>
<button className="child" style={{border: selectedColor === "#604c11" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#604c11")}>
<div className="color_sample" style={{backgroundColor: "#604c11"}}></div>
<label className="color-name">Pantone 4485</label>
<label className="color-shade">C: 0 M: 21 Y: 82 K: 62</label>
</button>
<button className="child" style={{border: selectedColor === "#877530" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#877530")}>
<div className="color_sample" style={{backgroundColor: "#877530"}}></div>
<label className="color-name">Pantone 4495</label>
<label className="color-shade">C: 0 M: 13 Y: 64 K: 47</label>
</button>
<button className="child" style={{border: selectedColor === "#a09151" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a09151")}>
<div className="color_sample" style={{backgroundColor: "#a09151"}}></div>
<label className="color-name">Pantone 4505</label>
<label className="color-shade">C: 0 M: 9 Y: 49 K: 37</label>
</button>
<button className="child" style={{border: selectedColor === "#bcad75" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bcad75")}>
<div className="color_sample" style={{backgroundColor: "#bcad75"}}></div>
<label className="color-name">Pantone 4515</label>
<label className="color-shade">C: 0 M: 8 Y: 38 K: 26</label>
</button>
<button className="child" style={{border: selectedColor === "#ccbf8e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ccbf8e")}>
<div className="color_sample" style={{backgroundColor: "#ccbf8e"}}></div>
<label className="color-name">Pantone 4525</label>
<label className="color-shade">C: 0 M: 6 Y: 30 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#dbcea5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#dbcea5")}>
<div className="color_sample" style={{backgroundColor: "#dbcea5"}}></div>
<label className="color-name">Pantone 4535</label>
<label className="color-shade">C: 0 M: 6 Y: 25 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#e5dbba" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e5dbba")}>
<div className="color_sample" style={{backgroundColor: "#e5dbba"}}></div>
<label className="color-name">Pantone 4545</label>
<label className="color-shade">C: 0 M: 4 Y: 19 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#472311" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#472311")}>
<div className="color_sample" style={{backgroundColor: "#472311"}}></div>
<label className="color-name">Pantone 4625</label>
<label className="color-shade">C: 0 M: 51 Y: 76 K: 72</label>
</button>
<button className="child" style={{border: selectedColor === "#8c5933" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8c5933")}>
<div className="color_sample" style={{backgroundColor: "#8c5933"}}></div>
<label className="color-name">Pantone 4635</label>
<label className="color-shade">C: 0 M: 36 Y: 64 K: 45</label>
</button>
<button className="child" style={{border: selectedColor === "#b28260" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b28260")}>
<div className="color_sample" style={{backgroundColor: "#b28260"}}></div>
<label className="color-name">Pantone 4645</label>
<label className="color-shade">C: 0 M: 27 Y: 46 K: 30</label>
</button>
<button className="child" style={{border: selectedColor === "#c49977" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c49977")}>
<div className="color_sample" style={{backgroundColor: "#c49977"}}></div>
<label className="color-name">Pantone 4655</label>
<label className="color-shade">C: 0 M: 22 Y: 39 K: 23</label>
</button>
<button className="child" style={{border: selectedColor === "#d8b596" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d8b596")}>
<div className="color_sample" style={{backgroundColor: "#d8b596"}}></div>
<label className="color-name">Pantone 4665</label>
<label className="color-shade">C: 0 M: 16 Y: 31 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#e5c6aa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e5c6aa")}>
<div className="color_sample" style={{backgroundColor: "#e5c6aa"}}></div>
<label className="color-name">Pantone 4675</label>
<label className="color-shade">C: 0 M: 14 Y: 26 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#edd3bc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#edd3bc")}>
<div className="color_sample" style={{backgroundColor: "#edd3bc"}}></div>
<label className="color-name">Pantone 4685</label>
<label className="color-shade">C: 0 M: 11 Y: 21 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#51261c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#51261c")}>
<div className="color_sample" style={{backgroundColor: "#51261c"}}></div>
<label className="color-name">Pantone 4695</label>
<label className="color-shade">C: 0 M: 53 Y: 65 K: 68</label>
</button>
<button className="child" style={{border: selectedColor === "#7c513d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#7c513d")}>
<div className="color_sample" style={{backgroundColor: "#7c513d"}}></div>
<label className="color-name">Pantone 4705</label>
<label className="color-shade">C: 0 M: 35 Y: 51 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#99705b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#99705b")}>
<div className="color_sample" style={{backgroundColor: "#99705b"}}></div>
<label className="color-name">Pantone 4715</label>
<label className="color-shade">C: 0 M: 27 Y: 41 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#b5917c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b5917c")}>
<div className="color_sample" style={{backgroundColor: "#b5917c"}}></div>
<label className="color-name">Pantone 4725</label>
<label className="color-shade">C: 0 M: 20 Y: 31 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#ccaf9b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ccaf9b")}>
<div className="color_sample" style={{backgroundColor: "#ccaf9b"}}></div>
<label className="color-name">Pantone 4735</label>
<label className="color-shade">C: 0 M: 14 Y: 24 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#d8bfaa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d8bfaa")}>
<div className="color_sample" style={{backgroundColor: "#d8bfaa"}}></div>
<label className="color-name">Pantone 4745</label>
<label className="color-shade">C: 0 M: 12 Y: 21 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#e2ccba" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e2ccba")}>
<div className="color_sample" style={{backgroundColor: "#e2ccba"}}></div>
<label className="color-name">Pantone 4755</label>
<label className="color-shade">C: 0 M: 10 Y: 18 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#441e1c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#441e1c")}>
<div className="color_sample" style={{backgroundColor: "#441e1c"}}></div>
<label className="color-name">Pantone 4975</label>
<label className="color-shade">C: 0 M: 56 Y: 59 K: 73</label>
</button>
<button className="child" style={{border: selectedColor === "#844949" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#844949")}>
<div className="color_sample" style={{backgroundColor: "#844949"}}></div>
<label className="color-name">Pantone 4985</label>
<label className="color-shade">C: 0 M: 45 Y: 45 K: 48</label>
</button>
<button className="child" style={{border: selectedColor === "#a56b6d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#a56b6d")}>
<div className="color_sample" style={{backgroundColor: "#a56b6d"}}></div>
<label className="color-name">Pantone 4995</label>
<label className="color-shade">C: 0 M: 35 Y: 34 K: 35</label>
</button>
<button className="child" style={{border: selectedColor === "#bc8787" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bc8787")}>
<div className="color_sample" style={{backgroundColor: "#bc8787"}}></div>
<label className="color-name">Pantone 5005</label>
<label className="color-shade">C: 0 M: 28 Y: 28 K: 26</label>
</button>
<button className="child" style={{border: selectedColor === "#d8ada8" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d8ada8")}>
<div className="color_sample" style={{backgroundColor: "#d8ada8"}}></div>
<label className="color-name">Pantone 5015</label>
<label className="color-shade">C: 0 M: 20 Y: 22 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#e2bcb7" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e2bcb7")}>
<div className="color_sample" style={{backgroundColor: "#e2bcb7"}}></div>
<label className="color-name">Pantone 5025</label>
<label className="color-shade">C: 0 M: 17 Y: 19 K: 11</label>
</button>
<button className="child" style={{border: selectedColor === "#edcec6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#edcec6")}>
<div className="color_sample" style={{backgroundColor: "#edcec6"}}></div>
<label className="color-name">Pantone 5035</label>
<label className="color-shade">C: 0 M: 13 Y: 16 K: 7</label>
</button>
<button className="child" style={{border: selectedColor === "#4f213a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#4f213a")}>
<div className="color_sample" style={{backgroundColor: "#4f213a"}}></div>
<label className="color-name">Pantone 5115</label>
<label className="color-shade">C: 0 M: 58 Y: 27 K: 69</label>
</button>
<button className="child" style={{border: selectedColor === "#754760" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#754760")}>
<div className="color_sample" style={{backgroundColor: "#754760"}}></div>
<label className="color-name">Pantone 5125</label>
<label className="color-shade">C: 0 M: 39 Y: 18 K: 54</label>
</button>
<button className="child" style={{border: selectedColor === "#936b7f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#936b7f")}>
<div className="color_sample" style={{backgroundColor: "#936b7f"}}></div>
<label className="color-name">Pantone 5135</label>
<label className="color-shade">C: 0 M: 27 Y: 14 K: 42</label>
</button>
<button className="child" style={{border: selectedColor === "#ad8799" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ad8799")}>
<div className="color_sample" style={{backgroundColor: "#ad8799"}}></div>
<label className="color-name">Pantone 5145</label>
<label className="color-shade">C: 0 M: 22 Y: 12 K: 32</label>
</button>
<button className="child" style={{border: selectedColor === "#ccafb7" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ccafb7")}>
<div className="color_sample" style={{backgroundColor: "#ccafb7"}}></div>
<label className="color-name">Pantone 5155</label>
<label className="color-shade">C: 0 M: 14 Y: 10 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#e0c9cc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e0c9cc")}>
<div className="color_sample" style={{backgroundColor: "#e0c9cc"}}></div>
<label className="color-name">Pantone 5165</label>
<label className="color-shade">C: 0 M: 10 Y: 9 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#e8d6d1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e8d6d1")}>
<div className="color_sample" style={{backgroundColor: "#e8d6d1"}}></div>
<label className="color-name">Pantone 5175</label>
<label className="color-shade">C: 0 M: 8 Y: 10 K: 9</label>
</button>
<button className="child" style={{border: selectedColor === "#472835" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#472835")}>
<div className="color_sample" style={{backgroundColor: "#472835"}}></div>
<label className="color-name">Pantone 5185</label>
<label className="color-shade">C: 0 M: 44 Y: 25 K: 72</label>
</button>
<button className="child" style={{border: selectedColor === "#593344" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#593344")}>
<div className="color_sample" style={{backgroundColor: "#593344"}}></div>
<label className="color-name">Pantone 5195</label>
<label className="color-shade">C: 0 M: 43 Y: 24 K: 65</label>
</button>
<button className="child" style={{border: selectedColor === "#8e6877" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8e6877")}>
<div className="color_sample" style={{backgroundColor: "#8e6877"}}></div>
<label className="color-name">Pantone 5205</label>
<label className="color-shade">C: 0 M: 27 Y: 16 K: 44</label>
</button>
<button className="child" style={{border: selectedColor === "#b5939b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b5939b")}>
<div className="color_sample" style={{backgroundColor: "#b5939b"}}></div>
<label className="color-name">Pantone 5215</label>
<label className="color-shade">C: 0 M: 19 Y: 14 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#ccadaf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ccadaf")}>
<div className="color_sample" style={{backgroundColor: "#ccadaf"}}></div>
<label className="color-name">Pantone 5225</label>
<label className="color-shade">C: 0 M: 15 Y: 14 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#ddc6c4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ddc6c4")}>
<div className="color_sample" style={{backgroundColor: "#ddc6c4"}}></div>
<label className="color-name">Pantone 5235</label>
<label className="color-shade">C: 0 M: 10 Y: 11 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#e5d3cc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e5d3cc")}>
<div className="color_sample" style={{backgroundColor: "#e5d3cc"}}></div>
<label className="color-name">Pantone 5245</label>
<label className="color-shade">C: 0 M: 8 Y: 11 K: 10</label>
</button>
<button className="child" style={{border: selectedColor === "#35264f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#35264f")}>
<div className="color_sample" style={{backgroundColor: "#35264f"}}></div>
<label className="color-name">Pantone 5255</label>
<label className="color-shade">C: 33 M: 52 Y: 0 K: 69</label>
</button>
<button className="child" style={{border: selectedColor === "#493d63" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#493d63")}>
<div className="color_sample" style={{backgroundColor: "#493d63"}}></div>
<label className="color-name">Pantone 5265</label>
<label className="color-shade">C: 26 M: 38 Y: 0 K: 61</label>
</button>
<button className="child" style={{border: selectedColor === "#605677" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#605677")}>
<div className="color_sample" style={{backgroundColor: "#605677"}}></div>
<label className="color-name">Pantone 5275</label>
<label className="color-shade">C: 19 M: 28 Y: 0 K: 53</label>
</button>
<button className="child" style={{border: selectedColor === "#8c8299" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8c8299")}>
<div className="color_sample" style={{backgroundColor: "#8c8299"}}></div>
<label className="color-name">Pantone 5285</label>
<label className="color-shade">C: 8 M: 15 Y: 0 K: 40</label>
</button>
<button className="child" style={{border: selectedColor === "#b2a8b5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b2a8b5")}>
<div className="color_sample" style={{backgroundColor: "#b2a8b5"}}></div>
<label className="color-name">Pantone 5295</label>
<label className="color-shade">C: 2 M: 7 Y: 0 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#ccc1c6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ccc1c6")}>
<div className="color_sample" style={{backgroundColor: "#ccc1c6"}}></div>
<label className="color-name">Pantone 5305</label>
<label className="color-shade">C: 0 M: 5 Y: 3 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#dbd3d3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#dbd3d3")}>
<div className="color_sample" style={{backgroundColor: "#dbd3d3"}}></div>
<label className="color-name">Pantone 5315</label>
<label className="color-shade">C: 0 M: 4 Y: 4 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#02283a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#02283a")}>
<div className="color_sample" style={{backgroundColor: "#02283a"}}></div>
<label className="color-name">Pantone 5395</label>
<label className="color-shade">C: 97 M: 31 Y: 0 K: 77</label>
</button>
<button className="child" style={{border: selectedColor === "#3f6075" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#3f6075")}>
<div className="color_sample" style={{backgroundColor: "#3f6075"}}></div>
<label className="color-name">Pantone 5405</label>
<label className="color-shade">C: 46 M: 18 Y: 0 K: 54</label>
</button>
<button className="child" style={{border: selectedColor === "#607c8c" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#607c8c")}>
<div className="color_sample" style={{backgroundColor: "#607c8c"}}></div>
<label className="color-name">Pantone 5415</label>
<label className="color-shade">C: 31 M: 11 Y: 0 K: 45</label>
</button>
<button className="child" style={{border: selectedColor === "#8499a5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8499a5")}>
<div className="color_sample" style={{backgroundColor: "#8499a5"}}></div>
<label className="color-name">Pantone 5425</label>
<label className="color-shade">C: 20 M: 7 Y: 0 K: 35</label>
</button>
<button className="child" style={{border: selectedColor === "#afbcbf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#afbcbf")}>
<div className="color_sample" style={{backgroundColor: "#afbcbf"}}></div>
<label className="color-name">Pantone 5435</label>
<label className="color-shade">C: 8 M: 2 Y: 0 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#c4cccc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c4cccc")}>
<div className="color_sample" style={{backgroundColor: "#c4cccc"}}></div>
<label className="color-name">Pantone 5445</label>
<label className="color-shade">C: 4 M: 0 Y: 0 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#d6d8d3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6d8d3")}>
<div className="color_sample" style={{backgroundColor: "#d6d8d3"}}></div>
<label className="color-name">Pantone 5455</label>
<label className="color-shade">C: 1 M: 0 Y: 2 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#00353a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#00353a")}>
<div className="color_sample" style={{backgroundColor: "#00353a"}}></div>
<label className="color-name">Pantone 5463</label>
<label className="color-shade">C: 100 M: 9 Y: 0 K: 77</label>
</button>
<button className="child" style={{border: selectedColor === "#193833" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#193833")}>
<div className="color_sample" style={{backgroundColor: "#193833"}}></div>
<label className="color-name">Pantone 5467</label>
<label className="color-shade">C: 55 M: 0 Y: 9 K: 78</label>
</button>
<button className="child" style={{border: selectedColor === "#26686d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#26686d")}>
<div className="color_sample" style={{backgroundColor: "#26686d"}}></div>
<label className="color-name">Pantone 5473</label>
<label className="color-shade">C: 65 M: 5 Y: 0 K: 57</label>
</button>
<button className="child" style={{border: selectedColor === "#3a564f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#3a564f")}>
<div className="color_sample" style={{backgroundColor: "#3a564f"}}></div>
<label className="color-name">Pantone 5477</label>
<label className="color-shade">C: 33 M: 0 Y: 8 K: 66</label>
</button>
<button className="child" style={{border: selectedColor === "#609191" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#609191")}>
<div className="color_sample" style={{backgroundColor: "#609191"}}></div>
<label className="color-name">Pantone 5483</label>
<label className="color-shade">C: 34 M: 0 Y: 0 K: 43</label>
</button>
<button className="child" style={{border: selectedColor === "#667c72" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#667c72")}>
<div className="color_sample" style={{backgroundColor: "#667c72"}}></div>
<label className="color-name">Pantone 5487</label>
<label className="color-shade">C: 18 M: 0 Y: 8 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#8cafad" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8cafad")}>
<div className="color_sample" style={{backgroundColor: "#8cafad"}}></div>
<label className="color-name">Pantone 5493</label>
<label className="color-shade">C: 20 M: 0 Y: 1 K: 31</label>
</button>
<button className="child" style={{border: selectedColor === "#91a399" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#91a399")}>
<div className="color_sample" style={{backgroundColor: "#91a399"}}></div>
<label className="color-name">Pantone 5497</label>
<label className="color-shade">C: 11 M: 0 Y: 6 K: 36</label>
</button>
<button className="child" style={{border: selectedColor === "#aac4bf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aac4bf")}>
<div className="color_sample" style={{backgroundColor: "#aac4bf"}}></div>
<label className="color-name">Pantone 5503</label>
<label className="color-shade">C: 13 M: 0 Y: 3 K: 23</label>
</button>
<button className="child" style={{border: selectedColor === "#afbab2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#afbab2")}>
<div className="color_sample" style={{backgroundColor: "#afbab2"}}></div>
<label className="color-name">Pantone 5507</label>
<label className="color-shade">C: 6 M: 0 Y: 4 K: 27</label>
</button>
<button className="child" style={{border: selectedColor === "#ced8d1" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ced8d1")}>
<div className="color_sample" style={{backgroundColor: "#ced8d1"}}></div>
<label className="color-name">Pantone 5513</label>
<label className="color-shade">C: 5 M: 0 Y: 3 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#c9cec4" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c9cec4")}>
<div className="color_sample" style={{backgroundColor: "#c9cec4"}}></div>
<label className="color-name">Pantone 5517</label>
<label className="color-shade">C: 2 M: 0 Y: 5 K: 19</label>
</button>
<button className="child" style={{border: selectedColor === "#d6ddd6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6ddd6")}>
<div className="color_sample" style={{backgroundColor: "#d6ddd6"}}></div>
<label className="color-name">Pantone 5523</label>
<label className="color-shade">C: 3 M: 0 Y: 3 K: 13</label>
</button>
<button className="child" style={{border: selectedColor === "#ced1c6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ced1c6")}>
<div className="color_sample" style={{backgroundColor: "#ced1c6"}}></div>
<label className="color-name">Pantone 5527</label>
<label className="color-shade">C: 1 M: 0 Y: 5 K: 18</label>
</button>
<button className="child" style={{border: selectedColor === "#213d30" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#213d30")}>
<div className="color_sample" style={{backgroundColor: "#213d30"}}></div>
<label className="color-name">Pantone 5535</label>
<label className="color-shade">C: 46 M: 0 Y: 21 K: 76</label>
</button>
<button className="child" style={{border: selectedColor === "#4f6d5e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#4f6d5e")}>
<div className="color_sample" style={{backgroundColor: "#4f6d5e"}}></div>
<label className="color-name">Pantone 5545</label>
<label className="color-shade">C: 28 M: 0 Y: 14 K: 57</label>
</button>
<button className="child" style={{border: selectedColor === "#779182" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#779182")}>
<div className="color_sample" style={{backgroundColor: "#779182"}}></div>
<label className="color-name">Pantone 5555</label>
<label className="color-shade">C: 18 M: 0 Y: 10 K: 43</label>
</button>
<button className="child" style={{border: selectedColor === "#96aa99" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#96aa99")}>
<div className="color_sample" style={{backgroundColor: "#96aa99"}}></div>
<label className="color-name">Pantone 5565</label>
<label className="color-shade">C: 12 M: 0 Y: 10 K: 33</label>
</button>
<button className="child" style={{border: selectedColor === "#afbfad" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#afbfad")}>
<div className="color_sample" style={{backgroundColor: "#afbfad"}}></div>
<label className="color-name">Pantone 5575</label>
<label className="color-shade">C: 8 M: 0 Y: 9 K: 25</label>
</button>
<button className="child" style={{border: selectedColor === "#c4cebf" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c4cebf")}>
<div className="color_sample" style={{backgroundColor: "#c4cebf"}}></div>
<label className="color-name">Pantone 5585</label>
<label className="color-shade">C: 5 M: 0 Y: 7 K: 19</label>
</button>
<button className="child" style={{border: selectedColor === "#d8dbcc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d8dbcc")}>
<div className="color_sample" style={{backgroundColor: "#d8dbcc"}}></div>
<label className="color-name">Pantone 5595</label>
<label className="color-shade">C: 1 M: 0 Y: 7 K: 14</label>
</button>
<button className="child" style={{border: selectedColor === "#233a2d" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#233a2d")}>
<div className="color_sample" style={{backgroundColor: "#233a2d"}}></div>
<label className="color-name">Pantone 5605</label>
<label className="color-shade">C: 40 M: 0 Y: 22 K: 77</label>
</button>
<button className="child" style={{border: selectedColor === "#546856" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#546856")}>
<div className="color_sample" style={{backgroundColor: "#546856"}}></div>
<label className="color-name">Pantone 5615</label>
<label className="color-shade">C: 19 M: 0 Y: 17 K: 59</label>
</button>
<button className="child" style={{border: selectedColor === "#728470" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#728470")}>
<div className="color_sample" style={{backgroundColor: "#728470"}}></div>
<label className="color-name">Pantone 5625</label>
<label className="color-shade">C: 14 M: 0 Y: 15 K: 48</label>
</button>
<button className="child" style={{border: selectedColor === "#9eaa99" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9eaa99")}>
<div className="color_sample" style={{backgroundColor: "#9eaa99"}}></div>
<label className="color-name">Pantone 5635</label>
<label className="color-shade">C: 7 M: 0 Y: 10 K: 33</label>
</button>
<button className="child" style={{border: selectedColor === "#bcc1b2" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#bcc1b2")}>
<div className="color_sample" style={{backgroundColor: "#bcc1b2"}}></div>
<label className="color-name">Pantone 5645</label>
<label className="color-shade">C: 3 M: 0 Y: 8 K: 24</label>
</button>
<button className="child" style={{border: selectedColor === "#c6ccba" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c6ccba")}>
<div className="color_sample" style={{backgroundColor: "#c6ccba"}}></div>
<label className="color-name">Pantone 5655</label>
<label className="color-shade">C: 3 M: 0 Y: 9 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#d6d6c6" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6d6c6")}>
<div className="color_sample" style={{backgroundColor: "#d6d6c6"}}></div>
<label className="color-name">Pantone 5665</label>
<label className="color-shade">C: 0 M: 0 Y: 7 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#3f4926" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#3f4926")}>
<div className="color_sample" style={{backgroundColor: "#3f4926"}}></div>
<label className="color-name">Pantone 5743</label>
<label className="color-shade">C: 14 M: 0 Y: 48 K: 71</label>
</button>
<button className="child" style={{border: selectedColor === "#424716" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#424716")}>
<div className="color_sample" style={{backgroundColor: "#424716"}}></div>
<label className="color-name">Pantone 5747</label>
<label className="color-shade">C: 7 M: 0 Y: 69 K: 72</label>
</button>
<button className="child" style={{border: selectedColor === "#5e663a" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#5e663a")}>
<div className="color_sample" style={{backgroundColor: "#5e663a"}}></div>
<label className="color-name">Pantone 5753</label>
<label className="color-shade">C: 8 M: 0 Y: 43 K: 60</label>
</button>
<button className="child" style={{border: selectedColor === "#6b702b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#6b702b")}>
<div className="color_sample" style={{backgroundColor: "#6b702b"}}></div>
<label className="color-name">Pantone 5757</label>
<label className="color-shade">C: 4 M: 0 Y: 62 K: 56</label>
</button>
<button className="child" style={{border: selectedColor === "#777c4f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#777c4f")}>
<div className="color_sample" style={{backgroundColor: "#777c4f"}}></div>
<label className="color-name">Pantone 5763</label>
<label className="color-shade">C: 4 M: 0 Y: 36 K: 51</label>
</button>
<button className="child" style={{border: selectedColor === "#8c914f" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#8c914f")}>
<div className="color_sample" style={{backgroundColor: "#8c914f"}}></div>
<label className="color-name">Pantone 5767</label>
<label className="color-shade">C: 3 M: 0 Y: 46 K: 43</label>
</button>
<button className="child" style={{border: selectedColor === "#9b9e72" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9b9e72")}>
<div className="color_sample" style={{backgroundColor: "#9b9e72"}}></div>
<label className="color-name">Pantone 5773</label>
<label className="color-shade">C: 2 M: 0 Y: 28 K: 38</label>
</button>
<button className="child" style={{border: selectedColor === "#aaad75" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#aaad75")}>
<div className="color_sample" style={{backgroundColor: "#aaad75"}}></div>
<label className="color-name">Pantone 5777</label>
<label className="color-shade">C: 2 M: 0 Y: 32 K: 32</label>
</button>
<button className="child" style={{border: selectedColor === "#b5b58e" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b5b58e")}>
<div className="color_sample" style={{backgroundColor: "#b5b58e"}}></div>
<label className="color-name">Pantone 5783</label>
<label className="color-shade">C: 0 M: 0 Y: 22 K: 29</label>
</button>
<button className="child" style={{border: selectedColor === "#c6c699" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c6c699")}>
<div className="color_sample" style={{backgroundColor: "#c6c699"}}></div>
<label className="color-name">Pantone 5787</label>
<label className="color-shade">C: 0 M: 0 Y: 23 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#c6c6a5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#c6c6a5")}>
<div className="color_sample" style={{backgroundColor: "#c6c6a5"}}></div>
<label className="color-name">Pantone 5793</label>
<label className="color-shade">C: 0 M: 0 Y: 17 K: 22</label>
</button>
<button className="child" style={{border: selectedColor === "#d3d1aa" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d3d1aa")}>
<div className="color_sample" style={{backgroundColor: "#d3d1aa"}}></div>
<label className="color-name">Pantone 5797</label>
<label className="color-shade">C: 0 M: 1 Y: 19 K: 17</label>
</button>
<button className="child" style={{border: selectedColor === "#d8d6b7" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d8d6b7")}>
<div className="color_sample" style={{backgroundColor: "#d8d6b7"}}></div>
<label className="color-name">Pantone 5803</label>
<label className="color-shade">C: 0 M: 1 Y: 15 K: 15</label>
</button>
<button className="child" style={{border: selectedColor === "#e0ddbc" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e0ddbc")}>
<div className="color_sample" style={{backgroundColor: "#e0ddbc"}}></div>
<label className="color-name">Pantone 5807</label>
<label className="color-shade">C: 0 M: 1 Y: 16 K: 12</label>
</button>
<button className="child" style={{border: selectedColor === "#494411" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#494411")}>
<div className="color_sample" style={{backgroundColor: "#494411"}}></div>
<label className="color-name">Pantone 5815</label>
<label className="color-shade">C: 0 M: 7 Y: 77 K: 71</label>
</button>
<button className="child" style={{border: selectedColor === "#75702b" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#75702b")}>
<div className="color_sample" style={{backgroundColor: "#75702b"}}></div>
<label className="color-name">Pantone 5825</label>
<label className="color-shade">C: 0 M: 4 Y: 63 K: 54</label>
</button>
<button className="child" style={{border: selectedColor === "#9e9959" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#9e9959")}>
<div className="color_sample" style={{backgroundColor: "#9e9959"}}></div>
<label className="color-name">Pantone 5835</label>
<label className="color-shade">C: 0 M: 3 Y: 44 K: 38</label>
</button>
<button className="child" style={{border: selectedColor === "#b2aa70" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#b2aa70")}>
<div className="color_sample" style={{backgroundColor: "#b2aa70"}}></div>
<label className="color-name">Pantone 5845</label>
<label className="color-shade">C: 0 M: 4 Y: 37 K: 30</label>
</button>
<button className="child" style={{border: selectedColor === "#ccc693" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#ccc693")}>
<div className="color_sample" style={{backgroundColor: "#ccc693"}}></div>
<label className="color-name">Pantone 5855</label>
<label className="color-shade">C: 0 M: 3 Y: 28 K: 20</label>
</button>
<button className="child" style={{border: selectedColor === "#d6cea3" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#d6cea3")}>
<div className="color_sample" style={{backgroundColor: "#d6cea3"}}></div>
<label className="color-name">Pantone 5865</label>
<label className="color-shade">C: 0 M: 4 Y: 24 K: 16</label>
</button>
<button className="child" style={{border: selectedColor === "#e0dbb5" ? "3px solid gray" : "none"}} onClick={() => clickSelectColor("#e0dbb5")}>
<div className="color_sample" style={{backgroundColor: "#e0dbb5"}}></div>
<label className="color-name">Pantone 5875</label>
<label className="color-shade">C: 0 M: 2 Y: 19 K: 12</label>
</button>
                  </div>
                </div>
                <div className='select-cancel'>
                        <button id="select" onClick={clickSelect}>SELECT</button>
                        <div className='seperator'></div>
                        <button onClick={clickCancel}>CANCEL</button>
                </div>
            </div>
            </div>
          }
    </div>
  );
}

export default App;
