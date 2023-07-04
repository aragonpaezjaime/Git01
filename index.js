const { SerialPort } = require("serialport");
const { DelimiterParser } = require("@serialport/parser-delimiter");

const parser = new DelimiterParser({ delimiter: "\n" });
const config = {
  path: "/dev/ttyUSB0",
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  autoOpen: false,
};
const port = new SerialPort(config);
port.open((err) => {
  if (err) {
    console.log("error opening the port");
  }
  port.write(`\n`);
});
port.pipe(parser);
parser.on("data", (data) => {
  const datos = tryParseJson(data);
  console.log(`Minutos:${datos.minutos} Segundos:${datos.segundos}`);
});
