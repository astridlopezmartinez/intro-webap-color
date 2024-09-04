$(document).ready(function () {
    function updateColor() {
        var red = $('#redRange').val();
        var green = $('#greenRange').val();
        var blue = $('#blueRange').val();
        var hexColor = rgbToHex(red, green, blue);

        $('#colorBox').css('background-color', hexColor);
        $('#hexCode').text(hexColor);
        $('#colorPicker').val(hexColor);
    }

    function syncInputs() {
        $('#redInput').val($('#redRange').val());
        $('#greenInput').val($('#greenRange').val());
        $('#blueInput').val($('#blueRange').val());
    }

    function updateSlidersFromHex(hex) {
        var rgb = hexToRgb(hex);
        $('#redRange').val(rgb.r);
        $('#greenRange').val(rgb.g);
        $('#blueRange').val(rgb.b);
        syncInputs();
        updateColor();
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }

    function componentToHex(c) {
        var hex = parseInt(c).toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function hexToRgb(hex) {
        var bigint = parseInt(hex.slice(1), 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return { r: r, g: g, b: b };
    }

    // Inicializar el color al cargar la página
    updateColor();
    syncInputs();

    // Escuchar cambios en los controles deslizantes
    $('#redRange, #greenRange, #blueRange').on('input', function () {
        syncInputs();
        updateColor();
    });

    // Escuchar cambios en los campos de entrada de texto
    $('#redInput, #greenInput, #blueInput').on('input', function () {
        var red = $('#redInput').val();
        var green = $('#greenInput').val();
        var blue = $('#blueInput').val();

        // Sincronizar valores de los controles deslizantes
        $('#redRange').val(red);
        $('#greenRange').val(green);
        $('#blueRange').val(blue);

        updateColor();
    });

    // Escuchar cambios en el color picker
    $('#colorPicker').on('input', function () {
        var hex = $(this).val();
        updateSlidersFromHex(hex);
    });
});
