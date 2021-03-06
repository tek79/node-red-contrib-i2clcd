module.exports = function(RED) {

   LCD = require('i2c-lcd');
   var lcd;
   
   function initLCD() {
      lcd.init();
   };

   function LcdNode(config) {
       
      console.log("creating LCD node");
      RED.nodes.createNode(this,config);
      var node = this;
      this.LCD_ADDR = parseInt(config.addr);
      console.log("LCD node init @ i2c addr:" + this.LCD_ADDR);
      lcd = new LCD("/dev/i2c-1",this.LCD_ADDR);
      initLCD();
          
      this.on('input', function(msg) {
         console.log("LCD input "+msg.topic);
         if (msg.topic.localeCompare("init") == 0) {
             lcd.init();
         }
         
         if (msg.topic.localeCompare("clear") == 0) {
             lcd.clear();
         }

         if (msg.topic.localeCompare("line1") == 0) {
         lcd.setCursor(0,0).then(function() {
            lcd.print(msg.payload); });
         }

         if (msg.topic.localeCompare("line2") == 0) {
            lcd.setCursor(0,1).then(function() {
               lcd.print(msg.payload); });
         }
         
         if (msg.topic.localeCompare("line3") == 0) {
            lcd.setCursor(0,2).then(function() {
               lcd.print(msg.payload); });
         }
         
         if (msg.topic.localeCompare("line4") == 0) {
            lcd.setCursor(0,3).then(function() {
               lcd.print(msg.payload); });
         }
         node.send(msg); //pass message through
      });
   }
      
   RED.nodes.registerType("i2clcd",LcdNode);
    
}
