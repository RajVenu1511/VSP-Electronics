import { Injectable, signal } from '@angular/core';
import { Product, Category, Brand } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private defaultProducts: Product[] = [
    {
      id: '1',
      name: '14 in 1 Educational DIY Solar Transformers Robot Toy',
      price: 1499,
      image: '/assets/images/products/14-in-1-educational-solar-robot.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '14-in-1 solar powered transforming robot educational toy kit'
    },
    {
      id: '2',
      name: '2 WHEEL ROUND KIT',
      price: 899,
      image: '/assets/images/products/2-wheel-round-kit.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'This 2WD Mini Round Double-Deck Smart Robot Car Chassis DIY Kit. Cool and very easy to assemble robot kit. With this car platform, you can add some micro-controller and sensor modules, and program it to build your own robot car.'
    },
    {
      id: '3',
      name: '4WD Mecannum wheels Normal Chassis Kit',
      price: 3499,
      image: '/assets/images/products/4wd-mecannum-wheels-chassis.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: true,
      description: '4WD Mecanum Wheel Robot Kit series products are 4 wheel drive mobile platforms based on Mecanum wheels. Each kit contains two left mecanum wheels as well as two right mecanum wheels. The four Mecanum wheels are each connected to a separate motor with independent control. Depending on each individual wheel direction and speed, the mobile platform can move forward, backward, sideways and any other desired directions or spin.',
      aboutProduct: '4WD Mecanum Wheel Robot Kit series products are 4 wheel drive mobile platforms based on Mecanum wheels. Each kit contains two left mecanum wheels as well as two right mecanum wheels. The four Mecanum wheels are each connected to a separate motor with independent control.'
    },
    {
      id: '4',
      name: 'Aluminium Alloy 2WD Kit',
      price: 1299,
      image: '/assets/images/products/aluminium-alloy-2wd-kit.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Lightweight aluminum alloy 2-wheel drive robot chassis'
    },
    {
      id: '5',
      name: 'DIY BLUETOOTH CONTROLLED ROBOT',
      price: 1899,
      image: '/assets/images/products/diy-bluetooth-controlled-robot.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Bluetooth controlled robot kit with smartphone app support'
    },
    {
      id: '6',
      name: 'DIY KIT – AIR CAR (ROD3)',
      price: 799,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/DIY-KIT-AIR-CAR-ROD3-1.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Make your own car which is run by a rotating fan. This kit enables us to demonstrate Newton\'s third law of motion i.e. "Every Action has an equal and opposite Reaction".'
    },
    {
      id: '7',
      name: 'DIY KIT – WIND URJA ROD5',
      price: 899,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Wind energy educational kit for learning renewable power'
    },
    {
      id: '8',
      name: 'Diy Kit 16No Tank',
      price: 1599,
      image: '/assets/images/products/diy-kit-16no-tank.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Tank-style robot chassis DIY kit'
    },
    {
      id: '9',
      name: 'DIY KIT SCAN MACHINE ( ROD4)',
      price: 999,
      image: '/assets/images/products/diy-kit-scan-machine-rod4.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Scanner machine educational DIY kit'
    },
    {
      id: '10',
      name: 'DIY KIT STANDARD ROBOT KIT (ROD11)',
      price: 1799,
      image: '/assets/images/products/diy-kit-standard-robot-rod11.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Standard robot kit with complete components'
    },
    {
      id: '11',
      name: 'DIY LINE FOLLOWER ROBOT',
      price: 1699,
      image: '/assets/images/products/diy-line-follower-robot.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Line following robot with IR sensors'
    },
    {
      id: '12',
      name: 'DIY OBSTACLE AVOIDANCE ROBOT',
      price: 1899,
      image: '/assets/images/products/diy-obstacle-avoidance-robot.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Obstacle avoiding robot with ultrasonic sensors'
    },
    {
      id: '13',
      name: 'DIY RF CONTROLLED ROBOT',
      price: 1999,
      image: '/assets/images/products/diy-rf-controlled-robot.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'RF remote controlled robot kit'
    },
    {
      id: '14',
      name: 'DIY Wind Mill (ROD 68)',
      price: 699,
      image: '/assets/images/products/diy-wind-mill-rod68.jpg',
      category: 'Robotic DIY Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Wind mill educational DIY kit'
    },
    // Mini Drone Kits
    {
      id: '14a',
      name: 'DIY MINI DRONE WITH WIFI CAMERA',
      price: 4999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/wifi-kit-1.jpg',
      category: 'Mini Drone Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Build your own mini drone with WiFi camera. Complete DIY kit with all components. FPV capability through mobile app. Compact design under 20cm. Perfect for learning drone technology.'
    },
    {
      id: '14b',
      name: 'DM002 DIY DRONE KIT',
      price: 3999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/DM002-1.jpg',
      category: 'Mini Drone Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '1.) Red when charger is connected to the battery. 2.) No LED blinks when the charger is connected to the source(while charging). 3.) Again red LED glows when the battery is charged completely. Material: Plastic | Usage/Application: Outdoor | Sensor Type: 4/3" CMOS | Color: Black | Battery Backup: 15 minutes | Gyroscope: 6-AXIS | Battery: 3.7V 300mAh | Charging Time: 60-80 MINUTES',
      aboutProduct: '1.)Red when charger is connected to the battery.\n2)No LED blinks when the charger is connected to the source(while charging).\n3)Again red LED glows when the battery is charged completely.\n\nMaterial: Plastic\nUsage/Application: Outdoor\nSensor Type: 4/3" CMOS\nColor: Black\nBattery Backup: 15 minutes\nGyroscope: 6-AXIS\nBattery: 3.7V 300mAh\nCharging Time: 60-80 MINUTES'
    },
    {
      id: '14c',
      name: 'XYQ2 DRONE KIT',
      price: 3499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/XYQ2-2.jpg',
      category: 'Mini Drone Kits',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'XYQ2 mini quadcopter DIY kit. Complete package with frame, motors, and electronics. Learn to build and fly your own drone. Size below 20cm. Ideal for educational purposes.'
    },
    {
      id: '15',
      name: 'Centrifugal Nozzle Spray System for Agriculture Drone',
      price: 0,
      image: 'assets/images/products/centrifugal-nozzle.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Premium Material: Made of high quality plastic + rubber + aluminum alloy materials, it can be used for a long time and the effect is good. Larger Spray Radius: The centrifugal nozzle has a larger spray radius and higher efficiency than ordinary nozzles, the speed is 20,000 rpm.'
    },
    {
      id: '16',
      name: 'Drone Nozzle 110 Degree 20mm Double',
      price: 0,
      image: 'assets/images/products/drone-nozzle-110.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Specifications: clamp size:20MM Nozzle size: 11001,11002,11003,11004,11005,11006,11008,110010. Spray Angle:110 Degree Flat Fan nozzle all this type of nozzle install on pipe,the pipe can be 20MM'
    },
    {
      id: '17',
      name: 'Drone Spray Nozzle 3810',
      price: 0,
      image: 'assets/images/products/drone-spray-nozzle-3810.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Shell material: aluminum alloy, Nozzle height: 30cm, Mist particle diameter: 50-200 microns, Working range: water supply 200-2000mL / min, Atomized spray width: 1.5-2.0 meters, Voltage: 12-14S power supply, Speed: 20,000 rpm'
    },
    {
      id: '18',
      name: 'Drone Spray NOZZLE DOUBLE HEAD',
      price: 0,
      image: 'assets/images/products/drone-spray-double-head.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'EFT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'EFT Dual Sprayers/Agriculture spraying drone dual Sprayers. Product name: extended rod double sprinkler head, Weight: 113.7 g, Nozzle: VP110-015, Filter: 80 mesh stainless steel, Outside diameter of water pipe: 8mm'
    },
    {
      id: '19',
      name: 'EFT E410P 10L 4 Axis Agricultural Drone Frame',
      price: 0,
      image: 'assets/images/products/eft-e410p-frame.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'EFT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Made by advanced engineering material, super strong & smooth. Easy to assemble and disassemble. The frame is tough and durable. Best drone for agriculture purpose. Ultra-Lightweight and Durable. Its comes with folding propeller. The frame has Excellent Strength.'
    },
    {
      id: '20',
      name: 'H16 RC Skydroid',
      price: 0,
      image: 'assets/images/products/h16-rc-skydroid.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'SKYDROID',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'The Skydroid H16 Remote Control, paired with the H16 Receiver, offers precise and reliable control for unmanned aerial vehicles (UAVs). Model No.: H16, Working Voltage: 4.2V, Frequency: 2.400 to 2.483GHz, Endurance: 6-20 Hours, Channels: 16'
    },
    {
      id: '21',
      name: 'Hobbywing Pump 5L Kit with Nozzle',
      price: 0,
      image: 'assets/images/products/hobbywing-pump-5l.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Versatile Spraying: Suitable for various applications like gardening, pesticide spraying, and surface cleaning. Powerful Water Pump: The 5L brushless water pump provides a continuous and powerful flow of water. Package Includes: 1 x 5L Brushless Water Pump, 4 x EFT Extension Rod High-Pressure Nozzles'
    },
    {
      id: '22',
      name: 'Hobbywing Pump 5L Kit with Nozzle ( Y Type)',
      price: 0,
      image: 'assets/images/products/hobbywing-pump-5l-y.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'The Spraying System with Pressure Nozzles & 5L Brushless Water Pump provides a versatile and efficient solution. Working Voltage: 12-14S (DC44-60.9V), Maximum Power: 150w, Working Pressure: 0.35Mpa, Package: 4 x EFT Y Shaped Extended High Pressure Nozzles, 1 x 5L Brushless Water Pump'
    },
    {
      id: '23',
      name: 'hobbywing x6plus motor combo CCW',
      price: 0,
      image: 'assets/images/products/hobbywing-x6plus-ccw.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'The XRotor X6 brushless power system is a power system capable of carrying a load of 3~5kg (per axis) for agricultural drones. It can provide a thrust of up to 11.9kg and match 28/30mm carbon fiber tube arms. Waterproof to IPX7 standard.'
    },
    {
      id: '24',
      name: 'hobbywing X8 100kv combo 35mm CW / CCW',
      price: 0,
      image: 'assets/images/products/hobbywing-x8-100kv.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Integrated & Ready-to-use Propulsion System: The X8 propulsion system integrates motor, ESC, propeller, and motor mount. FOC-based PMSM Algorithm. Waterproof: IPX7 standards. Package: 1 x Hobbywing XRotor X8 Motor – CW, 1 x HOBBYWING X8 3090 or 3011 Folding Propeller – CW'
    },
    {
      id: '25',
      name: 'Hobbywing XRotor X6 Plus Motor and X6 Plus 2388 or 2480 Folding Propeller Combo Kit – CW',
      price: 0,
      image: 'assets/images/products/hobbywing-x6plus-cw.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Simple and convenient: Simple assembly, easy to install and disassemble. Quality craftsmanship with exquisite workmanship. Strong stability: The motor adopts a new design with high endurance, stable connection, and strong stability.'
    },
    {
      id: '26',
      name: 'JIYI FLOW METER',
      price: 0,
      image: 'assets/images/products/jiyi-flow-meter.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'JIYI',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'The Jiyi Flowmeter is a state-of-the-art instrument used for measuring the flow rate of various fluids. Non-intrusive measurement, Wide flow range, Compatibility with various fluids, High accuracy and precision. Flow accuracy: (0.2-6L/min) ±10%, Operating Voltage: 5-24V'
    },
    {
      id: '27',
      name: 'Jiyi K++ V2 Flight Controller Kit',
      price: 0,
      image: 'assets/images/products/jiyi-k-v2.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'JIYI',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Terrain following function, Breakpoint continuous spray function, One-key return function, Precise spraying function, Double water pump mode. Supports: I4, X4 four rotor, iy6, y6, 16, v6 six rotor v8 i8 x8 ix8 8 rotor. Battery Type: 3s-12s lithium polymer battery'
    },
    {
      id: '28',
      name: 'Jiyi K3 Apro Flight Controller Kit',
      price: 0,
      image: 'assets/images/products/jiyi-k3-apro.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'JIYI',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'K3APro flight controller is specially designed for agricultural sprayer drones. It has a variety of modes and exclusive functions. It supports manual, semi-autonomous and autonomous flight. It can monitor pesticide flow in real time. Supported ESC Type: Below 490Hz PWM ESC, Working Voltage: 2-12S'
    },
    {
      id: '29',
      name: 'MK15 RC',
      price: 0,
      image: 'assets/images/products/mk15-rc.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'The MK15 HDMI COMBO is a versatile multimedia device. Monitor: 5.5-inch High Definition LCD Touchscreen, System: Android 9.0 OS, 2G RAM & 16G ROM, Battery Capacity: 10200 mAh 7.4V 2S Li-ion, Battery Life: 15 hours, Channels: 16'
    },
    {
      id: '30',
      name: 'PROP 2388 CCW-CW – Without Pad Set of 2 Compatible',
      price: 0,
      image: 'assets/images/products/prop-2388-ccw-cw.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '23 Inches Agriculture Drone Propeller from Hobbywing. Original from Hobbywing Spare Propeller for X6 Motor. 23/88 Inches Nylon Mixed carbon propellers. Foldable for Agriculture drones. Replacement part. No need to change the aluminium hub.'
    },
    {
      id: '31',
      name: 'PROP 2480 CCW-CW – Without Pad Set of 2 Compatible',
      price: 0,
      image: 'assets/images/products/prop-2480-ccw-cw.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Unlock unparalleled performance with the Hobbwing 2480 Pro. Crafted from cutting-edge carbon fiber material. Engineered for compatibility with X6 Plus drone model. Diameter of 24 inches and a pitch of 8.0 inches. Blade length: 29.7 CM, Weight of single blade: 34.5 G'
    },
    {
      id: '32',
      name: 'PROP 3011 CCW-CW – Without Pad Set of 2 Compatible',
      price: 0,
      image: 'assets/images/products/prop-3011-ccw-cw.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Propellers designed for optimal thrust and efficiency. Specialized design to minimize noise during flight. Constructed using robust materials to withstand demanding agricultural environments. Ensuring consistent performance over extended periods.'
    },
    {
      id: '33',
      name: 'PROP 3011 with Paddle Org HB (Cw/Ccw)',
      price: 0,
      image: 'assets/images/products/prop-3011-paddle.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Hobbywing 3011 folding propeller with paddle. Original HB design. Available in CW and CCW rotation. Designed for heavy-lift agricultural drones with optimized aerodynamic performance.'
    },
    {
      id: '34',
      name: 'PROP 3090 CCW-CW – Without Pad Set of 2 Compatible',
      price: 0,
      image: 'assets/images/products/prop-3090-ccw-cw.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '30-inch propellers designed for high-payload agricultural drones. Efficient thrust generation with minimal power consumption. Durable construction for extended operational life.'
    },
    {
      id: '35',
      name: 'Prop 3411 with Clips Ccw And Cw',
      price: 0,
      image: 'assets/images/products/prop-3411-clips.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Hobbywing 3411 folding propeller with mounting clips. Quick-release design for easy installation and replacement. Compatible with X9 Plus and similar motor systems.'
    },
    {
      id: '36',
      name: 'Prop 41135 with Clips Cw And Ccw',
      price: 0,
      image: 'assets/images/products/prop-41135-clips.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Large 41-inch folding propeller with secure clip mounting system. Designed for heavy-duty agricultural applications. Optimized blade design for maximum efficiency.'
    },
    {
      id: '37',
      name: 'PROP CW AND CCW 3090 Propeller without adapter',
      price: 0,
      image: 'assets/images/products/prop-3090-adapter.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '3090 propeller set without adapter. CW and CCW pair for balanced flight. High-strength construction for agricultural drone applications with consistent performance.'
    },
    {
      id: '38',
      name: 'SKYDROID T10 Remote Controller',
      price: 0,
      image: 'assets/images/products/skydroid-t10.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'SKYDROID',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Advanced T10 remote controller with integrated receiver. Long-range communication for agricultural drone operations. User-friendly interface with customizable channels.'
    },
    {
      id: '39',
      name: 'SKYRC Charger PC1500W',
      price: 0,
      image: 'assets/images/products/skyrc-charger-pc1500w.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'SKYRC',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Professional 1500W high-power charger for agricultural drone batteries. Fast charging capability with multiple safety features. Compatible with various battery types and configurations.'
    },
    {
      id: '40',
      name: 'T12 RC with Cam',
      price: 0,
      image: 'assets/images/products/t12-rc-cam.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'SKYDROID',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'T12 remote controller with integrated camera system. Real-time video transmission for enhanced operational awareness. Ergonomic design for comfortable extended use.'
    },
    {
      id: '41',
      name: 'TATTU Pro 44.4V 22000mAh Battery',
      price: 0,
      image: 'assets/images/products/tattu-pro-battery.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'TATTU',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'High-capacity TATTU Pro battery pack. 44.4V 22000mAh for extended flight time. Professional-grade cells with advanced battery management system. Ideal for large agricultural drones.'
    },
    {
      id: '42',
      name: 'X11+41135 CCW',
      price: 0,
      image: 'assets/images/products/x11-41135-ccw.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Hobbywing X11 motor with 41135 folding propeller CCW. Complete power system for heavy-lift agricultural drones. High torque and efficiency for demanding applications.'
    },
    {
      id: '43',
      name: 'X11+41135 CW',
      price: 0,
      image: 'assets/images/products/x11-41135-cw.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Hobbywing X11 motor with 41135 folding propeller CW. Integrated power system optimized for agricultural drone applications. Durable and reliable performance.'
    },
    {
      id: '44',
      name: 'X9plus +36190 CCW',
      price: 0,
      image: 'assets/images/products/x9plus-36190-ccw.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'X9 Plus motor system with 36190 propeller CCW. High-performance propulsion for large agricultural drones. Optimized for heavy payload carrying capacity.'
    },
    {
      id: '45',
      name: 'X9plus +36190 CW',
      price: 0,
      image: 'assets/images/products/x9plus-36190-cw.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'X9 Plus motor system with 36190 propeller CW. Professional-grade propulsion for agricultural drone operations. Efficient power delivery with robust construction.'
    },
    {
      id: '46',
      name: 'Project Ready Automatic Street Light',
      price: 0,
      image: 'assets/images/products/automatic-street-light.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Automatic street light control system using LDR sensor. Automatically turns lights on at dusk and off at dawn. Complete ready-to-use project with all components assembled.'
    },
    {
      id: '47',
      name: 'PROJECT READY BT SURVEILLANCE ROBOT',
      price: 0,
      image: 'assets/images/products/bt-surveillance-robot.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Bluetooth controlled surveillance robot with wireless camera. Control via smartphone app. Real-time video streaming capability. Perfect for security and monitoring applications.'
    },
    {
      id: '48',
      name: 'Project Ready Iot Air Quality',
      price: 0,
      image: 'assets/images/products/iot-air-quality.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'IoT-based air quality monitoring system. Measures PM2.5, CO2, temperature, and humidity. Real-time data upload to cloud. Mobile app interface for remote monitoring.'
    },
    {
      id: '49',
      name: 'Project Ready Iot Energy Montioring and Management',
      price: 0,
      image: 'assets/images/products/iot-energy-monitoring.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'IoT energy monitoring and management system. Track real-time power consumption. Cloud-based data logging and analytics. Mobile app for remote monitoring and control.'
    },
    {
      id: '50',
      name: 'PROJECT READY IOT FOOD QUALITY MONITORING SYSTEM',
      price: 0,
      image: 'assets/images/products/iot-food-quality.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'IoT food quality monitoring system. Monitors temperature, humidity, and gas levels. Alerts for spoilage detection. Cloud data storage with mobile app interface.'
    },
    {
      id: '51',
      name: 'Project Ready Iot Home Automation',
      price: 0,
      image: 'assets/images/products/iot-home-automation.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Complete IoT home automation system. Control lights, fans, and appliances remotely. Voice control compatible. Mobile app with scheduling features. Easy installation.'
    },
    {
      id: '52',
      name: 'Project Ready Iot Patient Healthcare',
      price: 0,
      image: 'assets/images/products/iot-patient-healthcare.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'IoT patient healthcare monitoring system. Tracks heart rate, temperature, and SpO2. Real-time alerts for abnormal readings. Cloud-based health record management.'
    },
    {
      id: '53',
      name: 'Project Ready Iot Rfid Attendance',
      price: 0,
      image: 'assets/images/products/iot-rfid-attendance.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'RFID-based IoT attendance system. Contactless attendance marking. Real-time data sync to cloud. Web-based attendance reports and analytics. SMS notifications.'
    },
    {
      id: '54',
      name: 'Project Ready Iot Rfid Authorisation',
      price: 0,
      image: 'assets/images/products/iot-rfid-authorisation.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'RFID authorization and access control system. IoT-enabled door lock. User management via mobile app. Access logs stored in cloud. Multi-level authorization support.'
    },
    {
      id: '55',
      name: 'Project Ready Iot Smart Irrigation',
      price: 0,
      image: 'assets/images/products/iot-smart-irrigation.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'IoT smart irrigation system. Soil moisture monitoring. Automated water pump control. Weather-based irrigation scheduling. Mobile app control and monitoring.'
    },
    {
      id: '56',
      name: 'Project Ready Iot Smart Lighting Control',
      price: 0,
      image: 'assets/images/products/iot-smart-lighting.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'IoT smart lighting control system. Remote on/off control. Dimming capability. Scheduling and automation. Energy consumption tracking. Mobile app interface.'
    },
    {
      id: '57',
      name: 'Project Ready Iot Traffic Light Control',
      price: 0,
      image: 'assets/images/products/iot-traffic-light.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'IoT traffic light control system. Adaptive signal timing. Real-time traffic density monitoring. Cloud-based traffic management. Emergency vehicle priority system.'
    },
    {
      id: '58',
      name: 'Project Ready Iot Waste Management',
      price: 0,
      image: 'assets/images/products/iot-waste-management.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'IoT waste management system. Smart bin with fill-level monitoring. Route optimization for collection. Real-time alerts when bins are full. Cloud-based analytics.'
    },
    {
      id: '59',
      name: 'Project Ready Iot Waterquality',
      price: 0,
      image: 'assets/images/products/iot-waterquality.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'IoT water quality monitoring system. Measures pH, TDS, turbidity, and temperature. Real-time water quality alerts. Cloud data logging. Mobile app for remote monitoring.'
    },
    {
      id: '60',
      name: 'Project Ready OBSTACLE AVOIDING ROBOT',
      price: 0,
      image: 'assets/images/products/obstacle-avoiding-robot.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Autonomous obstacle avoiding robot. Ultrasonic sensors for obstacle detection. Pre-programmed navigation algorithm. Battery powered. Complete assembled project.'
    },
    {
      id: '61',
      name: 'project ready RFID BASED DOOR LOCK',
      price: 0,
      image: 'assets/images/products/rfid-door-lock.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'RFID-based electronic door lock system. Contactless access control. Multiple user RFID cards support. LCD display for user feedback. Relay-controlled lock mechanism.'
    },
    {
      id: '62',
      name: 'Project Ready SINGLE AXIS SOLAR TRACKER',
      price: 0,
      image: 'assets/images/products/solar-tracker.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Single axis solar tracker system. Automatic sun position tracking. LDR-based solar panel orientation. Increases solar efficiency up to 30%. Complete working project.'
    },
    {
      id: '63',
      name: 'Project Ready UNDERGROUND CABLE FAULT DETECTOR',
      price: 0,
      image: 'assets/images/products/cable-fault-detector.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Underground cable fault detector system. Accurately detects cable breaks and short circuits. Distance measurement to fault location. LCD display. Battery operated.'
    },
    {
      id: '64',
      name: 'Project WIRELESS BATTERY VOLTAGE MONITORING FOR EV',
      price: 0,
      image: 'assets/images/products/cable-fault-detector.jpg',
      category: 'READY RUNNING PROJECTS',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Wireless battery voltage monitoring system for electric vehicles. Real-time voltage monitoring. Low battery alerts. Wireless data transmission. Mobile app interface.'
    },
    // Raspberry Pi Products
    {
      id: '65',
      name: '3 in 1 Aluminum Heat Sink Set for Raspberry Pi 3/4',
      price: 199,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/3-in-1-heat-sink-set-for-raspberry-pi-3-800x800-1.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '3 piece aluminum heat sink set for Raspberry Pi 3/4. Excellent heat dissipation. Easy installation with adhesive backing.'
    },
    {
      id: '66',
      name: '3.2 Inch TFT LCD Touch Screen Display V4.0',
      price: 1299,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/TFT-Lcd.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '3.2 inch TFT LCD touchscreen display for Raspberry Pi. 320x240 resolution. Resistive touch. Easy plug and play installation.'
    },
    {
      id: '67',
      name: '40 Pin Red GPIO Extension Board',
      price: 299,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '40-pin GPIO extension board for Raspberry Pi. Easy access to all GPIO pins. T-type design. Color coded for easy identification.'
    },
    {
      id: '68',
      name: '5MP CAMERA FOR RASPBERRY PI',
      price: 799,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/06/5MP-CAMERA-FOR-RASPBERRY-PI-1.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: true,
      description: '5MP camera module for Raspberry Pi. 2592x1944 pixel static images. Supports 1080p30, 720p60 and 640x480p90 video.'
    },
    {
      id: '69',
      name: '5MP Raspberry Pi 3/4 Model B Camera Module',
      price: 899,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/rpi-5mp-001.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '5MP camera module compatible with Raspberry Pi 3/4 Model B. High quality image sensor. Easy CSI connection.'
    },
    {
      id: '69a',
      name: '5MP Raspberry Pi Zero W Camera Module',
      price: 799,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/rpi-5mp-001.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '5MP camera module for Raspberry Pi Zero W. Compact design. High quality imaging. CSI connection.'
    },
    {
      id: '70',
      name: '7″ Official Raspberry Pi Display with Capacitive Touchscreen',
      price: 6499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/7inch.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Official 7 inch Raspberry Pi touchscreen display. 800x480 resolution. 10-finger capacitive touch. DSI connection.'
    },
    {
      id: '71',
      name: 'ADAPTOR PI4 TYPE C 15w',
      price: 599,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/06/ADAPTOR-PI4-TYPE-C-15w-1.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Official 15W USB-C power adapter for Raspberry Pi 4. 5.1V 3A output. Reliable power supply for stable operation.'
    },
    {
      id: '72',
      name: 'ADAPTOR PI5 TYPE C 27w',
      price: 799,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/06/ADAPTOR-PI5-TYPE-C-27w-1.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Official 27W USB-C power adapter for Raspberry Pi 5. 5.1V 5A output. High power delivery for demanding applications.'
    },
    {
      id: '73',
      name: 'Aluminum Heat Sink Case with Double Fans for Raspberry Pi 4B',
      price: 1299,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/Aluminum-Heat-Sink-Case-with-Double-Fans-for-Raspberry-Pi-4B-Black-1.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Premium aluminum case with dual cooling fans for Raspberry Pi 4B. Excellent cooling performance. Easy assembly. Access to all ports.'
    },
    {
      id: '73a',
      name: 'Gold Aluminum Heat Sink Case with Double Fans',
      price: 1399,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/Aluminum-Heat-Sink-Case-with-Double-Fans-for-Raspberry-Pi-4B-Black-1.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Premium gold aluminum case with dual cooling fans for Raspberry Pi. Excellent cooling. Full port access. Elegant design.'
    },
    {
      id: '74',
      name: 'Black ABS Case for Raspberry Pi 3/3+ with Cooling FAN Vent',
      price: 399,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/New-High-Quality-Black-ABS-Case-for-Raspberry-Pi-1.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Black ABS case for Raspberry Pi 3/3+. Built-in cooling fan vent. Snap-fit design. Access to all ports and GPIO.'
    },
    {
      id: '74a',
      name: 'Double Fans HS Set for Rpi4',
      price: 499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/3-in-1-heat-sink-set-for-raspberry-pi-3-800x800-1.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Double cooling fan heat sink set for Raspberry Pi 4. Enhanced thermal management. Easy installation. Quiet operation.'
    },
    {
      id: '75',
      name: 'DS3231 Real Time Clock Module 3.3V 5V Precise',
      price: 249,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/ds3231.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'DS3231 high precision real-time clock module. I2C interface. Battery backup. Temperature compensated crystal oscillator.'
    },
    {
      id: '76',
      name: 'HDMI Female to Mini HDMI Male Adapter',
      price: 149,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/HDMI-MINI.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'HDMI Female to Mini HDMI Male adapter. Gold-plated connectors. High-speed data transfer. Perfect for Raspberry Pi Zero.'
    },
    {
      id: '76a',
      name: 'Micro HDMI Male to HDMI Female Adapter',
      price: 149,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/HDMI-MINI.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Micro HDMI Male to HDMI Female adapter. Gold-plated contacts. Compatible with Raspberry Pi 4. 4K support.'
    },
    {
      id: '76b',
      name: 'HDMI Male to VGA Female Converter',
      price: 399,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/HDMI-MINI.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'HDMI Male to VGA Female converter. Connect Raspberry Pi to VGA displays. Supports 1080p resolution.'
    },
    {
      id: '76c',
      name: 'HDMI to VGA Converter with Audio',
      price: 499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/HDMI-MINI.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'HDMI to VGA converter with 3.5mm audio output. Full HD support. Plug and play. Perfect for older monitors.'
    },
    {
      id: '76d',
      name: 'BeagleBone Black REV C',
      price: 4999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'BeagleBoard',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'BeagleBone Black Rev C single board computer. 1GHz ARM Cortex-A8. 512MB DDR3 RAM. Ideal for embedded development.'
    },
    {
      id: '76e',
      name: 'MICRO HDMI TO HDMI CABLE',
      price: 249,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/HDMI-MINI.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Micro HDMI to HDMI cable. High-speed data transfer. Gold-plated connectors. Perfect for Raspberry Pi 4.'
    },
    {
      id: '76f',
      name: 'PCF8591 Module Analog to Digital Module Converter',
      price: 299,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/ds3231.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'PCF8591 8-bit A/D and D/A converter module. I2C interface. 4 analog inputs and 1 analog output.'
    },
    {
      id: '76g',
      name: 'P30/25 15KG Lifting Solenoid Electromagnet',
      price: 899,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '15KG lifting force solenoid electromagnet. 12V DC operation. Perfect for automation projects with Raspberry Pi.'
    },
    {
      id: '76h',
      name: 'Raspberry Pi 3 Case for Raspberry Pi 3 Model B, B+',
      price: 299,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/New-High-Quality-Black-ABS-Case-for-Raspberry-Pi-1.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Protective ABS case for Raspberry Pi 3 Model B and B+. Easy snap-fit assembly. Access to all ports.'
    },
    {
      id: '77a',
      name: 'Raspberry Pi 3 Model B+',
      price: 3999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Raspberry Pi 3 Model B+. 1.4GHz quad-core processor. 1GB RAM. Dual-band WiFi. Bluetooth 4.2.'
    },
    {
      id: '77b',
      name: 'Raspberry Pi 3-MODB-1GB Motherboard',
      price: 3499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Raspberry Pi 3 Model B motherboard. 1GB RAM. Quad-core 1.2GHz processor. WiFi and Bluetooth.'
    },
    {
      id: '77c',
      name: 'Raspberry Pi 4 Black Compact ABS Case with Fan Slot',
      price: 399,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/New-High-Quality-Black-ABS-Case-for-Raspberry-Pi-1.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Compact black ABS case for Raspberry Pi 4. Built-in fan slot for cooling. Easy assembly. Port access.'
    },
    {
      id: '77d',
      name: 'Raspberry Pi 4 Case-Black',
      price: 349,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/New-High-Quality-Black-ABS-Case-for-Raspberry-Pi-1.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Black protective case for Raspberry Pi 4. Durable ABS material. All ports accessible. Easy installation.'
    },
    {
      id: '77e',
      name: 'Raspberry Pi 4 Case-Red-White',
      price: 349,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/New-High-Quality-Black-ABS-Case-for-Raspberry-Pi-1.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Official red and white case for Raspberry Pi 4. Stylish design. Full port access. Easy snap-fit.'
    },
    {
      id: '77f',
      name: 'Raspberry Pi 4 Model B with 2 GB RAM',
      price: 4999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Raspberry Pi 4 Model B with 2GB RAM. 1.5GHz quad-core processor. Dual 4K display support. USB 3.0.'
    },
    {
      id: '77g',
      name: 'Raspberry Pi 4 Model-B with 1 GB RAM',
      price: 4499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Raspberry Pi 4 Model B with 1GB RAM. Entry-level option. 1.5GHz processor. Gigabit Ethernet.'
    },
    {
      id: '77h',
      name: 'Raspberry Pi 4 Model-B with 4 GB RAM',
      price: 6499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Raspberry Pi 4 Model B with 4GB RAM. Perfect for demanding applications. Dual 4K displays. USB 3.0 ports.'
    },
    {
      id: '77i',
      name: 'Raspberry Pi 4 Model-B with 8 GB RAM',
      price: 8999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Raspberry Pi 4 Model B with 8GB RAM. Maximum performance. Professional applications. 4K60 video decode.'
    },
    {
      id: '77j',
      name: 'Raspberry Pi 5MP 25mm Telephoto lens',
      price: 1299,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/06/5MP-CAMERA-FOR-RASPBERRY-PI-1.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '5MP telephoto lens with 25mm focal length. Ideal for long-distance photography with Raspberry Pi cameras.'
    },
    {
      id: '77k',
      name: 'RASPBERRY PI 8MP V2 CAMERA MODULE',
      price: 2499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/06/5MP-CAMERA-FOR-RASPBERRY-PI-1.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Official Raspberry Pi 8MP Camera Module V2. Sony IMX219 sensor. 1080p30 video. 3280x2464 stills.'
    },
    {
      id: '77l',
      name: 'Raspberry Pi Camera Module 3',
      price: 2999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/06/5MP-CAMERA-FOR-RASPBERRY-PI-1.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Latest Raspberry Pi Camera Module 3. 12MP sensor. HDR support. Improved low-light performance.'
    },
    {
      id: '77m',
      name: 'Raspberry Pi Camera Module 3 NoIR – Wide',
      price: 3299,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/06/5MP-CAMERA-FOR-RASPBERRY-PI-1.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Camera Module 3 NoIR Wide. No IR filter for night vision. 120° field of view. 12MP sensor.'
    },
    {
      id: '77n',
      name: 'Raspberry Pi Camera Module 3 Wide',
      price: 3199,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/06/5MP-CAMERA-FOR-RASPBERRY-PI-1.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Camera Module 3 with wide-angle lens. 120° FOV. 12MP sensor. Perfect for security and robotics.'
    },
    {
      id: '77o',
      name: 'Raspberry Pi Camera NOIR V2',
      price: 2699,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/06/5MP-CAMERA-FOR-RASPBERRY-PI-1.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '8MP Camera Module V2 NoIR. No infrared filter. Excellent for night vision applications. 1080p video.'
    },
    {
      id: '77p',
      name: 'Raspberry Pi Debug Probe',
      price: 1299,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Official Raspberry Pi Debug Probe. USB-to-SWD and UART bridge. Essential for development and debugging.'
    },
    {
      id: '77q',
      name: 'Raspberry Pi HQ Camera – M12 Mount',
      price: 6999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/06/5MP-CAMERA-FOR-RASPBERRY-PI-1.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'High Quality Camera with M12 mount. 12.3MP Sony sensor. Interchangeable M12 lenses. Professional quality.'
    },
    {
      id: '77r',
      name: 'Raspberry Pi M12 Lens, 12 Megapixel, 8mm, portrait lens 56 deg FOV',
      price: 1999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/06/5MP-CAMERA-FOR-RASPBERRY-PI-1.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'M12 mount lens, 8mm focal length. 56° field of view. 12MP resolution. Ideal for portrait photography.'
    },
    {
      id: '77s',
      name: 'Raspberry Pi Pi3/Pi3B+ Micro USB 12.75W Power Supply (White)',
      price: 599,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/06/ADAPTOR-PI4-TYPE-C-15w-1.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Official 12.75W power supply for Pi 3/3B+. Micro USB connector. 5.1V 2.5A output. White color.'
    },
    {
      id: '77t',
      name: 'Raspberry Pi Pico board',
      price: 499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Raspberry Pi Pico microcontroller board. RP2040 chip. 264KB RAM. 26 GPIO pins. Flexible I/O.'
    },
    {
      id: '77u',
      name: 'Raspberry PI PICO H',
      price: 599,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Raspberry Pi Pico H with pre-soldered headers. RP2040 microcontroller. Ready to use with breadboards.'
    },
    {
      id: '77v',
      name: 'Raspberry Pi Pico W',
      price: 699,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Raspberry Pi Pico W with wireless. 2.4GHz WiFi. Bluetooth coming soon. RP2040 microcontroller.'
    },
    {
      id: '77w',
      name: 'Raspberry Pi Sense HAT for the Pi 3/2/B+/A+ Model',
      price: 3499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/ds3231.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Sense HAT with LED matrix, gyroscope, accelerometer, magnetometer, temperature, humidity, and pressure sensors.'
    },
    {
      id: '77x',
      name: 'Raspberry Pi WS1132712 12MP 2.7MM Wide angle lens',
      price: 1799,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/06/5MP-CAMERA-FOR-RASPBERRY-PI-1.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Wide-angle lens 2.7mm focal length. 12MP resolution. 160° field of view. Perfect for surveillance.'
    },
    {
      id: '77y',
      name: 'Raspberry Pi Zero 2 W',
      price: 1699,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Raspberry Pi Zero 2 W. Quad-core processor. 512MB RAM. WiFi and Bluetooth. Compact form factor.'
    },
    {
      id: '77z',
      name: 'Raspberry Pi Zero W',
      price: 1299,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/40pin.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Raspberry Pi',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Raspberry Pi Zero W. Single-core processor. WiFi and Bluetooth. Ultra-compact. Perfect for IoT projects.'
    },
    {
      id: '78a',
      name: 'RJ45 CAT5 0.8M Ethernet Patch LAN Cable',
      price: 99,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/HDMI-MINI.webp',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '0.8 meter CAT5 Ethernet cable. RJ45 connectors. Fast and reliable network connection for Raspberry Pi.'
    },
    {
      id: '78b',
      name: 'SanDisk Micro SD/SDHC 16GB Class 10 Memory Card',
      price: 399,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/ds3231.jpg',
      category: 'Raspberry Pi',
      subcategory: 'RPI Accessories',
      brand: 'SanDisk',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'SanDisk 16GB microSD card. Class 10 speed. Ideal for Raspberry Pi OS. Reliable storage solution.'
    },
    // Drone Transmitter and Receiver Products
    {
      id: '77',
      name: 'CT6B 2.4GHz 6CH Transmitter with FS-R6B Receiver',
      price: 2499,
      image: '/assets/images/products/ct6b-transmitter-fs-r6b-receiver.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'FlySky',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'CT6B 2.4GHz 6 channel transmitter with FS-R6B receiver. Perfect for RC drones and aircraft.'
    },
    {
      id: '78',
      name: 'FS-i6 X 2.4GHz 10CH Transmitter',
      price: 3999,
      image: '/assets/images/products/fs-i6-x.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'FlySky',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'FS-i6X 10 channel transmitter with LCD display. Advanced features for professional pilots.'
    },
    {
      id: '79',
      name: 'FS-IA6B 2.4GHz 6CH PPM Output Receiver',
      price: 899,
      image: '/assets/images/products/fs-ia6b-receiver.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'FlySky',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'FS-IA6B 6 channel receiver with iBus port and PPM output. Compact and reliable.'
    },
    {
      id: '80',
      name: 'FS-SM100 USB Simulator Cable',
      price: 599,
      image: '/assets/images/products/fs-sm100-simulator-cable.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'FlySky',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'USB simulator cable for FlySky transmitters. Practice flying with RC simulators.'
    },
    {
      id: '81',
      name: 'FS-i6 2.4G 6CH PPM RC Transmitter With FS-iA6B Receiver',
      price: 3299,
      image: '/assets/images/products/fs-i6-transmitter-ia6b-receiver.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'FlySky',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'FS-i6 6 channel transmitter with FS-iA6B receiver. Complete radio system for drones.'
    },
    {
      id: '82',
      name: 'FS-I6S 10CH Transmitter with FS-IA10B Receiver',
      price: 4999,
      image: '/assets/images/products/fs-i6s-ia10b.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'FlySky',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'FS-I6S 10 channel transmitter with FS-IA10B 10 channel receiver. Professional grade system.'
    },
    {
      id: '83',
      name: 'FS-IA10B 10CH RC Receiver',
      price: 1299,
      image: '/assets/images/products/fs-ia10b-receiver.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'FlySky',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'FS-IA10B 10 channel receiver with iBus output. Compatible with FlySky transmitters.'
    },
    {
      id: '84',
      name: 'FS-R6B FlySky 2.4GHz 6CH Receiver',
      price: 799,
      image: '/assets/images/products/fs-r6b-receiver.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'FlySky',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'FS-R6B 6 channel receiver. Ultra compact design for space-constrained builds.'
    },
    {
      id: '85',
      name: 'FS-SM600 6CH USB Flight Simulator',
      price: 899,
      image: '/assets/images/products/fs-sm600-simulator-remote.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'FlySky',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'FS-SM600 USB flight simulator cable. 6 channel support for RC simulators.'
    },
    {
      id: '86',
      name: 'FS-TH9X 2.4GHz 9CH Upgrade Transmitter',
      price: 5999,
      image: '/assets/images/products/fs-th9x-transmitter-ia10b-receiver.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'FlySky',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'FS-TH9X 9 channel transmitter with backlit LCD. Advanced programming capabilities.'
    },
    {
      id: '87',
      name: 'H16 RC Skydroid Remote Controller',
      price: 12999,
      image: '/assets/images/products/h16-rc-skydroid.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'Skydroid',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'H16 RC Skydroid remote controller with built-in display. FPV-ready system.'
    },
    {
      id: '88',
      name: 'HGLRC M80 Pro GPS Module',
      price: 2999,
      image: '/assets/images/products/hglrc-m80-pro-gps.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'HGLRC',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'HGLRC M80 Pro GPS module with compass. High precision positioning for drones.'
    },
    {
      id: '89',
      name: 'RADIO MASTER TX16S MKII With ELRS Nano Receiver',
      price: 24999,
      image: '/assets/images/products/radiomaster-tx16s-mkii-elrs.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'RadioMaster',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'RadioMaster TX16S MKII with ExpressLRS nano receiver. Top-tier radio system for FPV.'
    },
    {
      id: '90',
      name: 'Radiomaster Pocket Radio Controller CC2500',
      price: 8999,
      image: '/assets/images/products/radiomaster-pocket-cc2500.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'RadioMaster',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Radiomaster Pocket compact radio controller with CC2500 module. Ultra-portable design.'
    },
    {
      id: '91',
      name: 'RP1 ExpressLRS Receiver',
      price: 1499,
      image: '/assets/images/products/rp1-elss-receiver.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'RP1 ExpressLRS receiver. Long range, low latency communication for FPV drones.'
    },
    {
      id: '92',
      name: 'SKYDROID H12 Inbuilt Display Remote Control with Camera',
      price: 18999,
      image: '/assets/images/products/skydroid-h12-remote-camera.jpg',
      category: 'Drone Transmitter and Receiver',
      brand: 'Skydroid',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'SKYDROID H12 remote with built-in display and camera. All-in-one FPV solution.'
    },
    // Bonka Battery Products
    {
      id: '93',
      name: 'BONKA 11.1V 10000mAh 25C 3S LiPo Battery',
      price: 4999,
      image: '/assets/images/products/bonka-11-1v-10000mah-25c-3s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'High capacity 11.1V 10000mAh 3S LiPo battery with 25C discharge rate.'
    },
    {
      id: '94',
      name: 'BONKA 11.1V 1000mAh 35C 3S LiPo Battery',
      price: 799,
      image: '/assets/images/products/bonka-11-1v-1000mah-35c-3s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Compact 11.1V 1000mAh 3S LiPo battery with 35C discharge rate.'
    },
    {
      id: '95',
      name: 'BONKA 11.1V 2200mAh 35C 3S LiPo Battery',
      price: 1299,
      image: '/assets/images/products/bonka-11-1v-2200mah-35c-3s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Popular 11.1V 2200mAh 3S LiPo battery with 35C discharge rate for FPV drones.'
    },
    {
      id: '96',
      name: 'BONKA 11.1V 3300mAh 35C 3S LiPo Battery',
      price: 1799,
      image: '/assets/images/products/bonka-11-1v-3300mah-35c-3s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Mid-range 11.1V 3300mAh 3S LiPo battery with 35C discharge rate.'
    },
    {
      id: '97',
      name: 'BONKA 11.1V 4200mAh 35C 3S LiPo Battery',
      price: 2299,
      image: '/assets/images/products/bonka-11-1v-4200mah-35c-3s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '11.1V 4200mAh 3S LiPo battery with 35C discharge rate for long flight times.'
    },
    {
      id: '98',
      name: 'BONKA 11.1V 8000mAh 25C 3S LiPo Battery',
      price: 3999,
      image: '/assets/images/products/bonka-11-1v-8000mah-25c-3s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'High capacity 11.1V 8000mAh 3S LiPo battery with 25C discharge rate.'
    },
    {
      id: '99',
      name: 'BONKA 11.1V 1500mAh 75C 3S LiPo Battery',
      price: 1499,
      image: '/assets/images/products/bonka-11-1v-1500mah-75c-3s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '11.1V 1500mAh 3S LiPo battery with high 75C discharge rate for racing drones.'
    },
    {
      id: '100',
      name: 'BONKA 11.1V 1500mAh 35C 3S LiPo Battery',
      price: 999,
      image: '/assets/images/products/bonka-11-1v-1500mah-35c-3s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '11.1V 1500mAh 3S LiPo battery with 35C discharge rate for small drones.'
    },
    {
      id: '101',
      name: 'BONKA 11.1V 5200mAh 65C 3S LiPo Battery',
      price: 3299,
      image: '/assets/images/products/bonka-11-1v-5200mah-65c-3s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '11.1V 5200mAh 3S LiPo battery with high 65C discharge rate for power-hungry setups.'
    },
    {
      id: '102',
      name: 'BONKA 11.1V 5200mAh 35C 3S LiPo Battery',
      price: 2799,
      image: '/assets/images/products/bonka-11-1v-5200mah-35c-3s-polymer.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '11.1V 5200mAh 3S LiPo battery with 35C discharge rate for extended flights.'
    },
    {
      id: '103',
      name: 'BONKA 14.8V 10000mAh 45C 4S LiPo Battery',
      price: 6999,
      image: '/assets/images/products/bonka-14-8v-10000mah-45c-4s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'High capacity 14.8V 10000mAh 4S LiPo battery with 45C discharge rate.'
    },
    {
      id: '104',
      name: 'BONKA 14.8V 1500mAh 75C 4S LiPo Battery',
      price: 1999,
      image: '/assets/images/products/bonka-14-8v-1500mah-75c-4s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '14.8V 1500mAh 4S LiPo battery with high 75C discharge rate for racing.'
    },
    {
      id: '105',
      name: 'BONKA 14.8V 2200mAh 35C 4S LiPo Battery',
      price: 1799,
      image: '/assets/images/products/bonka-14-8v-2200mah-35c-4s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '14.8V 2200mAh 4S LiPo battery with 35C discharge rate for FPV drones.'
    },
    {
      id: '106',
      name: 'BONKA 14.8V 4200mAh 35C 4S LiPo Battery',
      price: 2999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/Bonka-14.8V-4200mAh.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '14.8V 4200mAh 4S LiPo battery with 35C discharge rate for long flights.'
    },
    {
      id: '107',
      name: 'BONKA 14.8V 5200mAh 35C 4S LiPo Battery',
      price: 3499,
      image: '/assets/images/products/bonka-14-8v-5200mah-35c-4s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '14.8V 5200mAh 4S LiPo battery with 35C discharge rate for extended flight time.'
    },
    {
      id: '108',
      name: 'BONKA 7.4V 1500mAh 35C 2S LiPo Battery',
      price: 699,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/Bonka-7.4V-1500mAh.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Compact 7.4V 1500mAh 2S LiPo battery with 35C discharge rate for small drones.'
    },
    {
      id: '109',
      name: 'BONKA 7.4V 2200mAh 35C 2S LiPo Battery',
      price: 899,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/Bonka-7.4V-2200mAh.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '7.4V 2200mAh 2S LiPo battery with 35C discharge rate for RC cars and planes.'
    },
    {
      id: '110',
      name: 'BONKA 22.2V 1300mAh 100C 6S LiPo Battery',
      price: 2999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/Bonka-22.2V-1300mAh.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '22.2V 1300mAh 6S LiPo battery with extreme 100C discharge rate for racing.'
    },
    {
      id: '111',
      name: 'BONKA 22.2V 1400mAh 130C 6S FPV U2 Series',
      price: 3499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/02/22.V-1400-1.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: true,
      description: '22.2V 1400mAh 6S FPV U2 Series battery with 130C discharge rate for competitive racing.'
    },
    {
      id: '112',
      name: 'BONKA 22.2V 4500mAh 120C 6S FPV U2 Series',
      price: 5999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/Bonka-22.2V-4500mAh.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: true,
      description: '22.2V 4500mAh 6S FPV U2 Series battery with 120C discharge rate for power and endurance.'
    },
    {
      id: '113',
      name: 'BONKA 22.2V 5200mAh 35C 6S LiPo Battery',
      price: 4999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/Bonka-22.2V-5200mAh.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '22.2V 5200mAh 6S LiPo battery with 35C discharge rate for large drones.'
    },
    {
      id: '114',
      name: 'BONKA 22.2V 8000mAh 35C 6S LiPo Battery',
      price: 6499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/Bonka-22.2V-8000mAh.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '22.2V 8000mAh 6S LiPo battery with 35C discharge rate for extended flight times.'
    },
    {
      id: '115',
      name: 'BONKA 22.2V 16000mAh 25C 6S LiPo Battery',
      price: 9999,
      image: '/assets/images/products/tattu-22-2v-16000mah-15c-6s.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Ultra high capacity 22.2V 16000mAh 6S LiPo battery with 25C discharge rate.'
    },
    {
      id: '116',
      name: 'BONKA 16000mAh 5C 6S 22.2V Semi Solid Lithium Ion',
      price: 11999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/Bonka-16000mAh-SemiSolid.jpg',
      category: 'Bonka',
      brand: 'BONKA',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '16000mAh 6S 22.2V semi-solid lithium-ion battery. Long cycle life and stable discharge.'
    },
    {
      id: '117',
      name: 'TATTU 22.2V 16000mAh 15C 6S LiPo Battery',
      price: 12999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/Tattu-22.2V-16000mAh.jpg',
      category: 'Bonka',
      brand: 'TATTU',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'TATTU 22.2V 16000mAh 6S LiPo battery with 15C discharge rate for heavy lift drones.'
    },
    {
      id: '118',
      name: 'CHINESE LiPo Rechargeable Battery 11.1V 2200mAh',
      price: 599,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/Chinese-LiPo-11.1V.jpg',
      category: 'Bonka',
      brand: 'Generic',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Budget-friendly 11.1V 2200mAh 3S LiPo battery for hobbyists and beginners.'
    },
    // ACEBOTT Products
    {
      id: '2001',
      name: '3-In-1 ACEBOTT ESP32 STEM School Smart Home Education Kit – LV 1',
      price: 4599,
      image: '/assets/images/products/3in1-acebott-esp32-smart-home-lv1.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'The ACEBOTT STEM School Smart Home Kit Education Solution Series with Teaching Resource for Arduino/ESP32 is ideal for children aged 8 and up who want to learn programming and electronics. It uses the ESP32 controller board to make it simple for beginners to start coding. With this kit, kids can build and explore smart home projects like smart lights, entertainment systems, and temperature control. It\'s a fun way to learn and get creative.',
      aboutProduct: 'The kit also comes with a clear, step-by-step guide and 90 minutes of helpful teaching materials. Made from safe, eco-friendly plywood, it\'s easy to put together and can even be colored for a personal touch. It\'s a great choice for schools or as a special gift for young learners, helping them develop important skills while having fun.'
    },
    {
      id: '2002',
      name: '5-in-1 ACEBOTT ESP32 STEM School Smart Home Kit – Level 2',
      price: 5999,
      image: '/assets/images/products/5in1-acebott-esp32-smart-home-lv2.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Ideal for kids 8 and up with easy programming using ESP32. Includes five projects: pet feeder, drying rack, access control, alarm, and watering system. Covers basic to advanced smart home tech.'
    },
    {
      id: '2003',
      name: 'ACEBOTT Electric Scoring & Shooting Target – QD006',
      price: 2499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2025/03/QD006-750x1000-1-e1740816405693.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'This fun target is great for practice with your robot. It has an electric scoring system that keeps track of your hits and gives instant feedback. Perfect for adding some fun to your robotics projects.'
    },
    {
      id: '2004',
      name: 'ACEBOTT ESP32 4WD Smart Robot Car Kit for Arduino',
      price: 7999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2025/03/ADQ002-1.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Beginner-Friendly Smart Robot Car Kit: Powered by the ESP32 controller, this robot kit is perfect for beginners with 16 easy-to-follow tutorials on programming and electronics. (Batteries not included.)',
      aboutProduct: 'Expandable & Customizable: Supports up to 14 expansion packs, including a camera, robotic arm, and solar panels for endless learning possibilities. (Expansion packs sold separately). Omnidirectional Mecanum Wheels: Move in any direction—forward, sideways, and diagonally—with 360° movement, ideal for mastering complex maneuvers. STEM Education & Fun Control: Ideal for teaching programming and robotics, and can be controlled via IR remote or app, making it perfect for aspiring engineers.'
    },
    {
      id: '2005',
      name: 'ACEBOTT ESP32 5-DOF Robot Arm Kit Expansion Pack',
      price: 6499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2025/03/ADQ007-1.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: '5 Degree of Freedom robot arm kit expansion pack for ESP32. Learn about servo motors, inverse kinematics, and robotic arm control. Great for advanced robotics projects.'
    },
    {
      id: '2006',
      name: 'ACEBOTT ESP32 Camera Expansion Pack for Smart Robot Car kit',
      price: 3499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2025/03/ADQ002-Camera-Pack.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Add vision capabilities to your ESP32 robot car with this camera expansion pack. Enables computer vision projects, line following, and object detection.'
    },
    {
      id: '2007',
      name: 'ACEBOTT ESP32 Programmable Robot Arm Kit for Arduino',
      price: 8999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2025/03/ADQ007-Robot-Arm.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Complete programmable robot arm kit with ESP32 controller. Learn robotics, programming, and mechanical engineering. Includes detailed tutorials and example code.'
    },
    {
      id: '2008',
      name: 'ACEBOTT ESP32 Smart Farm IoT Starter Kit with Arduino IDE/ACE Code(Scratch)',
      price: 5499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2025/03/Smart-Farm-IoT-Kit.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Learn IoT and smart farming with this comprehensive kit. Monitor soil moisture, temperature, humidity, and automate irrigation. Supports Arduino IDE and visual programming with Scratch.'
    },
    {
      id: '2009',
      name: 'ACEBOTT ESP32 Smart Home IOT Starter Kit with Arduino IDE/ACE Code(Scratch)',
      price: 5299,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2025/03/Smart-Home-IoT-Kit.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Build your own smart home automation system with ESP32. Control lights, fans, and appliances remotely. Learn IoT programming with Arduino IDE or visual Scratch coding.'
    },
    {
      id: '2010',
      name: 'ACEBOTT ESP32 Tank Robot Car Expansion Pack – QD004',
      price: 4999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2025/03/QD004-Tank-Robot.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Transform your robot car into a tank with continuous track system. Better traction and off-road capabilities. Expansion pack for ACEBOTT robot car kits.'
    },
    {
      id: '2011',
      name: 'ACEBOTT ESP8266 Quadruped Bionic Spider Robot',
      price: 7499,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2025/03/Spider-Robot.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Build a walking spider robot with ESP8266 controller. Features 4 legs with 3 servos each for realistic movement. Learn about gait programming and inverse kinematics.'
    },
    {
      id: '2012',
      name: 'ACEBOTT Smart Home IoT Starter Kit with Arduino',
      price: 4799,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2025/03/Arduino-Smart-Home.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Arduino-based smart home IoT starter kit for beginners. Build home automation projects with sensors and actuators. Includes comprehensive tutorials and project guides.'
    },
    {
      id: '2013',
      name: 'QE027 Intelligent Transportation LV 1 Tutorial',
      price: 3999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2025/03/QE027-Transportation.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Learn about intelligent transportation systems with this educational kit. Build traffic light controllers, parking systems, and smart road infrastructure models.'
    },
    {
      id: '2014',
      name: 'Smart Factory education kit Lv 1',
      price: 6999,
      image: 'https://www.agarwalelectronics.com/wp-content/uploads/2025/03/Smart-Factory-Kit.jpg',
      category: 'DIY Kits',
      brand: 'ACEBOTT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Educational kit for learning about Industry 4.0 and smart manufacturing. Build automated production lines, conveyor systems, and quality control stations.'
    },
    // 3D printers parts category
    {
      id: '3001',
      name: '1000 MM long Chrome Plated Smooth Rod Diameter 8 MM',
      price: 450,
      image: 'assets/images/products/placeholder.jpg',
      category: '3D printers parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '1000mm chrome plated smooth rod with 8mm diameter for 3D printers'
    },
    {
      id: '3002',
      name: '12V 10A SMPS - 120W - DC Metal Power Supply',
      price: 650,
      image: 'assets/images/products/placeholder.jpg',
      category: '3D printers parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '12V 10A switching mode power supply for 3D printers'
    },
    {
      id: '3003',
      name: '12V 30A SMPS - 360W - DC Metal Power Supply',
      price: 1250,
      image: 'assets/images/products/placeholder.jpg',
      category: '3D printers parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '12V 30A switching mode power supply for 3D printers'
    },
    {
      id: '3004',
      name: '2 Meter GT2 Timing Belt + 2Pcs of GT2 pulley (20 teeth)',
      price: 280,
      image: 'assets/images/products/placeholder.jpg',
      category: '3D printers parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '2 meter GT2 timing belt with 2 pulleys for 3D printers'
    },
    {
      id: '3005',
      name: '2004 LCD Display RepRapDiscount Smart Controller with Adapter',
      price: 550,
      image: 'assets/images/products/placeholder.jpg',
      category: '3D printers parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '2004 LCD display controller for 3D printers'
    },
    {
      id: '3006',
      name: '2020 aluminum extrusion',
      price: 120,
      image: 'assets/images/products/placeholder.jpg',
      category: '3D printers parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '2020 aluminum extrusion for 3D printer frames'
    },
    {
      id: '3007',
      name: '3000M GT2 Width 6mm Black Open Timing Belt For 3D Printer',
      price: 180,
      image: 'assets/images/products/placeholder.jpg',
      category: '3D printers parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '3000mm GT2 timing belt for 3D printers'
    },
    {
      id: '3008',
      name: '300mm Trapezoidal 4 Start Lead Screw 8mm Thread',
      price: 220,
      image: 'assets/images/products/placeholder.jpg',
      category: '3D printers parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '300mm lead screw for 3D printer Z-axis'
    },
    {
      id: '3009',
      name: '3D Printer Controller Board RAMPS 1.4 Arduino Mega Shield RepRap Prusa Model',
      price: 750,
      image: 'assets/images/products/placeholder.jpg',
      category: '3D printers parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'RAMPS 1.4 controller board for RepRap 3D printers'
    },
    {
      id: '3010',
      name: '500 MM long Chrome Plated Smooth Rod Diameter 8 MM',
      price: 250,
      image: 'assets/images/products/placeholder.jpg',
      category: '3D printers parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '500mm chrome plated smooth rod with 8mm diameter'
    },
    // AC MOTOR category
    {
      id: '4001',
      name: '60KTYZ CLAW POLE PERMANENT MAGNET AC SYNCHRONOUS MOTOR',
      price: 450,
      image: 'assets/images/products/placeholder.jpg',
      category: 'AC MOTOR',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '60KTYZ AC synchronous motor with permanent magnet'
    },
    {
      id: '4002',
      name: 'AC220V 14W 60KTYZ Permanent Magnet Synchronous Motor 2.5RPM/MIN',
      price: 550,
      image: 'assets/images/products/placeholder.jpg',
      category: 'AC MOTOR',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'AC220V 14W synchronous motor with 2.5 RPM'
    },
    // Accessories category
    {
      id: '5001',
      name: '1.27 MM MALE BERG',
      price: 20,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Accessories',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '1.27mm male berg connector strip'
    },
    {
      id: '5002',
      name: '1.27mm 2x40 Pin Male Double Row Header Strip',
      price: 45,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Accessories',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '1.27mm double row male header strip'
    },
    {
      id: '5003',
      name: '1.27MM BERG FEMALE',
      price: 25,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Accessories',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '1.27mm female berg connector strip'
    },
    {
      id: '5004',
      name: '1x40 Berg Strip Male Connector BIG',
      price: 15,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Accessories',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '1x40 male berg strip connector'
    },
    {
      id: '5005',
      name: '10 AWG SILICONE WIRE ( BLACK )',
      price: 120,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Accessories',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '10 AWG black silicone wire per meter'
    },
    {
      id: '5006',
      name: '10 AWG SILICONE WIRE ( RED )',
      price: 120,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Accessories',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '10 AWG red silicone wire per meter'
    },
    {
      id: '5007',
      name: '12 AWG SILICONE WIRE ( RED )',
      price: 100,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Accessories',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '12 AWG red silicone wire per meter'
    },
    {
      id: '5008',
      name: '12 AWG SILICONE WIRE (BLACK )',
      price: 100,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Accessories',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '12 AWG black silicone wire per meter'
    },
    {
      id: '5009',
      name: '14 AWG SILICONE WIRE ( BLACK )',
      price: 85,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Accessories',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '14 AWG black silicone wire per meter'
    },
    {
      id: '5010',
      name: '14 AWG SILICONE WIRE ( RED)',
      price: 85,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Accessories',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '14 AWG red silicone wire per meter'
    },
    // Agriculture Drone Parts category
    {
      id: '6001',
      name: 'Centrifugal Nozzle Spray System for Agriculture Drone',
      price: 2500,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Agriculture Drone Parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Centrifugal spray nozzle system for agriculture drones'
    },
    {
      id: '6002',
      name: 'Drone Nozzle 110 Degree 20mm Double',
      price: 1800,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Agriculture Drone Parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: true,
      description: '110 degree double nozzle for drone spraying'
    },
    {
      id: '6003',
      name: 'Drone Spray Nozzle 3810',
      price: 1200,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Agriculture Drone Parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Spray nozzle 3810 for agriculture drones'
    },
    {
      id: '6004',
      name: 'Drone Spray NOZZLE DOUBLE HEAD',
      price: 1500,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Agriculture Drone Parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Double head spray nozzle for drones'
    },
    {
      id: '6005',
      name: 'EFT E410P 10L 4 Axis Agricultural Drone Frame',
      price: 45000,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'EFT',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'EFT E410P 10L agriculture drone frame'
    },
    {
      id: '6006',
      name: 'H16 RC Skydroid',
      price: 3500,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'SKYDROID',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'H16 RC remote control by Skydroid'
    },
    {
      id: '6007',
      name: 'Hobbywing Pump 5L Kit with Nozzle',
      price: 8500,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Agriculture Drone Parts',
      brand: 'Hobbywing',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Hobbywing 5L pump kit with nozzle for agriculture drones'
    },
    {
      id: '6008',
      name: 'Jiyi K++ V2 Flight Controller Kit',
      price: 15000,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Agriculture Drone Parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: true,
      description: 'Jiyi K++ V2 flight controller for agriculture drones'
    },
    {
      id: '6009',
      name: 'Jiyi K3 Apro Flight Controller Kit',
      price: 18000,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Agriculture Drone Parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Jiyi K3 Apro flight controller for agriculture drones'
    },
    {
      id: '6010',
      name: 'PROP 2388 CCW-CW - Without Pad Set of 2 Compatible',
      price: 1200,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Agriculture Drone Parts',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '2388 propeller set CCW-CW compatible'
    },
    // ANTENNA category
    {
      id: '7001',
      name: '150mm FrSky Receiver Antenna new version IPEX4',
      price: 180,
      image: 'assets/images/products/placeholder.jpg',
      category: 'ANTENNA',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '150mm FrSky receiver antenna with IPEX4 connector'
    },
    {
      id: '7002',
      name: '15cm 3DBI GSM/GPRS/3G PCB Antenna with IPEX Connector',
      price: 120,
      image: 'assets/images/products/placeholder.jpg',
      category: 'ANTENNA',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '15cm 3DBI GSM/GPRS/3G PCB antenna'
    },
    {
      id: '7003',
      name: '2.4G 150mm Receiver Antenna regular',
      price: 80,
      image: 'assets/images/products/placeholder.jpg',
      category: 'ANTENNA',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '2.4GHz 150mm receiver antenna'
    },
    {
      id: '7004',
      name: '2.4GHz 3.2dBi RP-SMA female Omni Antenna for WiFi',
      price: 250,
      image: 'assets/images/products/placeholder.jpg',
      category: 'ANTENNA',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '2.4GHz 3.2dBi WiFi antenna with RP-SMA female connector'
    },
    {
      id: '7005',
      name: '2.4GHz 5dBi Omni Wi-Fi Booster SMA Male Antenna',
      price: 320,
      image: 'assets/images/products/placeholder.jpg',
      category: 'ANTENNA',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '2.4GHz 5dBi WiFi booster antenna'
    },
    {
      id: '7006',
      name: '2400 - 2483 MHz 2dBi Gain Rubber Duck Antenna',
      price: 150,
      image: 'assets/images/products/placeholder.jpg',
      category: 'ANTENNA',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '2.4GHz 2dBi rubber duck antenna'
    },
    {
      id: '7007',
      name: '2400 - 2483 MHz 3dBi Gain Rubber Duck Antenna',
      price: 180,
      image: 'assets/images/products/placeholder.jpg',
      category: 'ANTENNA',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '2.4GHz 3dBi rubber duck antenna'
    },
    {
      id: '7008',
      name: '433 MHz 2.5dbi Omnidirectional folding',
      price: 200,
      image: 'assets/images/products/placeholder.jpg',
      category: 'ANTENNA',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '433MHz omnidirectional folding antenna'
    },
    {
      id: '7009',
      name: '433 Mhz 3dbi magnetic mount',
      price: 280,
      image: 'assets/images/products/placeholder.jpg',
      category: 'ANTENNA',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '433MHz magnetic mount antenna'
    },
    {
      id: '7010',
      name: '433mhz 3dbi antenna for lora',
      price: 220,
      image: 'assets/images/products/placeholder.jpg',
      category: 'ANTENNA',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '433MHz antenna for LoRa modules'
    },
    // Audio Jack category
    {
      id: '8001',
      name: 'Audio Jack',
      price: 15,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Audio Jack',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: '3.5mm audio jack connector'
    },
    {
      id: '8002',
      name: 'BLUETOOTH FOR AUDIO',
      price: 250,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Audio Jack',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Bluetooth module for audio applications'
    },
    {
      id: '8003',
      name: 'Condensor Mic',
      price: 120,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Audio Jack',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'Condenser microphone module'
    },
    {
      id: '8004',
      name: 'CSR8635 Bluetooth 4.0 Stereo Audio Receive Board Speaker Module',
      price: 350,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Audio Jack',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'CSR8635 Bluetooth 4.0 audio receiver module'
    },
    {
      id: '8005',
      name: 'DC12-24V TPA3116D2 2.1 Channel Digital Subwoofer Power Amplifier Board',
      price: 550,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Audio Jack',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'TPA3116D2 2.1 channel audio amplifier'
    },
    {
      id: '8006',
      name: 'HDMI TO VGA WITH AUDIO',
      price: 420,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Audio Jack',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'HDMI to VGA converter with audio support'
    },
    {
      id: '8007',
      name: 'PAM 8406',
      price: 80,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Audio Jack',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'PAM8406 audio amplifier module'
    },
    {
      id: '8008',
      name: 'PAM 8610',
      price: 120,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Audio Jack',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'PAM8610 audio amplifier module'
    },
    {
      id: '8009',
      name: 'PAM8403 5VT',
      price: 65,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Audio Jack',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'PAM8403 5V audio amplifier'
    },
    {
      id: '8010',
      name: 'PAM8610 with volume control BIG',
      price: 150,
      image: 'assets/images/products/placeholder.jpg',
      category: 'Audio Jack',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: 'PAM8610 amplifier with volume control'
    },
    {
      id: '8011',
      name: '1.27 MM MALE BERG',
      price: 0,
      image: '/assets/images/products/1-27-mm-male-berg.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8012',
      name: '1.27mm 2×40 Pin Male Double Row Header Strip',
      price: 0,
      image: '/assets/images/products/1-27mm-2-40-pin-male-double-row-header-strip.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8013',
      name: '1.27MM BERG FEMALE',
      price: 0,
      image: '/assets/images/products/1-27mm-berg-female.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8014',
      name: '1×40 Berg Strip Male Connector BIG',
      price: 0,
      image: '/assets/images/products/1-40-berg-strip-male-connector-big.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8015',
      name: '2 Pin 3.81mm Pitch Pluggable Terminal Block',
      price: 0,
      image: '/assets/images/products/2-pin-3-81mm-pitch-pluggable-terminal-block.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8016',
      name: '2.54mm 1×40 Pin Female Single Row Header Strip',
      price: 0,
      image: '/assets/images/products/2-54mm-1-40-pin-female-single-row-header-strip.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8017',
      name: '2.54mm 2×40 Berg Strip Right Angle Female Connector',
      price: 0,
      image: '/assets/images/products/2-54mm-2-40-berg-strip-right-angle-female-connector.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8018',
      name: '2.54MM pitch 40 Pin Male Double Row',
      price: 0,
      image: '/assets/images/products/2-54mm-pitch-40-pin-male-double-row.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8019',
      name: '3.81mm Combiconn MF Vertical 3pin',
      price: 0,
      image: '/assets/images/products/3-81mm-combiconn-mf-vertical-3pin.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8020',
      name: '3PIN BERG HOUSING',
      price: 0,
      image: '/assets/images/products/3pin-berg-housing.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8021',
      name: '40X1 BERG MALE 90 DEGREE',
      price: 0,
      image: '/assets/images/products/40x1-berg-male-90-degree.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8022',
      name: '8-PIN MALE RIGHT ANGLE',
      price: 0,
      image: '/assets/images/products/8-pin-male-right-angle.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8023',
      name: '8pin Combiconn M/f 3.81MM 90D',
      price: 0,
      image: '/assets/images/products/8pin-combiconn-m-f-3-81mm-90d.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8024',
      name: 'Amass MT30 3 Pole PAIR',
      price: 0,
      image: '/assets/images/products/amass-mt30-3-pole-pair.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8025',
      name: 'Amass XT60E-M Plug Connector',
      price: 0,
      image: '/assets/images/products/amass-xt60e-m-plug-connector.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8026',
      name: 'Amass XT90 Male/Female Connector',
      price: 0,
      image: '/assets/images/products/amass-xt90-male-female-connector.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8027',
      name: 'Anderson Connector 175A',
      price: 0,
      image: '/assets/images/products/anderson-connector-175a.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8028',
      name: 'Anderson Connector 50a Chn',
      price: 0,
      image: '/assets/images/products/anderson-connector-50a-chn.jpg',
      category: 'Accessories',
      subcategory: 'Connectors',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8029',
      name: 'SO/MSOP/TSSOP/SOIC/ to Dip8 Board PCB',
      price: 0,
      image: '/assets/images/products/so-msop-tssop-soic-to-dip8-board-pcb.jpg',
      category: 'Accessories',
      subcategory: 'DIP Converters',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8030',
      name: 'TQFP-0.8MM',
      price: 0,
      image: '/assets/images/products/tqfp-0-8mm.jpg',
      category: 'Accessories',
      subcategory: 'DIP Converters',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8031',
      name: 'TYPE C TO DIP CONVERTER',
      price: 0,
      image: '/assets/images/products/type-c-to-dip-converter.jpg',
      category: 'Accessories',
      subcategory: 'DIP Converters',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8032',
      name: 'Arduino Uno Kit AKX00037',
      price: 0,
      image: '/assets/images/products/arduino-uno-kit-akx00037.jpg',
      category: 'Accessories',
      subcategory: 'IOT',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8033',
      name: 'Raspberry Pi 3 IoT Set',
      price: 0,
      image: '/assets/images/products/raspberry-pi-3-iot-set.jpg',
      category: 'Accessories',
      subcategory: 'IOT',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8034',
      name: '1x1 Matrix Membrane keypad',
      price: 0,
      image: '/assets/images/products/1x1-matrix-membrane-keypad.jpg',
      category: 'Accessories',
      subcategory: 'Keypad',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8035',
      name: '4×3 Matrix membrane keypad',
      price: 0,
      image: '/assets/images/products/4-3-matrix-membrane-keypad.jpg',
      category: 'Accessories',
      subcategory: 'Keypad',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8036',
      name: '4x1 Matrix Membrane keypad',
      price: 0,
      image: '/assets/images/products/4x1-matrix-membrane-keypad.jpg',
      category: 'Accessories',
      subcategory: 'Keypad',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8037',
      name: '4x3 Keypad Black ( Low)',
      price: 0,
      image: '/assets/images/products/4x3-keypad-black-low.jpg',
      category: 'Accessories',
      subcategory: 'Keypad',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8038',
      name: '4x4 Matrix Membrane keypad',
      price: 0,
      image: '/assets/images/products/4x4-matrix-membrane-keypad.jpg',
      category: 'Accessories',
      subcategory: 'Keypad',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8039',
      name: '4x5 Matrix Membrane keypad',
      price: 0,
      image: '/assets/images/products/4x5-matrix-membrane-keypad.jpg',
      category: 'Accessories',
      subcategory: 'Keypad',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8040',
      name: '10 AWG SILICONE WIRE ( BLACK )',
      price: 0,
      image: '/assets/images/products/10-awg-silicone-wire-black.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8041',
      name: '10 AWG SILICONE WIRE ( RED )',
      price: 0,
      image: '/assets/images/products/10-awg-silicone-wire-red.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8042',
      name: '12 AWG SILICONE WIRE ( RED )',
      price: 0,
      image: '/assets/images/products/12-awg-silicone-wire-red.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8043',
      name: '12 AWG SILICONE WIRE (BLACK )',
      price: 0,
      image: '/assets/images/products/12-awg-silicone-wire-black.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8044',
      name: '14 AWG SILICONE WIRE ( BLACK )',
      price: 0,
      image: '/assets/images/products/14-awg-silicone-wire-black.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8045',
      name: '14 AWG SILICONE WIRE ( RED)',
      price: 0,
      image: '/assets/images/products/14-awg-silicone-wire-red.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8046',
      name: '16 AWG SILICONE WIRE ( BLACK )',
      price: 0,
      image: '/assets/images/products/16-awg-silicone-wire-black.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8047',
      name: '16 AWG SILICONE WIRE ( RED )',
      price: 0,
      image: '/assets/images/products/16-awg-silicone-wire-red.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8048',
      name: '18 AWG SILICONE WIRE ( BLACK )',
      price: 0,
      image: '/assets/images/products/18-awg-silicone-wire-black.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8049',
      name: '18 AWG SILICONE WIRE ( RED )',
      price: 0,
      image: '/assets/images/products/18-awg-silicone-wire-red.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8050',
      name: '20 AWG SILICONE WIRE ( BLACK )',
      price: 0,
      image: '/assets/images/products/20-awg-silicone-wire-black.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8051',
      name: '20 AWG SILICONE WIRE ( RED )',
      price: 0,
      image: '/assets/images/products/20-awg-silicone-wire-red.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8052',
      name: '22 AWG SILICONE WIRE ( BLACK )',
      price: 0,
      image: '/assets/images/products/22-awg-silicone-wire-black.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8053',
      name: '22 AWG SILICONE WIRE ( RED )',
      price: 0,
      image: '/assets/images/products/22-awg-silicone-wire-red.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8054',
      name: '24 AWG SILICONE WIRE ( BLACK )',
      price: 0,
      image: '/assets/images/products/24-awg-silicone-wire-black.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8055',
      name: '24 AWG SILICONE WIRE ( RED )',
      price: 0,
      image: '/assets/images/products/24-awg-silicone-wire-red.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8056',
      name: '6AWG SILICONE WIRE ( BLACK )',
      price: 0,
      image: '/assets/images/products/6awg-silicone-wire-black.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8057',
      name: '8 AWG SILICONE WIRE ( BLACK )',
      price: 0,
      image: '/assets/images/products/8-awg-silicone-wire-black.jpg',
      category: 'Accessories',
      subcategory: 'Silicone Wires',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8058',
      name: 'Anti-Static Anti-Skid ESD Gloves',
      price: 0,
      image: '/assets/images/products/anti-static-anti-skid-esd-gloves.jpg',
      category: 'Accessories',
      subcategory: 'Twezzers',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8059',
      name: 'Anti-Static Tweezers 6pcs Set',
      price: 0,
      image: '/assets/images/products/anti-static-tweezers-6pcs-set.jpg',
      category: 'Accessories',
      subcategory: 'Twezzers',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8060',
      name: 'ESD MAT 1X1 Sq M',
      price: 0,
      image: '/assets/images/products/esd-mat-1x1-sq-m.jpg',
      category: 'Accessories',
      subcategory: 'Twezzers',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8061',
      name: 'S-160 ESD Heat Insulation Working Mat 450X300mm',
      price: 0,
      image: '/assets/images/products/s-160-esd-heat-insulation-working-mat-450x300mm.jpg',
      category: 'Accessories',
      subcategory: 'Twezzers',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8062',
      name: 'WRIST BAND',
      price: 0,
      image: '/assets/images/products/wrist-band.jpg',
      category: 'Accessories',
      subcategory: 'Twezzers',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    },
    {
      id: '8063',
      name: 'Cable For Arduino UNO/MEGA (USB A to B)',
      price: 0,
      image: '/assets/images/products/cable-for-arduino-uno-mega-usb-a-to-b.jpg',
      category: 'Accessories',
      subcategory: 'USB Cables',
      brand: '',
      rating: 0,
      inStock: true,
      isHot: false,
      description: ''
    }
  ];

  private products = signal<Product[]>([]);

  constructor() {
    // Load products from localStorage if available, otherwise use default products
    const savedProducts = localStorage.getItem('drone_shop_products');
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        this.products.set(parsed);
      } catch (error) {
        console.error('Error loading products from localStorage:', error);
        this.products.set(this.defaultProducts);
      }
    } else {
      this.products.set(this.defaultProducts);
    }
  }

  private categories = signal<Category[]>([
    { id: '1', name: '3D printers parts', slug: '3d-printers-parts', image: 'assets/images/categories/3d-printers.jpg', productCount: 46 },
    { id: '2', name: 'AC MOTOR', slug: 'ac-motor', image: 'assets/images/categories/ac-motor.jpg', productCount: 2 },
    { 
      id: '3', 
      name: 'Accessories', 
      slug: 'accessories', 
      image: 'assets/images/categories/accessories.jpg', 
      productCount: 169,
      subcategories: [
        { 
          id: '3-1', 
          name: 'Connectors', 
          slug: 'connectors', 
          productCount: 18,
          image: '/assets/images/products/amass-xt90-male-female-connector.jpg'
        },
        { 
          id: '3-2', 
          name: 'DIP Converters', 
          slug: 'dip-converters', 
          productCount: 3,
          image: '/assets/images/products/type-c-to-dip-converter.jpg'
        },
        { 
          id: '3-3', 
          name: 'IOT', 
          slug: 'iot', 
          productCount: 2,
          image: '/assets/images/products/arduino-uno-kit-akx00037.jpg'
        },
        { 
          id: '3-4', 
          name: 'Keypad', 
          slug: 'keypad', 
          productCount: 6,
          image: '/assets/images/products/4x4-matrix-membrane-keypad.jpg'
        },
        { 
          id: '3-5', 
          name: 'Silicone Wires', 
          slug: 'silicone-wires', 
          productCount: 18,
          image: '/assets/images/products/16-awg-silicone-wire-red.jpg'
        },
        { 
          id: '3-6', 
          name: 'Twezzers', 
          slug: 'twezzers', 
          productCount: 5,
          image: '/assets/images/products/anti-static-tweezers-6pcs-set.jpg'
        },
        { 
          id: '3-7', 
          name: 'USB Cables', 
          slug: 'usb', 
          productCount: 1,
          image: '/assets/images/products/cable-for-arduino-uno-mega-usb-a-to-b.jpg'
        }
      ]
    },
    { id: '4', name: 'Agriculture Drone Parts', slug: 'agriculture-drone-parts', image: 'assets/images/categories/agriculture-drone-parts.jpg', productCount: 31 },
    { id: '5', name: 'ANTENNA', slug: 'antenna', image: 'assets/images/categories/antenna.jpg', productCount: 69 },
    { id: '6', name: 'Audio Jack', slug: 'audio-jack', image: 'assets/images/categories/audio-jack.jpg', productCount: 24 },
    { id: '7', name: 'BATTERY', slug: 'battery', image: 'assets/images/categories/battery.jpg', productCount: 41 },
    { id: '8', name: 'ROBOTIC DIY KITS', slug: 'robotic-diy-kits', image: 'assets/images/categories/robotic-kits.jpg', productCount: 14 },
    { id: '9', name: 'READY RUNNING PROJECTS', slug: 'ready-running-projects', image: 'assets/images/categories/ready-running-projects.jpg', productCount: 19 },
    { 
      id: '10', 
      name: 'Raspberry Pi Boards', 
      slug: 'raspberry', 
      image: 'assets/images/categories/raspberry.jpg', 
      productCount: 12,
      subcategories: [
        { 
          id: '10-1', 
          name: 'RPI Accessories', 
          slug: 'raspberry/rpi-accessories', 
          productCount: 50,
          image: 'https://www.agarwalelectronics.com/wp-content/uploads/2024/03/40-Pin-Red-GPIO-Extension-Board-1.jpg'
        }
      ]
    },
    { id: '11', name: 'MINI DRONE KITS ( BELOW 20CMS )', slug: 'mini-drone-kits', image: 'assets/images/categories/mini-drone-kits.jpg', productCount: 3 },
    { id: '12', name: 'DRONE TRANSMITER AND RECEIVER', slug: 'drone-transmiter-receiver', image: 'assets/images/categories/drone-transmiter.jpg', productCount: 16 },
    { id: '13', name: 'DIY KITS', slug: 'diy-kits', image: 'assets/images/categories/diy-kits.jpg', productCount: 105 },
    { id: '14', name: 'Bonka Batteries', slug: 'bonka', image: 'assets/images/categories/bonka.jpg', productCount: 31 }
  ]);

  private brands = signal<Brand[]>([
    { id: '1', name: 'ACEBOTT', slug: 'acebott' },
    { id: '2', name: 'Amass', slug: 'amass' },
    { id: '3', name: 'Arduino', slug: 'arduino' },
    { id: '4', name: 'BONKA', slug: 'bonka' },
    { id: '5', name: 'EFT', slug: 'eft' },
    { id: '6', name: 'Elcon', slug: 'elcon' },
    { id: '7', name: 'EMAX', slug: 'emax' },
    { id: '8', name: 'Hobbywing', slug: 'hobbywing' },
    { id: '9', name: 'JIYI', slug: 'jiyi' },
    { id: '10', name: 'Mastech', slug: 'mastech' },
    { id: '11', name: 'Raspberry Pi', slug: 'raspberry-pi' },
    { id: '12', name: 'SKYDROID', slug: 'skydroid' },
    { id: '13', name: 'SKYRC', slug: 'skyrc' },
    { id: '14', name: 'TATTU', slug: 'tattu' }
  ]);

  getProducts() {
    return this.products();
  }

  getProductById(id: string) {
    return this.products().find((p: Product) => p.id === id);
  }

  getProductsByCategory(category: string) {
    // Handle subcategory paths like "raspberry/rpi-accessories" or "accessories/connectors"
    if (category.includes('/')) {
      const parts = category.split('/');
      const mainCategory = parts[0];
      const subCategory = parts.slice(1).join('/');
      
      // Normalize for comparison
      const normalizedMainCategory = mainCategory.toLowerCase().replace(/-/g, ' ');
      const normalizedSubCategory = subCategory.toLowerCase().replace(/-/g, ' ');
      
      return this.products().filter((p: Product) => {
        const productCategory = p.category.toLowerCase().replace(/-/g, ' ');
        const productSubCategory = (p.subcategory || '').toLowerCase().replace(/-/g, ' ');
        
        // Use exact match for subcategory to be more precise
        const categoryMatch = productCategory.includes(normalizedMainCategory);
        const subCategoryMatch = productSubCategory === normalizedSubCategory || 
                                 productSubCategory.includes(normalizedSubCategory);
        
        return categoryMatch && subCategoryMatch;
      });
    }
    
    // Convert slug to match category name format
    const normalizedCategory = category.toLowerCase().replace(/-/g, ' ');
    return this.products().filter((p: Product) => 
      p.category.toLowerCase().replace(/-/g, ' ').includes(normalizedCategory)
    );
  }

  getCategories() {
    return this.categories();
  }

  getCategoryBySlug(slug: string): Category | undefined {
    // First check if it's a subcategory path
    if (slug.includes('/')) {
      const parts = slug.split('/');
      const mainCategorySlug = parts[0];
      const subCategorySlug = parts.slice(1).join('/');
      
      const mainCategory = this.categories().find(cat => cat.slug === mainCategorySlug);
      if (mainCategory && mainCategory.subcategories) {
        // Return a modified category object for the subcategory
        const subcat = mainCategory.subcategories.find(sub => sub.slug === slug);
        if (subcat) {
          return {
            id: subcat.id,
            name: subcat.name,
            slug: subcat.slug,
            image: subcat.image || mainCategory.image,
            productCount: subcat.productCount,
            description: ''
          };
        }
      }
    }
    
    return this.categories().find(cat => cat.slug === slug);
  }

  getBrands() {
    return this.brands();
  }

  getFeaturedProducts() {
    return this.products().filter((p: Product) => p.isHot).slice(0, 10);
  }

  getNewProducts() {
    return this.products().filter((p: Product) => p.isNew).slice(0, 10);
  }

  getTopSellerProducts() {
    // Return hot products as top sellers for now
    return this.products().filter((p: Product) => p.isHot).slice(0, 10);
  }

  getAllProducts(): Product[] {
    return this.products();
  }

  getAllCategories(): Category[] {
    return this.categories();
  }

  setProducts(products: Product[]) {
    try {
      this.products.set(products);
      // Also save to localStorage
      localStorage.setItem('drone_shop_products', JSON.stringify(products));
    } catch (error) {
      console.error('Error saving products:', error);
      throw error; // Re-throw so caller can handle it
    }
  }

  resetToDefaultProducts() {
    try {
      // Clear localStorage
      localStorage.removeItem('drone_shop_products');
      // Reset to default products
      this.products.set(this.defaultProducts);
      // Save to localStorage
      localStorage.setItem('drone_shop_products', JSON.stringify(this.defaultProducts));
      return true;
    } catch (error) {
      console.error('Error resetting products:', error);
      return false;
    }
  }
}

