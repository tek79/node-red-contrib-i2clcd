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
      this.LCD_COLS = parseInt(config.cols);
      this.LCD_ROWS = parseInt(config.rows);
      console.log("LCD node init @ i2c addr:" + this.LCD_ADDR);
      lcd = new LCD(this.LCD_BUS,this.LCD_ADDR,this.LCD_COLS,this.LCD_ROWS);
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
             lcd.blink_on();
         }
         
         if (msg.topic.localeCompare("blink_off") == 0) {
             lcd.blink_off();
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
