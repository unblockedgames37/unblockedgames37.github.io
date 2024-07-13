const c = document.getElementById("onlinecount")

if (localStorage.getItem("useramount")) {
    c.textContent = localStorage.getItem("useramount") + " Users online";
}

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
      const rand = Math.random() * 16 | 0;
      const value = char === 'x' ? rand : (rand & 0x3 | 0x8);
      return value.toString(16);
    });
  }

  let deviceId = localStorage.getItem('userid');
  if (!deviceId) {
    deviceId = generateUUID();
    localStorage.setItem('userid', deviceId);
  }

const ws = new WebSocket(`wss://g37counter.glitch.me/`);

ws.onopen = () => {
    ws.send(deviceId);
  };

ws.onmessage = (event) => {
  c.textContent = event.data + " Users online";
  localStorage.setItem("useramount", event.data)
};