// Simple animated paper planes background (white planes, black background)

// Get the canvas element for the animated background
const canvas = document.getElementById('bg-animation'); // Canvas for paper planes animation
const ctx = canvas.getContext('2d'); // 2D drawing context for canvas
let planes = []; // Array to store all paper plane objects

// Resize canvas to always fill the window
function resizeCanvas() {
    canvas.width = window.innerWidth; // Set canvas width to window width
    canvas.height = window.innerHeight; // Set canvas height to window height
}
resizeCanvas(); // Initial resize
window.addEventListener('resize', resizeCanvas); // Resize canvas on window resize

// Create paper plane objects with random properties
function createPlanes(num) {
    planes = []; // Reset planes array
    for (let i = 0; i < num; i++) {
        planes.push({
            x: Math.random() * canvas.width, // X position
            y: Math.random() * canvas.height, // Y position
            size: Math.random() * 30 + 20,   // Plane size
            dx: Math.random() * 2 + 0.5,     // Horizontal speed
            dy: (Math.random() - 0.5) * 0.5, // Vertical speed
            angle: Math.random() * Math.PI * 2, // Rotation angle
            dAngle: (Math.random() - 0.5) * 0.01, // Rotation speed
        });
    }
}
createPlanes(18); // Generate 18 planes

// Draw a single paper plane on the canvas
function drawPlane(plane) {
    const { x, y, size, angle } = plane;
    ctx.save(); // Save current canvas state
    ctx.translate(x, y); // Move to plane position
    ctx.rotate(angle);   // Rotate plane

    // Draw plane body (main triangle)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size, size * 0.2);
    ctx.lineTo(size * 0.2, size * 0.4);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = "white"; // Body color
    ctx.fill();

    // Draw left wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-size * 0.3, size * 0.2);
    ctx.lineTo(size * 0.2, size * 0.4);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.7)"; // Left wing color
    ctx.fill();

    // Draw right wing
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(size * 0.3, size * 0.2);
    ctx.lineTo(size * 0.2, size * 0.4);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = "rgba(255,255,255,0.5)"; // Right wing color
    ctx.fill();

    ctx.restore(); // Restore canvas state
}

// Animate all planes and update their positions
function animate() {
    ctx.fillStyle = "black"; // Set background color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill background

    planes.forEach(plane => {
        drawPlane(plane); // Draw each plane
        plane.x += plane.dx; // Update X position
        plane.y += plane.dy; // Update Y position
        plane.angle += plane.dAngle; // Update rotation

        // Wrap plane around screen edges
        if (plane.x > canvas.width + plane.size) plane.x = -plane.size;
        if (plane.x < -plane.size) plane.x = canvas.width + plane.size;
        if (plane.y > canvas.height + plane.size) plane.y = -plane.size;
        if (plane.y < -plane.size) plane.y = canvas.height + plane.size;
    });
    requestAnimationFrame(animate); // Request next animation frame
}
animate(); // Start animation