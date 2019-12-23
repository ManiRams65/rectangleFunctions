window.onload = function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // create circles to draw
    const rectangles = [
        {
            id: 1,
            x: 40,
            y: 40,
            width: 20,
            height: 20
        },
        {
            id: 2,
            x: 70,
            y: 70,
            width: 20,
            height: 20
        }, {
            id: 3,
            x: 100,
            y: 80,
            width: 20,
            height: 20
        }
    ];
    const regions = []
    // draw circles
    rectangles.forEach(rectangle => {
        ctx.beginPath();
        ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        ctx.stroke();
    });
    function isIntersect(point, rectangle) {
        return ((point.x <= rectangle.x + rectangle.width) && (point.x >= rectangle.x) && (point.y <= rectangle.y + rectangle.height) && (point.y >= rectangle.y))
    }
    function rectangleRegion(pos, region) {
        return (pos.x <= region.x_end) && (pos.x >= region.x_start) && (pos.y <= region.y_end) && (pos.y >= region.y_start)
    }
    rectangles.forEach(rectangle => {
        regions.push({
            "id": rectangle.id,
            "x_start": rectangle.x,
            "x_end": rectangle.x + rectangle.width,
            "y_start": rectangle.y,
            "y_end": rectangle.y + rectangle.height
        })
    })
    this.console.log(regions)
    rectangles.forEach(ele => {
        this.console.log(ele.id)
    })
    canvas.addEventListener('mousemove', (e) => {
        var rect = canvas.getBoundingClientRect()
        const pos = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
        var isRectangularRegion = (regions.filter(region => (pos.x <= region.x_end) && (pos.x >= region.x_start) && (pos.y <= region.y_end) && (pos.y >= region.y_start)))
        if (isRectangularRegion.length != 0) {
            canvas.style.cursor = "move"
            canvas.addEventListener("mousedown", function () {
                selectedCoordinates = rectangles.filter(rectangle => rectangle.id === isRectangularRegion[0].id)
                console.log(selectedCoordinates)
            })
        }
        else {
            canvas.style.cursor = "default"

        }
    })
    canvas.addEventListener('click', (e) => {
        var rect = canvas.getBoundingClientRect()
        const pos = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
        rectangles.forEach(rectangle => {
            this.console.log(isIntersect(pos, rectangle))
            if (isIntersect(pos, rectangle)) {
                alert('click on rectangle: ' + rectangle.id);
            }
        });
    });
}