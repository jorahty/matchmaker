function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomIp() {
  const randomByte = () => Math.floor(Math.random() * 256);
  return `${randomByte()}.${randomByte()}.${randomByte()}.${randomByte()}`;
}

export default async function allocate() {
  return {
    ip: randomIp(),
    port: getRandomInt(7000, 8000),
  };
}
