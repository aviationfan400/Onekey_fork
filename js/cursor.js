let circle = document.getElementById("circle");
if (!circle) {
    circle = document.createElement("div");
    circle.id = "circle";
    document.body.appendChild(circle);
}

const CIRCLE_SIZE = 20; // px
const CIRCLE_RADIUS = CIRCLE_SIZE / 2;
Object.assign(circle.style, {
    width: CIRCLE_SIZE + "px",
    height: CIRCLE_SIZE + "px",
    position: "fixed",
    pointerEvents: "none",
    zIndex: 999999,
    background: "rgba(51,51,51,0.5)",
    borderRadius: "50%",
    opacity: "0.65",
    left: "0px",
    top: "0px"
});

let mouseX = 0, mouseY = 0;
let circleX = 0, circleY = 0;
const delay = 0.9;

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function animate() {
    circleX += (mouseX - circleX) * delay;
    circleY += (mouseY - circleY) * delay;
    circle.style.transform = `translate(${circleX - CIRCLE_RADIUS}px, ${circleY - CIRCLE_RADIUS}px)`;
    requestAnimationFrame(animate);
}
animate();

// Restore mousedown/mouseup size changes
document.addEventListener("mousedown", () => {
    circle.style.width = "15px";
    circle.style.height = "15px";
});

document.addEventListener("mouseup", () => {
    circle.style.width = `${CIRCLE_SIZE}px`;
    circle.style.height = `${CIRCLE_SIZE}px`;
});

// Remove the click color change
document.addEventListener("click", () => {
    // Empty function to override any previous click handlers
});