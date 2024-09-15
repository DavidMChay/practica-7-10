$(document).ready(function() {
    function generateMatrix(size) {
        const tableBody = $('#matrixTable');
        tableBody.empty();
        for (let i = 0; i < size; i++) {
            const tr = $('<tr></tr>');
            for (let j = 0; j < size; j++) {
                const td = $('<td></td>').text(i === j ? '1' : '0');
                tr.append(td);
            }
            tableBody.append(tr);
        }
        $('.matrix-container').show();
    }

    $('#generateMatrixBtn').on('click', function() {
        const matrixSize = parseInt($('#matrixSize').val());
        if (matrixSize >= 2 && matrixSize <= 10) {
            generateMatrix(matrixSize);
        } else {
            alert('Por favor, ingrese un tamaño válido para la matriz (2-10).');
        }
    });
});
