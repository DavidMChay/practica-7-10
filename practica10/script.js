$(document).ready(function() {
    let matrix = [];
    let size = 0;

    function generateEditableMatrix(size) {
        const tableBody = $('#matrixTable');
        tableBody.empty();
        matrix = Array.from({ length: size }, () => Array(size).fill(0));
        for (let i = 0; i < size; i++) {
            const tr = $('<tr></tr>');
            for (let j = 0; j < size; j++) {
                const td = $('<td></td>').attr('contenteditable', 'true').text(0);
                td.on('input', function() {
                    const value = $(this).text();
                    if (!/^-?\d*$/.test(value)) {
                        $(this).text(value.replace(/[^-?\d]/g, ''));
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
        $('#gaussButton').prop('disabled', false);
    }

    function applyGauss(matrix, row, col) {
        const n = matrix.length;
        if (row >= n || col >= n) return;

        if (matrix[row][col] === 0) {
            for (let i = row + 1; i < n; i++) {
                if (matrix[i][col] !== 0) {
                    [matrix[row], matrix[i]] = [matrix[i], matrix[row]];
                    break;
                }
            }
        }

        if (matrix[row][col] !== 0) {
            for (let i = row + 1; i < n; i++) {
                let factor = matrix[i][col] / matrix[row][col];
                for (let j = col; j < n; j++) {
                    matrix[i][j] = Math.round(matrix[i][j] - factor * matrix[row][j]);
                }
            }
        }

        applyGauss(matrix, row + 1, col + 1);
    }

    function displayResult(matrix) {
        const resultTable = $('#resultTable');
        resultTable.empty();
        matrix.forEach(row => {
            const tr = $('<tr></tr>');
            row.forEach(value => {
                const td = $('<td></td>').text(value);
                tr.append(td);
            });
            resultTable.append(tr);
        });
        $('.result-container').show();
    }

    $('#generateMatrixBtn').on('click', function() {
        size = parseInt($('#matrixSize').val());
        if (size >= 2 && size <= 5) {
            generateEditableMatrix(size);
        } else {
            alert('Por favor, ingrese un tamaño válido para la matriz (2-5).');
        }
    });

    $('#gaussButton').on('click', function() {
        const matrixCopy = matrix.map(row => row.slice());
        applyGauss(matrixCopy, 0, 0);
        displayResult(matrixCopy);
    });
});
