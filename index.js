//Canvas
window.onload = function () {
    var canvas = document.getElementById('canvas');
    const image = document.getElementById("toBeCropped")
    const drawRect = document.getElementById("drawrect")
    const croppedImage = this.document.getElementById("cropped")
    var myCanvas = document.getElementById('croppedCanvas');
    var context = myCanvas.getContext('2d')
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    mousePressed = false
    coordinates = []
    imageArray = []
    drawRect.addEventListener('click', function drawRectangle() {


        canvas.addEventListener('mousedown', function () {
            mousePressed = true
            if (mousePressed) {
                console.log("mousePressed")
                var rect = canvas.getBoundingClientRect()
                x1 = event.clientX - rect.left
                y1 = event.clientY - rect.top
            }
        })
        canvas.addEventListener('mousemove', function () {
            if (mousePressed) {
                var rect = canvas.getBoundingClientRect();
                x2 = event.clientX - rect.left;
                y2 = event.clientY - rect.top;

                ctx.beginPath();
                ctx.rect(x1, y1, x2 - x1, y2 - y1)
                ctx.clearRect(x1, y1, x2 - x1, y2 - y1)
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                ctx.lineWidth = 1;
                ctx.setLineDash([5])
                ctx.stroke();
                coordinates.forEach(element => {
                    ctx.beginPath();
                    console.log(element[0], element[1], element[2], element[3])
                    ctx.rect(element[0], element[1], element[2], element[3])
                    ctx.lineWidth = 1;
                    ctx.setLineDash([5])
                    ctx.stroke();
                });
            }
        })

        canvas.addEventListener('mouseup', function () {
            mousePressed = false
            coordinates.push([x1, y1, x2 - x1, y2 - y1])
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            coordinates.forEach(element => {
                ctx.beginPath();
                console.log(element[0], element[1], element[2], element[3])
                ctx.rect(element[0], element[1], element[2], element[3])

                ctx.lineWidth = 1;
                ctx.setLineDash([5])
                ctx.stroke();
            });
        })
    }
    )
    croppedImage.addEventListener('click', function displayCropped() {
        coordinates.forEach(ele => {
            var imageData = ctx.getImageData(ele[0], ele[1], ele[2], ele[3]);
            context.putImageData(imageData, ele[0], ele[1]);
        })
    })

}
