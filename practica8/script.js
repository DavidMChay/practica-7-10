$(document).ready(function() {
    let matrixSize = 0;
    let matrix = [];

    function generateMatrix(size) {
        const tableBody = $('#magicSquareTable');
        tableBody.empty();
        matrix = Array.from({ length: size }, () => Array(size).fill(0));
        for (let i = 0; i < size; i++) {
            const tr = $('<tr></tr>');
            for (let j = 0; j < size; j++) {
                const td = $('<td></td>').attr('contenteditable', 'true').text(matrix[i][j]);
                td.on('input', function() {
                    const value = $(this).text();
                    if (!/^\d*$/.test(value)) {
                        $(this).text(value.replace(/[^\d]/g, ''));
                    }
                });
                td.on('focusout', function() {
                    let value = $(this).text();
                    if (value === '') {
                        value = 0;
                        $(this).text(value);
                    }
                    matrix[i][j] = parseInt(value);
                });
                tr.append(td);
            }
            tableBody.append(tr);
        }
        $('.matrix-container').show();
    }

    function isMagicSquare(matrix) {
        const n = matrix.length;
        const magicConstant = (n * (n * n + 1)) / 2;
        let rowSum, colSum;
        const diag1Sum = matrix.reduce((sum, row, i) => sum + row[i], 0);
        const diag2Sum = matrix.reduce((sum, row, i) => sum + row[n - i - 1], 0);

        if (diag1Sum !== magicConstant || diag2Sum !== magicConstant) return false;

        for (let i = 0; i < n; i++) {
            rowSum = matrix[i].reduce((a, b) => a + b, 0);
            colSum = matrix.reduce((sum, row) => sum + row[i], 0);
            if (rowSum !== magicConstant || colSum !== magicConstant) return false;
        }
        return true;
    }

    $('#generateMatrixBtn').on('click', function() {
        matrixSize = parseInt($('#matrixSize').val());
        if (matrixSize >= 2 && matrixSize <= 10) {
            generateMatrix(matrixSize);
        } else {
            alert('Por favor, ingrese un tamaño válido para el cuadro mágico (2-10).');
        }
    });

    $('#checkMagicSquareBtn').on('click', function() {
        if (matrixSize >= 2 && isMagicSquare(matrix)) {
            const magicConstant = (matrixSize * (matrixSize * matrixSize + 1)) / 2;
            $('#resultDisplay').html(`¡Es un Cuadro Mágico! La constante mágica es ${magicConstant}.`);
        } else {
            $('#resultDisplay').html('No es un Cuadro Mágico.');
        }
    });
});
