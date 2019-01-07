module.exports = function(RED) {

   LCD = require('lcdi2c');
   var lcd;
   
   function initLCD() {
      lcd._init();
   };

   function LcdNode(config) {
       
      console.log("creating LCD node");
      RED.nodes.createNode(this,config);
      var node = this;
      this.LCD_ADDR = parseInt(config.addr);
      this.LCD_BUS = parseInt(config.bus);
      this.LCD_NUMCOLS = parseInt(config.numcols);
      this.LCD_NUMROWS = parseInt(config.numrows);
      console.log("LCD node init @ i2c addr:" + this.LCD_ADDR);
      lcd = new LCD(this.LCD_BUS,this.LCD_ADDR,this.LCD_NUMCOLS,this.LCD_NUMROWS);
      initLCD();
          
      this.on('input', function(msg) {
         console.log("LCD input "+msg.topic);
         if (msg.topic.localeCompare("init") == 0) {
             lcd._init();
         }
         
         if (msg.topic.localeCompare("clear") == 0) {
             lcd.clear();
         }

         if (msg.topic.localeCompare("on") == 0) {
             lcd.on();
         }
         
         if (msg.topic.localeCompare("off") == 0) {
             lcd.off();
         }
         
         if (msg.topic.localeCompare("blink_on") == 0) {
             lcd.blinkOn();
         }
         
         if (msg.topic.localeCompare("blink_off") == 0) {
             lcd.blinkOff();
         }

         if (msg.topic.localeCompare("line1") == 0) {
             lcd.println(msg.payload, 1);
         }

         if (msg.topic.localeCompare("line2") == 0) {
             lcd.println(msg.payload, 2);
         }
         
         if (msg.topic.localeCompare("line3") == 0) {
             lcd.println(msg.payload, 3);
         }
         
         if (msg.topic.localeCompare("line4") == 0) {
             lcd.println(msg.payload, 4);
         }
         node.send(msg); //pass message through
      });
   }
      
   RED.nodes.registerType("i2clcd",LcdNode);
    
}
