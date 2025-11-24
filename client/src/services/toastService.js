import toastify from 'toastify-js';

export function toastSuccess(message) {
    toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "#00ff66",
            color: "black",
            border: "1px solid #00ff66",
            textShadow: "0 0 5px #00ff66"
        }
    }).showToast();
}

export function toastError(message) {
    toastify({
        text: message,
        duration: 4000,
        gravity: "top",
        position: "right",
        style: {
            background: "#ff4444",
            color: "white",
            border: "1px solid #ff4444",
            textShadow: "0 0 5px red"
        }
    }).showToast();
}

export function toastInfo(message) {
    toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "#006600",
            color: "#00ff66",
            border: "1px solid #00ff66",
            textShadow: "0 0 5px #00ff66"
        }
    }).showToast();
}