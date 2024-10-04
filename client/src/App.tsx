import Home from "./pages/Home";
import Box from "./pages/Box";
import { useState } from "react";
import BackGround from "./assets/BackGround.png"

function App() {

  const [changeBox, setChageBox] = useState({
    AddWord: false,
    WordList: false,
    QuizWord: false
  });

  return (
    <div className="flex justify-between items-center w-screen h-screen">
      {/* background */}
      <div className="absolute h-screen w-screen">
        <svg id="visual"  width="screen" height="screen" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"><rect x="0" y="0" width="3440" height="1440" fill="#000000"></rect><defs><linearGradient id="grad1_0" x1="58.1%" y1="0%" x2="100%" y2="100%"><stop offset="2.222222222222225%" stop-color="#b200ff" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#b200ff" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_1" x1="58.1%" y1="0%" x2="100%" y2="100%"><stop offset="2.222222222222225%" stop-color="#b200ff" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#9d00eb" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_2" x1="58.1%" y1="0%" x2="100%" y2="100%"><stop offset="2.222222222222225%" stop-color="#8800d7" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#9d00eb" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_3" x1="58.1%" y1="0%" x2="100%" y2="100%"><stop offset="2.222222222222225%" stop-color="#8800d7" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#7300c3" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_4" x1="58.1%" y1="0%" x2="100%" y2="100%"><stop offset="2.222222222222225%" stop-color="#5d00b0" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#7300c3" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_5" x1="58.1%" y1="0%" x2="100%" y2="100%"><stop offset="2.222222222222225%" stop-color="#5d00b0" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#47009d" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_6" x1="58.1%" y1="0%" x2="100%" y2="100%"><stop offset="2.222222222222225%" stop-color="#2e008a" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#47009d" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad1_7" x1="58.1%" y1="0%" x2="100%" y2="100%"><stop offset="2.222222222222225%" stop-color="#2e008a" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#000000" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_0" x1="0%" y1="0%" x2="41.9%" y2="100%"><stop offset="2.222222222222225%" stop-color="#b200ff" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#b200ff" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_1" x1="0%" y1="0%" x2="41.9%" y2="100%"><stop offset="2.222222222222225%" stop-color="#9d00eb" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#b200ff" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_2" x1="0%" y1="0%" x2="41.9%" y2="100%"><stop offset="2.222222222222225%" stop-color="#9d00eb" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#8800d7" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_3" x1="0%" y1="0%" x2="41.9%" y2="100%"><stop offset="2.222222222222225%" stop-color="#7300c3" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#8800d7" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_4" x1="0%" y1="0%" x2="41.9%" y2="100%"><stop offset="2.222222222222225%" stop-color="#7300c3" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#5d00b0" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_5" x1="0%" y1="0%" x2="41.9%" y2="100%"><stop offset="2.222222222222225%" stop-color="#47009d" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#5d00b0" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_6" x1="0%" y1="0%" x2="41.9%" y2="100%"><stop offset="2.222222222222225%" stop-color="#47009d" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#2e008a" stop-opacity="1"></stop></linearGradient></defs><defs><linearGradient id="grad2_7" x1="0%" y1="0%" x2="41.9%" y2="100%"><stop offset="2.222222222222225%" stop-color="#000000" stop-opacity="1"></stop><stop offset="97.77777777777779%" stop-color="#2e008a" stop-opacity="1"></stop></linearGradient></defs><g transform="translate(3440, 0)"><path d="M0 1152C-87.2 1149.9 -174.5 1147.8 -256.3 1123.1C-338.2 1098.5 -414.7 1051.2 -482 1001C-549.3 950.7 -607.4 897.4 -678.4 850.6C-749.3 803.9 -833.1 763.7 -868.6 692.7C-904.1 621.7 -891.3 519.8 -918.1 442.1C-944.9 364.4 -1011.2 310.9 -1056.8 241.2C-1102.4 171.6 -1127.2 85.8 -1152 0L0 0Z" fill="#210081"></path><path d="M0 1008C-76.3 1006.2 -152.7 1004.3 -224.3 982.7C-295.9 961.1 -362.9 919.8 -421.8 875.9C-480.7 831.9 -531.5 785.2 -593.6 744.3C-655.6 703.4 -729 668.2 -760 606.1C-791.1 544 -779.9 454.9 -803.3 386.9C-826.8 318.9 -884.8 272 -924.7 211.1C-964.6 150.1 -986.3 75.1 -1008 0L0 0Z" fill="#3b0094"></path><path d="M0 864C-65.4 862.4 -130.8 860.8 -192.3 842.3C-253.7 823.8 -311.1 788.4 -361.5 750.7C-412 713 -455.6 673 -508.8 638C-562 602.9 -624.8 572.8 -651.5 519.5C-678.1 466.3 -668.5 389.9 -688.6 331.6C-708.7 273.3 -758.4 233.2 -792.6 180.9C-826.8 128.7 -845.4 64.3 -864 0L0 0Z" fill="#5200a7"></path><path d="M0 720C-54.5 718.7 -109 717.4 -160.2 701.9C-211.4 686.5 -259.2 657 -301.3 625.6C-343.3 594.2 -379.6 560.9 -424 531.6C-468.3 502.4 -520.7 477.3 -542.9 432.9C-565.1 388.6 -557.1 324.9 -573.8 276.3C-590.5 227.8 -632 194.3 -660.5 150.8C-689 107.2 -704.5 53.6 -720 0L0 0Z" fill="#6800ba"></path><path d="M0 576C-43.6 574.9 -87.2 573.9 -128.2 561.6C-169.1 549.2 -207.4 525.6 -241 500.5C-274.7 475.4 -303.7 448.7 -339.2 425.3C-374.6 401.9 -416.6 381.9 -434.3 346.3C-452.1 310.8 -445.7 259.9 -459 221.1C-472.4 182.2 -505.6 155.4 -528.4 120.6C-551.2 85.8 -563.6 42.9 -576 0L0 0Z" fill="#7e00cd"></path><path d="M0 432C-32.7 431.2 -65.4 430.4 -96.1 421.2C-126.8 411.9 -155.5 394.2 -180.8 375.4C-206 356.5 -227.8 336.5 -254.4 319C-281 301.5 -312.4 286.4 -325.7 259.8C-339 233.1 -334.2 194.9 -344.3 165.8C-354.3 136.7 -379.2 116.6 -396.3 90.5C-413.4 64.3 -422.7 32.2 -432 0L0 0Z" fill="#9300e1"></path><path d="M0 288C-21.8 287.5 -43.6 286.9 -64.1 280.8C-84.6 274.6 -103.7 262.8 -120.5 250.2C-137.3 237.7 -151.9 224.3 -169.6 212.7C-187.3 201 -208.3 190.9 -217.2 173.2C-226 155.4 -222.8 130 -229.5 110.5C-236.2 91.1 -252.8 77.7 -264.2 60.3C-275.6 42.9 -281.8 21.4 -288 0L0 0Z" fill="#a800f5"></path><path d="M0 144C-10.9 143.7 -21.8 143.5 -32 140.4C-42.3 137.3 -51.8 131.4 -60.3 125.1C-68.7 118.8 -75.9 112.2 -84.8 106.3C-93.7 100.5 -104.1 95.5 -108.6 86.6C-113 77.7 -111.4 65 -114.8 55.3C-118.1 45.6 -126.4 38.9 -132.1 30.2C-137.8 21.4 -140.9 10.7 -144 0L0 0Z" fill="#b200ff"></path></g><g transform="translate(0, 1440)"><path d="M0 -1152C87.1 -1147.3 174.2 -1142.6 256.3 -1123.1C338.4 -1103.6 415.5 -1069.3 499.4 -1037C583.3 -1004.7 674 -974.4 717 -899.1C760 -823.8 755.4 -703.5 775.6 -618.5C795.8 -533.5 840.9 -483.9 886.6 -426.9C932.2 -370 978.4 -305.8 1022.7 -233.4C1067 -161.1 1109.5 -80.5 1152 0L0 0Z" fill="#210081"></path><path d="M0 -1008C76.2 -1003.9 152.5 -999.8 224.3 -982.7C296.1 -965.7 363.6 -935.7 437 -907.4C510.4 -879.1 589.7 -852.6 627.4 -786.7C665 -720.8 660.9 -615.5 678.6 -541.2C696.3 -466.8 735.8 -423.4 775.7 -373.6C815.7 -323.8 856.1 -267.6 894.9 -204.2C933.7 -140.9 970.8 -70.5 1008 0L0 0Z" fill="#3b0094"></path><path d="M0 -864C65.3 -860.5 130.7 -857 192.3 -842.3C253.8 -827.7 311.6 -802 374.6 -777.8C437.5 -753.5 505.5 -730.8 537.8 -674.3C570 -617.8 566.5 -527.6 581.7 -463.9C596.8 -400.1 630.7 -362.9 664.9 -320.2C699.1 -277.5 733.8 -229.3 767 -175.1C800.3 -120.8 832.1 -60.4 864 0L0 0Z" fill="#5200a7"></path><path d="M0 -720C54.5 -717.1 108.9 -714.1 160.2 -701.9C211.5 -689.8 259.7 -668.3 312.1 -648.1C364.6 -627.9 421.2 -609 448.1 -561.9C475 -514.9 472.1 -439.7 484.7 -386.6C497.4 -333.5 525.6 -302.4 554.1 -266.8C582.6 -231.3 611.5 -191.1 639.2 -145.9C666.9 -100.7 693.4 -50.3 720 0L0 0Z" fill="#6800ba"></path><path d="M0 -576C43.6 -573.7 87.1 -571.3 128.2 -561.6C169.2 -551.8 207.8 -534.7 249.7 -518.5C291.6 -502.4 337 -487.2 358.5 -449.6C380 -411.9 377.7 -351.7 387.8 -309.3C397.9 -266.8 420.5 -241.9 443.3 -213.5C466.1 -185 489.2 -152.9 511.3 -116.7C533.5 -80.5 554.8 -40.3 576 0L0 0Z" fill="#7e00cd"></path><path d="M0 -432C32.7 -430.2 65.3 -428.5 96.1 -421.2C126.9 -413.9 155.8 -401 187.3 -388.9C218.7 -376.8 252.7 -365.4 268.9 -337.2C285 -308.9 283.3 -263.8 290.8 -231.9C298.4 -200.1 315.3 -181.5 332.5 -160.1C349.6 -138.8 366.9 -114.7 383.5 -87.5C400.1 -60.4 416.1 -30.2 432 0L0 0Z" fill="#9300e1"></path><path d="M0 -288C21.8 -286.8 43.6 -285.7 64.1 -280.8C84.6 -275.9 103.9 -267.3 124.9 -259.3C145.8 -251.2 168.5 -243.6 179.3 -224.8C190 -205.9 188.8 -175.9 193.9 -154.6C198.9 -133.4 210.2 -121 221.6 -106.7C233 -92.5 244.6 -76.4 255.7 -58.4C266.8 -40.3 277.4 -20.1 288 0L0 0Z" fill="#a800f5"></path><path d="M0 -144C10.9 -143.4 21.8 -142.8 32 -140.4C42.3 -138 51.9 -133.7 62.4 -129.6C72.9 -125.6 84.2 -121.8 89.6 -112.4C95 -103 94.4 -87.9 96.9 -77.3C99.5 -66.7 105.1 -60.5 110.8 -53.4C116.5 -46.3 122.3 -38.2 127.8 -29.2C133.4 -20.1 138.7 -10.1 144 0L0 0Z" fill="#b200ff"></path></g></svg> 
          
      </div>
      {/* main div */}
      <div className="flex items-center -mx-[10rem] absolute w-screen h-screen">
        <Home setChageBox={setChageBox} changeBox={changeBox} />
        <Box changeBox={changeBox} />   
      </div>
    </div>

  );
}

export default App;
